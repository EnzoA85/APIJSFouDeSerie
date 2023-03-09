const app = require('express')();
const http = require('http').Server(app);
const mysql = require('mysql');
const port = 3000;
app.set('view engine','ejs');
app.get('/', (req, res) => { 
  res.render("index.ejs")
});
http.listen(port, () => { 
  console.log(`Server running at http://localhost:${port}/`);
});


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "earchambaud-foudeserie",
  port:3307
 });

db.connect(function(err) {
   if (err) throw err;
   console.log("Connecté à la base de données MySQL!");
 });

 app.get('/series', (req,res) => {
  try {
    db.query("SELECT * FROM `serie` LEFT JOIN serie_genre ON serie.id = serie_genre.serie_id LEFT JOIN genre ON serie_genre.genre_id = genre.id",function (err, result) {
    res.status(200).json(result)
    });
  }catch (err) {
    console.log(err)
    throw err
  }
})