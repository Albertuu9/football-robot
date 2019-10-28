const environment = require('dotenv').config().parsed;
const url = environment.BASE_URL+'futbol/alemania/bundesliga/equipos/';
const teamsController = require('./controllers/getTeams')

// execute functions
teamsController.getTeams(url);