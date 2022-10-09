var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []

//load the input file
//I am reading the json file here
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    //if it works it is loading information into tweetinfo
     tweetinfo = JSON.parse(data);
  }
});
 


//Get functions
//Shows tweets info
app.get('/tweets', function(req, res) {
  //TODO: send all tweets
  var tweets=[];
  tweetinfo.forEach(function(item,index){
    tweets.push({"id":item.id,"text":item.text,"created_at":item.created_at});
   })
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(tweets));
});

//Shows users info
app.get('/users', function(req, res) {
  //TODO: send users info
  //I am getting all users if it is not undefined
  var users=[];
  tweetinfo.forEach(function(item,index){
    if(item.user!=undefined){
    users.push({"id":item.user.id,"screen_name":item.user.screen_name,"name":item.user.name});
  } 
})
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(users));
  
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweet 
  var searchtweets=[];
 //I am searching between users by providing id
 //After finding any occurrences i am displaying on the screen
  tweetinfo.forEach(function(item,index){
    if(item.id==req.query.term){
    searchtweets.push({
    "id":tweetinfo[index].id,
    "text":tweetinfo[index].text,
    "created_at":tweetinfo[index].created_at
    });
    }
    });
  
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(searchtweets));
});

//Post functions


//Posts created tweets
app.get('/createtweet', function(req, res) {
  //TODO: create a tweet.
  //split post data by ;
  var data=req.query.data.split(';');
  //update global tweets variable
  //I am getting the tweets that are created in a certain format
  tweetinfo.push({"id":data[0],"text":data[1],"created_at":new Date()});
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({'msg':'done'}));
});

//Delete 
app.get('/deletetweet', function(req, res) {
  //TODO: delete a tweet
  //delete item from tweetinfo variable
  tweetinfo.forEach(function(item,index){
    //I am checking if the id is same in the data, I am deleting by using splice method
    if(item.id==req.query.tweetid){
 tweetinfo.splice(index, 1);
    }
  });
 res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({'msg':'done'}));
});


//Update user
app.get('/updateuser', function(req, res) {
  //TODO: update user
  var data=req.query.name.split(';');
  //I am splitting
  //After that I am updating user screen_name
  tweetinfo.forEach(function(item,index){
    if(item.user.name==data[0]){
      tweetinfo[index]["user"]["screen_name"]=data[1];
    }
  });
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({'msg':'done'}));
});




app.listen(PORT, function() {
  //I am listening to the
  console.log('Server listening on ' + PORT);
});




