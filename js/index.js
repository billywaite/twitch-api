$(document).ready(function() {
  //variables for inserting into html and array of twitch channels
  var online = $('.online');
  var offline = $('.offline');
  var accountClosed = $('.accountClosed');
  var channels = ["freecodecamp", "cretetion", "wintergaming", "esl_clanmystik", "habathcx", "RobotCaleb", "brunofin", "noobs2ninjas", "ogamingsc2", "comster404"];
  
//loop to create each api url and hyperlink
  channels.forEach(function(channel) {
      var jsonChannel = 'https://api.twitch.tv/kraken/streams/' + channel + '?callback=?';
    var hyperlink = 'https://secure.twitch.tv/' + channel;

//api call
    $.getJSON(jsonChannel, function(json) {
      
//if else loop takes each jsonChannel from above and creates an a element and a div. Inside the div is a logo, channel name, channel game if they are online, and channel status. Append the div to the a element so the whole section is hyperlinked.
      
//if section is for the offline streams
      if (json.stream === null) {
        var aOffElement = $('<a>');
        var offlineElement = $('<div>');
        var button = $('button');
        aOffElement.attr('href', hyperlink).attr('target', "_blank").attr('role', button);
        offlineElement.append($('<img>').attr('src', 'http://www.clipartbest.com/cliparts/9iz/MbE/9izMbE7iE.png'))
        offlineElement.append($('<h2>').text(channel));
        offlineElement.append($('<h3>').text('Offline'));
        aOffElement.append(offlineElement);
 //else if section is for the account closed streams
      } else if (json.stream === undefined) {
        var aClosedElement = $('<a>');
        var accountClosedElement = $('<div>');
        var button = $('button');
        aClosedElement.attr('href', hyperlink).attr('target', "_blank").attr('role', button);
        accountClosedElement.append($('<img>').attr('src', 'http://www.clipartbest.com/cliparts/9iz/MbE/9izMbE7iE.png'))
        accountClosedElement.append($('<h2>').text(channel));
        accountClosedElement.append($('<h3>').text('Account Closed'));
        aClosedElement.append(accountClosedElement);
//else section is for the online streams
      } else {
        var aOnlineElement = $('<a>');
        var onlineElement = $('<div>');
        var button = $('button');
        aOnlineElement.attr('href', json.stream.channel.url).attr('target', "_blank").attr('role', button);
        onlineElement.append($('<img>').attr('src', json.stream.channel.logo));
        onlineElement.append($('<h2>').text(channel));
        onlineElement.append($('<h3>').text(json.stream.game + ': ' + json.stream.channel.status));
aOnlineElement.append(onlineElement);
      }
//after the if else loop runs the data is appended to the initial variables online, offline, accountClosed which adds it to the HTML.
      online.append(aOnlineElement);
      offline.append(aOffElement);
      accountClosed.append(aClosedElement);
    });
  });
});