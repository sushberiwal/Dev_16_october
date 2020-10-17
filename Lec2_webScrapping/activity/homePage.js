// homepages.js => request to espn homepage => gives html of espn home page
// npm install request
// request module is used to get html file of a website

const fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");

request( "https://www.espncricinfo.com/series/_/id/8039/season/2019/icc-cricket-world-cup"   , cb  );

function cb(error , response , data){
    
    parseData(data);
}


function parseData(html){

    let ch = cheerio.load(html);
    let link = ch(".widget-items.cta-link a").attr("href");
    console.log(link);    

}
