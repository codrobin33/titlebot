var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var bot_token = process.env.SLACK_BOT_TOKEN || '';

var list = require('./title_list.js');
var config = require('./config.js');

var rtm = new RtmClient(config.apiKey);

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  if (message.text.includes(`<@${rtm.activeUserId}>`)) {
    if (message.text.toLowerCase().includes('title me')) {
      var title = list[Math.floor(Math.random()*list.length)];
      rtm.sendMessage(`<@${message.user}>, ${title}`, message.channel);
    }
  }
});

rtm.start();
