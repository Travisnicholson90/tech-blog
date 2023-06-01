const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const helpers = require('./utils/helper') 

const routes = require('./controller');
const app = express();
const PORT = process.env.PORT || 3001;

//sessions & sequelize connection
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      },
      resave: false,
      saveUninitialized: true,
      store: new SequelizeStore({
        db: sequelize,
      }),
};

app.use(session(sess));

// Create the handlebars instance
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log("Now listening");
    });
});
  

//TODO: fix login so all pages can see login/logout status
//TODO: fix all post alerts in index.js
