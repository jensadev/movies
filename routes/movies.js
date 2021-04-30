const express = require('express');
const router = express.Router();
const { query } = require('../models/db');
const { param, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    // res.send('respond with a resource');
    // hämta alla filmer
    // console.table(req.flash('info'));
    // verkar som att meddelandet försvinner efter det hämtats
    try {
        const sql = `SELECT m.*, 
        (SELECT GROUP_CONCAT(g.name)
            FROM movie_genres mg
            LEFT JOIN genres g ON mg.genre_id = g.id
            WHERE mg.movie_id = m.id
            ORDER BY g.name DESC
        ) AS genre_list,
        d.name AS director
        FROM movies m
        LEFT OUTER JOIN directors d ON d.id = m.director_id
        ORDER BY imdb_score DESC`;

        const movies = await query(sql);

        res.render('movies', {
            title: 'Filmdatabasen',
            movies: movies,
            messages: req.flash('info'),
            errors: req.flash('error')
        });
    } catch (err) {
        console.table(err);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    console.table(req.body);
    // validation
    try {
        // nu blir det något krångligt
        // vi behöver först skapa genres i genres OM de inte finns
        // annars behöver vi dess id

        // när det är gjort så behöver vi skapa relationen
        // mellan movie_id och genre_id i kopplingstabellen

        // genres kommer som en komma separerad lista till oss
        const genres = req.body.genres.split(',');

        const genreIds = genres.map(async (genre) => {
            // vi kan använd map för att loopa igenom listan med genrer och skapa nya poster
            genre = genre.toLowerCase().trim(); // städa upp
            if (genre.length > 0) {
                // finns den i database
                const exists = await query(
                    `SELECT id FROM genres WHERE name = ?`,
                    [genre]
                );
                if (exists.length > 0) {
                    // om genre finns returnera id till listan
                    // vi får en promise här som bi behöver hantera
                    return exists[0].id;
                }

                const newGenre = await query(
                    `INSERT INTO genres (name) VALUES(?)`,
                    [genre]
                );
                if (newGenre.insertId > 0) {
                    return newGenre.insertId;
                }

                throw 'Fel';
            }
        });

        const select = `SELECT id FROM directors WHERE name = ?`;
        let director = await query(select, [req.body.director]);

        if (director.length === 0) {
            const sql = `INSERT INTO directors SET name= ?`;
            director = await query(sql, [req.body.director]);
        }

        // nu kan vi skapa filmen
        // det är ingen ändring som görs i movie tabellen, kom ihåg det

        const sql = `INSERT INTO movies (title, tagline, release_year, imdb_score, director_id) VALUES (?,?,?,?,?)`;
        const newMovie = await query(sql, [
            req.body.title,
            req.body.tagline,
            req.body.year,
            req.body.imdb_score,
            director.insertId || director[0].id
        ]);

        if (newMovie.insertId > 0) {
            // filmen har skapats
            genreIds.map((genreId) => {
                genreId.then(async (id) => {
                    // vi har id, vi behöver nu movie id för att skapa kopplingen
                    await query(
                        `INSERT INTO movie_genres (movie_id, genre_id) VALUES (?,?)`,
                        [newMovie.insertId, id]
                    );
                });
            });

            req.flash('info', 'Film med id: ' + newMovie.insertId + ' skapad.');
            res.redirect('/movies/' + newMovie.insertId);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
    // denna route sparar filmen i databasen
});
// vi behöver en route för att visa formuläret för att skapa en ny film
router.get('/create', function (req, res, next) {
    res.render('movie-create');
});

// ordningen spelar roll för att inte fånga alla requests
router.get('/:id', param('id').isInt(), async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // dum, fel route... det börjar bli för rörigt i denna route fil...

    // hämta en film från db mmed director
    try {
        const sql = `SELECT m.*, 
        (SELECT GROUP_CONCAT(g.name)
            FROM movie_genres mg
            LEFT JOIN genres g ON mg.genre_id = g.id
            WHERE mg.movie_id = m.id
            ORDER BY g.name DESC
        ) AS genre_list,
        d.name AS director
        FROM movies m
        LEFT OUTER JOIN directors d ON d.id = m.director_id
        WHERE m.id = ?`;
        const movie = await query(sql, [req.params.id]);

        res.render('movie', {
            title: 'Filmdatabasen',
            movie: movie[0],
            messages: req.flash('info'),
            errors: req.flash('error')
        });
    } catch (err) {
        console.table(err);
        next(err);
    }
});

// vi behöver en route för att visa formuläret för att uppdatera en film
router.get('/:id/update', param('id').isInt(), async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // hämta en film från db så vi kan uppdatera dess värden
    try {
        const sql = `SELECT m.*, 
        (SELECT GROUP_CONCAT(g.name)
            FROM movie_genres mg
            LEFT JOIN genres g ON mg.genre_id = g.id
            WHERE mg.movie_id = m.id
            ORDER BY g.name DESC
        ) AS genre_list,
        d.name AS director
        FROM movies m
        LEFT OUTER JOIN directors d ON d.id = m.director_id
        WHERE m.id = ?`;
        const movie = await query(sql, [req.params.id]);

        // men om det inte finns en film då?
        if (movie.length > 0) {
            res.render('movie-edit', { movie: movie[0] });
        } else {
            res.send('Det finns inte en resurs med id ' + req.params.id);
        }
    } catch (err) {
        console.table(err);
        next(err);
    }
});

router.post('/:id', param('id').isInt(), async function (req, res, next) {
    // notera att hela bodyn behöver valideras och tvättas, req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // nu kan vi återanvända en del från insert
    const genres = req.body.genres.split(',');

    const genreIds = genres.map(async (genre) => {
        // vi kan använd map för att loopa igenom listan med genrer och skapa nya poster
        genre = genre.toLowerCase().trim(); // städa upp
        if (genre.length > 0) {
            // finns den i database
            const exists = await query(`SELECT id FROM genres WHERE name = ?`, [
                genre
            ]);
            if (exists.length > 0) {
                // om genre finns returnera id till listan
                // vi får en promise här som bi behöver hantera
                return exists[0].id;
            }

            const newGenre = await query(
                `INSERT INTO genres (name) VALUES(?)`,
                [genre]
            );
            if (newGenre.insertId > 0) {
                return newGenre.insertId;
            }

            throw 'Fel';
        }
    });

    // filmens id är känt så vi kan uppdatera genres direkt
    // och är det inga så gör inget
    // detta bör fungera, sen kanske det inte är bästa sättet...
    if (genreIds.length > 0) {
        await query(`DELETE FROM movie_genres WHERE movie_id = ?`, [
            req.params.id
        ]);

        genreIds.map((genreId) => {
            genreId.then(async (id) => {
                await query(
                    `INSERT INTO movie_genres (movie_id, genre_id) VALUES (?,?)`,
                    [req.params.id, id]
                );
            });
        });
    }

    // precis som för filmen behöver vi undersöka om det finns en director, annars skapa

    const select = `SELECT id FROM directors WHERE name = ?`;
    let director = await query(select, [req.body.director]);

    if (director.length === 0) {
        const sql = `INSERT INTO directors SET name= ?`;
        director = await query(sql, [req.body.director]);
    }

    // kolla så att filmen finns, uppdatera sedan. eller uppdatera direkt

    const sql = `UPDATE movies 
    SET title=?, tagline=?, release_year=?, imdb_score=?, director_id = ?
    WHERE id = ?`;

    // det blir fel med params spread

    const updatedMovie = await query(sql, [
        req.body.title,
        req.body.tagline,
        req.body.year,
        req.body.imdb_score,
        director.insertId || director[0].id,
        req.params.id
    ]);

    if (updatedMovie.affectedRows > 0) {
        req.flash('info', 'Film med id: ' + req.params.id + ' uppdaterad.');
        res.redirect('/movies/' + req.params.id);
    } else {
        req.flash('error', 'Någonting gick snett.');
    }
});

router.get('/:id/delete', param('id').isInt(), async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sql = `DELETE FROM movies WHERE id = ?`;
    const deleteMovie = await query(sql, [req.params.id]);

    if (deleteMovie.affectedRows > 0) {
        // flash message movie deleted
        req.flash('info', 'Film med id: ' + req.params.id + ' borttagen.');
        res.redirect('/movies');
    }
    // res.send("ta bort film med id " + req.params.id);
});

module.exports = router;
