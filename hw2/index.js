const minimist = require('minimist');
const fs = require('fs');
const readline = require('readline');

const FILE_RESULT = 'result.txt';
const EAGLE =1;
const TAILS =2;

const argv = minimist(process.argv.slice(2));

var resFile;
var resAr = [];

if(argv['_'][0]==null){
    resFile = FILE_RESULT;
    }
else{
    resFile = argv['_'][0];
} 


fs.exists(resFile, function(exists){
   if(exists){
      fs.readFile(resFile, {encoding: 'utf8'}, function(err, data){
         if(err){
            console.log(err);
         }              
         resAr = JSON.parse(data);
      })
   }
    
});

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

console.log('Start Game\n');
console.log('To exit from game type \'exit\'\n');

rl.on('line', cmd =>{

    if((cmd==EAGLE)||(cmd==TAILS)){
            
        var castCompResult = Math.floor(Math.random() * TAILS) + EAGLE;
        var castPlayerResult = cmd;
        
        console.log(`You say: ${castPlayerResult}, computer cast ${castCompResult}`);
        
        if(castCompResult==castPlayerResult){           
           console.log('You win');
        }
        else{
            console.log('You lose');            
        }
        
        resAr.push((castCompResult==castPlayerResult)*1);
    }
    else{
        if (cmd.toLowerCase()=='exit'){
            fs.writeFile(resFile,JSON.stringify(resAr),'utf8');
            rl.close();
        }
        else console.log('Enter the number 1 or 2');
    }
});