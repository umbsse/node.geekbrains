const request = require('request');
const cheerio = require('cheerio');

request('https://thehackernews.com/', function(err, res, body){
    
    if(err){console.log(err);}
    else{ 
    var $ = cheerio.load(body);
    
    const posts = $('.post.item.module').map(function(i, element){
      
        var articleTitle = $('.url.entry-title.page-link',this);
        var articleText = $('.post-body.entry-content',this);
        
        return {
            title: articleTitle.text(),
            href : articleTitle.attr('href'),
            text : articleText.text()
        };
    });    
    
    console.log(posts);
    }
});