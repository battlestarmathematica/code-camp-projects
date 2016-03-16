var generator = require("./time_generator");
var express = require("express");
var app = express();

//8080 is default, process.env.PORT allows heroku to set port
var port = process.env.PORT || 8080 ;

//set view engine to jade
app.set('view engine','jade');
app.set('views','./')
//look in default directory for js, css, template files
app.use(express.static(__dirname + '/public'));


app.use(function(req,res){
    var path = req.path;
    var path_decode;
    //check if passed string is unixtime or natural number
    if(isNaN(Number(path.substring(1)))){
    	path_decode = decodeURIComponent(path);
    }
    else{
    	path_decode = parseInt(path.substring(1));
    }

    var time = JSON.stringify(generator.checkQuery(path_decode));
    //if the time isn't null or an unexpected query, render the the site
    if(time !== null){
    res.render('index',{json_holder:time});
    }
});

app.listen(port, function(){
    console.log("Node listening on port" + port);
});
