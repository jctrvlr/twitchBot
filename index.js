var tmi = require("tmi.js");
var _ = require('lodash');
//const fs = require('fs'); // Commented lines are for dictionary of words.
//var wordListPath = require("word-list");

//const wordDict = fs.readFileSync(wordListPath, 'utf8').split('\n');

// Channels for bot to listen in - Add # before channel name
var channels = ["#hammi"];

// Options for Twitch
var tmioptions = {
    options: {
        clientId: "6fqnb9p9vwqhk8h4keph9b7rv4f7rx",
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "hammicusrex",
        password: "oauth:g0ta9njbug2dzpfsf4ggonor5x9esi"
    },
    channels: channels
};

/****
 **** Helper functions
 ****/

/**
 * Parses message into array of words
 * @param { String } message - Message that was received from chatroom
 * @returns { Array } - Array of words in message
 */
function parseMessage(message) {
  var lowMessage = message.toLowerCase();
  if (_.includes(lowMessage, '?')) {
    lowMessage = lowMessage.replace("?"," ?");
  } else if (_.includes(lowMessage, '.')) {
    lowMessage = lowMessage.replace("."," .");
  } else if (_.includes(lowMessage, ',')) {
    lowMessage = lowMessage.replace(","," ,");
  }
  return _.split(lowMessage, ' ');
}

/**
 * Detect interrogative word from Array
 * @param { Array } words - Array of words from message
 * @returns { Array } - Array of interrogative words found in message
 * TODO: Figure out how to parse compound sentences (two whats, two who's, etc)
 */
function detectInter(words) {
  var interList = ['which', 'what', "what's", 'whats', 'whose', 'who', 'whom', 'whose', 'where', 'how', "how's", 'why', 'whether', 'whither', 'when', '?'];
  var match = [];
  for (var i = 0, len = words.length; i < len; i++) {
    for (var j = 0, interLen = interList.length; j < interLen; j++) {
      if (words[i] === interList[j]) {
        match.push(words[i]);
        interList.splice(j, 1);
      }
      continue;
    }
  }
  return match;
}

/**
 * Counts number of context words
 * @param { Array } resList - Array of context words, linked to responses
 * @param { Array } message - Message parsed into individual words of array
 * @returns { String } resMess -
 * @returns { Integer } count - Number of matching context words -- (context words must be shared to a response)
 */
function contextCount(resList, message) {
  /* TODO WRITE CONTEXT COUNT FOR LOOPS */
  return {
    resMess: resMess,
    count: count
  };
}

/**
 * Gets list of saved commands from database
 * @param { String } channel - Channel name
 * @return { Array } -
 */
function getCommands(channel) {

}

/* END of Helper Functions */

/****
 **** Main functions
 ****/



var client = new tmi.client(tmioptions);
client.connect();

client.on("message", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;
    var messArray = [];
    var messLength = 0;
    // Handle different message types..
    switch(userstate["message-type"]) {
        case "action":
            // This is an action message..
            break;
        case "chat":
            messArray = parseMessage(message);
            messLength = messArray.length;
            if((inter = detectInter(messArray)) !== []) {

            }
            break;
        case "whisper":
            // This is a whisper..
            break;
        default:
            // Something else ?
            break;
    }
});
