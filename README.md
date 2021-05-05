# Filmdatabas

Repository for [Filmdatabas playlist](https://youtube.com/playlist?list=PLgGdkZQ59lsVQSSSn7hPeDfwww928A7Fr)

Serie för att visa hur en kan skapa en webbapplikation för filmer.
Applikationen använder sk. monolithic architecture, dvs. att den innehåller en server som pratar med databasen som sedan levererar views till användaren.

* Stack är Node, express och mysql.
* För views används pug tillsammans med sass/scss.
* CRUD

* Fortsättning
* Regissörer, relation, en film kan ha en regissör, en regissör kan ha regisserat flera filmer. one to many 
* Genres, relation, en film kan ha flera genrer, här används en kopplingstabell. many to many

* Extra, hur en kan använda custom bootstrap med projektet.
* Extra, kodstil och automatisk formatering och linting med eslint och prettier.
* Extra, prata med en extern API för att hämta bilder, https://www.themoviedb.org/ 

Icon credit, https://iconscout.com/icon/film-3

## Setup
```
git clone https://github.com/jensnti/movies
cd movies
npm install
```

mysql create db;

import db från dump, _2021-05-05_150019_jens.sql

```
cp .env-example .env
nano .env
```
```
npm run dev
```

## Kodstil

```
npm run format
npm run lint
```

```
{
  "semi": true,
  "tabWidth": 4,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none"
}
```

# TODO

- [ ] Landing page för denna fantastiska sida!
- [ ] Directors -> people / name / person för att tillåta actors osv.
- [ ] View för att visa peoples
- [ ] Översättning, språk, https://www.npmjs.com/package/i18next
- [ ] Validering, tvätt av indata, https://www.npmjs.com/package/express-validator
- [ ] Inloggning, användare
  - [ ] Friends
  - [ ] Favoriter
  - [ ] Listor
  - [ ] Redigera, lägga till
  - [ ] Passport, https://www.npmjs.com/package/passport
- [ ] Mer API, söka filmen på namn (TMDB) hämta info därifrån, https://developers.themoviedb.org/3/getting-started/introduction
- [ ] Controllers
- [ ] Models
- [ ] ORM, [Sequelize](https://sequelize.org/) 
- [ ] Microservice
  - [ ] API routes
  - [ ] JWT 
- [ ] Annan frontend, headless
  - [ ] React
  - [ ] Vue
  - [ ] Angular
  - [ ] osv. 
