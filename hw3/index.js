const request = require('request');
const cheerio = require('cheerio');

request('https://thehackernews.com/', function(err, res, body){
    
    if(err){console.log(err);}
    else{ 
    var $ = cheerio.load(body);
    var posts = [];

    $('.post.item.module').each(function(i, element){
      
        var articleTitle = $('.url.entry-title.page-link',this);
        var articleText = $('.post-body.entry-content',this);
        
        posts.push({
            title: articleTitle.text(),
            href : articleTitle.attr('href'),
            text : articleText.text()
        });
    });    
    
    console.log(posts);
    }
});