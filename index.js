const express = require('express');
const app = express();
const environment = require('dotenv').config().parsed;
const mongoose = require('mongoose');
const url = environment.BASE_URL+'/futbol/espana/segunda-division-b-grupo-3/equipos';
// controllers
const teamsController = require('./controllers/teamsController')
const countriesController = require('./controllers/countriesController')
// execute functions
countriesController.addCountries();
// teamsController.getTeams(url);

mongoose.connect(environment.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then((response) => {
    app.listen(environment.PORT, () => {
        console.log('App running at port 7777...');
    });
}).catch((error) => {
    console.log(error)
})