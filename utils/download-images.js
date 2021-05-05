const fs = require('fs');
const path = require('path');
const axios = require('axios');

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

            // nu behöver vi bara hämta de faktiska bilderna och det gör vi med axios igen
            axios({
                url: `${process.env.TMDB_BASE_URL}w780${paths.backdrop}`,
                method: 'GET',
                responseType: 'stream'
            })
                .then(async (backdropResponse) => {
                    await backdropResponse.data.pipe(backdropWriter);
                })
                .catch((err) => {
                    console.error(err);
                });

            axios({
                url: `${process.env.TMDB_BASE_URL}w92${paths.poster}`,
                method: 'GET',
                responseType: 'stream'
            })
                .then(async (posterResponse) => {
                    await posterResponse.data.pipe(posterWriter);
                })
                .catch((err) => {
                    console.error(err);
                });

            return paths;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
};

module.exports = { downloadImages };
