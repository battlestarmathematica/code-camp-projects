module.exports.checkQuery = function(string){
    var jsonOutput;
    var date;
    try{
        var date = new Date(string);
        var unixTime = date.getTime();
        var naturalTime = date.toDateString();
        jsonOutput = {unix:unixTime,
                      natural:naturalTime};
        
    }
    catch(err){
        console.error(err);
        jsonOutput = {unix:null,
                      natural:null};
        }
        if(jsonOutput.natural === "Invalid Date"){
            jsonOutput.natural=null;
        }
        return jsonOutput;
    }
    