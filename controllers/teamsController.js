const cheerio = require('cheerio');
const request = require('request');
const environment = require('dotenv').config().parsed;
// function to get football teams attributes
const getTeams = async (url) => {
    let teams = []
    await request(url, (error, res, body) => {
        let league = url.split('/')[5]
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
                getEachTeam(eachUrlTeam,teams,league);
            })
        }
    })
}

// get each team
async function getEachTeam(eachUrlTeam,teams,league){
    // we doing a request to get an url of each team an get it info
    await request(eachUrlTeam, (error, res, body) => {
        $ = cheerio.load(body)
        let aux = $('.teamHeader__logo')[0].attribs.style.split('(')
        let logo = environment.BASE_URL + aux[1].substr(0, aux[1].length - 1)
        let name = $('.teamHeader__name')[0].children[0].data.trim()
        let country = $('.tournament').find('a')[1].children[0].data
        // console.log($('.event__title--name').find('span')[0]);
        // put into an array all attributes of new team
        teams.push({logo: logo, name: name, country: country, league: league})
        console.log(teams);
    })
}

module.exports = {getTeams}