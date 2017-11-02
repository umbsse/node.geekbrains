const minimist = require('minimist');
const fs = require('fs');

const FILE_RESULT = 'result.txt';
const argv = minimist(process.argv.slice(2));

var analyzeFile;
var analyzeAr = [];

var maxSeriesWin = 0;
var maxSeriesLose = 0;



if(argv['_'][0]==null){
    analyzeFile = FILE_RESULT;
    }
else{
    analyzeFile = argv['_'][0];
} 

fs.exists(analyzeFile, function(exists){
    console.log(exists);
   if(exists){
      fs.readFile(analyzeFile, {encoding: 'utf8'}, function(err, data){
         if(err){
            console.log(err);
         }              
          analyzeAr = JSON.parse(data);
          var win = 0;
          var lose = 0;
          var seriesWin = 0;
          var seriesLose = 0;
          for (var i=0, len = analyzeAr.length; i<len; i++){
              
              if(analyzeAr[i]==0){
                  lose++;
                  seriesLose++;
                  maxSeriesWin = Math.max(seriesWin, maxSeriesWin);
                  seriesWin=0;
       
              }
              else{
                  win++;
                  seriesWin++;
                  maxSeriesLose = Math.max(seriesLose, maxSeriesLose);
                  seriesLose = 0;
              }
                       
              if(i == len-1){
                        maxSeriesLose = Math.max(seriesLose, maxSeriesLose);
                        maxSeriesWin = Math.max(seriesWin, maxSeriesWin);
              }
          }
          console.log(`You plays ${analyzeAr.length} `);
          console.log(`You win ${win} `);
          console.log(`You lose ${lose} `);
          console.log(`You lose series ${maxSeriesLose} `);
          console.log(`You win series ${maxSeriesWin} `);
      })
   }
});