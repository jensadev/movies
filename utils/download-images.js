const fs = require('fs');
const path = require('path');
const axios = require('axios');

const downloadImage = async (size, path) => {
    return axios({
        url: `${process.env.TMDB_BASE_URL}${size}${path}`,
        method: 'GET',
        responseType: 'stream'
    });
};

const downloadImages = async (tmdbId) => {
    // do stuff
    // Make a request for a MOVIE with a given ID
    const infoUrl = `https://api.themoviedb.org/3/movie/${tmdbId}images?api_key=${process.env.TMDB_API_KEY}`;
    return axios
        .get(infoUrl)
        .then(function (response) {
            // handle success
            const paths = {
                backdrop: response.data.backdrop_path,
                poster: response.data.poster_path
            };

            const backdropPath = path.resolve(
                __dirname,
                '../public/images/movies/backdrops',
                paths.backdrop.substring(1) // vi måste ta bort den leading slash eftersom path är /23rt0+239f0iw9sefi9wseif9.bildformat
            );
            const posterPath = path.resolve(
                __dirname,
                '../public/images/movies/posters',
                paths.poster.substring(1)
            );
            // anv fs för att skapa en stream för att skriva filen till disk
            const backdropWriter = fs.createWriteStream(backdropPath);
            const posterWriter = fs.createWriteStream(posterPath);

            return Promise.all([
                downloadImage('w780', paths.backdrop),
                downloadImage('w92', paths.poster)
            ])
                .then(async (results) => {
                    await results[0].data.pipe(backdropWriter);
                    await results[1].data.pipe(posterWriter);
                    return paths;
                })
                .catch((err) => {
                    console.error(err);
                    return false;
                });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
};

module.exports = { downloadImages };
