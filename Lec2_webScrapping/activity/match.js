
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");


function getMatch(link){
    request(link , cb);
}

function cb(error , response , data){
    myfun(data);
}


function myfun(data){
    let ch = cheerio.load(data);
    let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");
    // [ <div> </div> , <div> </div>    ]
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = cheerio(bothInnings[i]).find(".header-title.label").text();
        teamName = teamName.split("Innings")[0].trim();
        console.log(teamName);
        let allBatsmanDetails = cheerio(bothInnings[i]).find(".table.batsman tbody tr");
        // [ <tr> </tr> , <tr> </tr>  , <tr> </tr>  ,<tr> </tr>  , <tr> </tr> ];
        for(let j=0 ; j<allBatsmanDetails.length ; j++){
            let allTds = cheerio(allBatsmanDetails[j]).find("td");
            // [ <td> </td> , <td> </td> ,<td> </td> ]
            if(allTds.length > 1 ){
                // 0,2,3,5,6,7
                let batsmanName = cheerio(allTds[0]).find("a").text().trim();
                let runs = cheerio(allTds[2]).text().trim();
                let balls = cheerio(allTds[3]).text().trim();
                let fours = cheerio(allTds[5]).text().trim();
                let sixes = cheerio(allTds[6]).text().trim();
                let strikeRate = cheerio(allTds[7]).text().trim();
                // String interpolation
                console.log( `Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} SR = ${strikeRate}`);
            }
        }
    }
}


module.exports = getMatch;