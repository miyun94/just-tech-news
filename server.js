const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
//first it acquires the npm and then passing through session.Store property
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//refer back to 14.2.5 for the video 
//this code sets up an Express.js session and connects it to our Sequelize database
//secret should be replaced by an actual secret and stored in the .env file
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

//implement helpers 
const helpers = require('./utils/helpers');
//then pass the helpers to this satement 
const hbs = exphbs.create({ helpers });
//then you are able to use these helpers in the templates by adding them to Handlebars.js expressions

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});