//a simple program that uses the rolz.org API to return a dice number. 
var botId = "Your Bot id here";
function sendText(text){
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '"}'})
}

//respond to messages sent to the group. Recieved as POST
//this method is automatically called whenever the Web App's (to be) URL is called
function doPost(e){
  var post = JSON.parse(e.postData.getDataAsString());
  var text = post.text;
  
  //check if user entered '!dice' command
  if(text.toLowerCase().substring(0, 5) == "!dice"){
  
    //get the random number from Rolz.com
    
    // Slices out the spisific roll from text to send to rolz
    var roll = text.slice(6)
    var url = 'http://rolz.org/api/?'
              + roll
              + '.json'
    //sends request
    var response = UrlFetchApp.fetch(url);
    var json = response.getContentText();
    var data = JSON.parse(json);
    var equ = " ="
   //Sends messgae to groupme
    sendText(data.result + equ + data.details);
  }  
}
