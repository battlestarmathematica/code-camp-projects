var os = require('os');
var accepts = require('accepts');
var express = require("express");
var app = express();

//8080 is default, process.env.PORT allows heroku to set port
var port = process.env.PORT || 8080 ;

//set view engine to jade
app.set('view engine','jade');
//look in default directory for js, css, template files
app.use(express.static(__dirname + '/public'));
app.set('views','./')


app.use(function(req,res){
    var properties;
    var connection;
    //return the most preferred language of the client
    var language = accepts(req).languages()[0];
    var type = os.type();
    var version = os.release();
    //try to use user's socket object for ip;
    try{
        connection = req.connection.remoteAddress;

    }
    catch(err){
        console.error(err);
        //try to get remote IP from proxy, if this returns null final
        //properties object will say that it can't determine IP address
        connection = req.headers['x-forwarded-for'];
    }

    properties = {ip:connection,language:language,software:type + "; version " + version};
    property_string = JSON.stringify(properties);

    res.render('index',{json_holder:property_string});
});

app.listen(port, function(){
    console.log("Node listening on port..." + port);
});
