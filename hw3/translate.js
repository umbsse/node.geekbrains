const request = require('request');
const http = require('http');
const server = http.createServer().listen(8080);
const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
const key = 'trnsl.1.1.20171102T042100Z.858c63b3b19e1232.5a1597159b4d03c95564b15d2b9429c6d4f42651';

var options = {
    url: url,
    method: 'GET',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
    qs: {
        lang: 'en-ru',
        key: key,
        text: ''
    }
}


server.on('request', function(req, res){
    
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('Hello. To translate into Russian use get param text like /?text=<br>');
    var parseReq = require('url').parse(req.url, true);
    
    if(parseReq.query.text){
        
        options.qs.text = decodeURIComponent(parseReq.query.text);
        request(options, function(errReq, resReq, bodyReq){
            
            if(errReq){console.log(errReq);}
            else{ 
                let translatedText = JSON.parse(bodyReq).text[0];
                res.write(`You type ${options.qs.text} : translate to russian ${translatedText}`); 
                res.end();
            }
        });
    }
    else {res.end();}
});

