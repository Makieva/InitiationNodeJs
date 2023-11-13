var express = require("express");
const { connexionDB } = require("./config/database");

var app = express();

// Connexion à la base de données
connexionDB();

// Route de base pour tester
    // app.get("/", (req, res) => {
    //   res.send("Yeah ! Ça marche ! Je suis dans le navigateur ! 🎉🚀");
    // });
// app.get("/", (req, res) => {
//   res.render("home");
// });

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/register", (req, res) => {
    res.render("pages/register");
});

app.get("/users", async (req, res) => {
  const users = await User.find({});
  res.render("pages/users", { users });
});

app.listen(3333, () => {
  console.log(`🚀🚀 Lancement avec succès du server`);
});

module.exports = app;

const twig = require("twig");

app.set("view engine", "twig");

app.set("views", "./views");

app.use(express.static("public"));


//importer le modèle 'User'
const User = require('./models/User');
    
//Ajouter le middleware 'body-parser'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Ajouter la route 'register'
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.redirect('/users');
}); 