const cheerio = require('cheerio');
const request = require('request');
const environment = require('dotenv').config().parsed;
// function to get football teams attributes
const getTeams = async (url) => {
    await request(url, (error, res, body) => {
        // validate conection error
        if(error && error.code === 'ENOTFOUND'){
            console.log('No tienes conexión a internet, por favor conéctate e intentalo de nuevo...');
            return
        }
        if (!error && res.statusCode === 200) {
            $ = cheerio.load(body)
            // get a class of the teams info
            $('.leagueTable__team').each((index, team) => {
                let eachUrlTeam = environment.BASE_URL + team.attribs.href
                getEachTeam(eachUrlTeam);
            })
        }
    })
}

// get each team
async function getEachTeam(eachUrlTeam){
    // we doing a request to get an url of each team an get it info
    await request(eachUrlTeam, (error, res, body) => {
        $ = cheerio.load(body)
        let logo = $('.teamHeader__logo')[0].attribs.style.split('(')
        console.log(environment.BASE_URL + logo[1].substr(0, logo[1].length - 1))
        console.log($('.teamHeader__name')[0].children[0].data);
    })
}

module.exports = {getTeams}