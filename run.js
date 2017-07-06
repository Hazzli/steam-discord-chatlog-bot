// Purplenull Chat & Friend Request Discord Logger
// Logs everything into a discord server for easy access.


// [Config]
// Steam Login
var Steamusername = "Username_Here"; //Steam Username
var Steampassword = "Password_Here"; // Steam Password
// Discord Bot Config
var DiscordChannelIDFriend = "CHANNEL_ID_FRIEND"; // Discord Channel ID for friend request logs
var DiscordChatID = "CHANNEL_ID_CHAT"; // Discord Channel ID for chat logs
var DiscordBotToken = "BOT_TOKEN"; // Discord Bot Token
//End of Config


var date = new Date();
var current_hour = date.getHours();

var SteamUser = require('steam-user');
var client = new SteamUser();
var SteamCommunity = require('steamcommunity');
var SteamTotp = require('steam-totp');
var fs = require('fs');
var community = new SteamCommunity();

const Discord = require('discord.js');
const discord = new Discord.Client();
const token = DiscordBotToken;
var community = new SteamCommunity();

discord.on('ready', () => {
});

discord.on('debug', console.log);

discord.on('error', m => console.log('debug', new Error(m).stack));
discord.on('reconnecting', m => console.log('reconnecting', m));
discord.login(token);


var logOnOptions = {
  "accountName": Steamusername,
  "password": Steampassword,
  "twoFactorCode": SteamTotp.generateAuthCode("sharedSecret")
};

client.logOn(logOnOptions);

client.on('loggedOn', function() {
  console.log("Logged into Steam");
});


// Friend Request Logs
//
//
client.on('friendRelationship', function(sid, relationship) {

  if (relationship == SteamUser.Steam.EFriendRelationship.Friend) {
       discord.channels.get(DiscordChannelIDFriend).send("[ADDED] Now friends with " + " ( http://steamcommunity.com/profiles/" + sid + " )");
    console.log("[ADDED] Now friends with " + " ( " + sid + " )");
  }

  if (relationship == SteamUser.Steam.EFriendRelationship.Blocked) {
    discord.channels.get(DiscordChannelIDFriend).send("[BLOCKED] Blocked " + " ( http://steamcommunity.com/profiles/" + sid + " )");
    console.log("[BLOCKED] Blocked " + " ( " + sid + " )");
  }

  if (relationship == SteamUser.Steam.EFriendRelationship.None) {
    discord.channels.get(DiscordChannelIDFriend).send("[REMOVED] Removed " + " ( http://steamcommunity.com/profiles/" + sid + " )");
    console.log("[REMOVED] Removed " + " ( " + sid + " )");
  }

  if (relationship == SteamUser.Steam.EFriendRelationship.Ignored) {
    discord.channels.get(DiscordChannelIDFriend).send("[IGNORED] Ignored " + " ( http://steamcommunity.com/profiles/" + sid + " )");
    console.log("[IGNORED] Ignored " + " ( " + sid + " )");
  }

  if (relationship == SteamUser.Steam.EFriendRelationship.RequestRecipient) {
    discord.channels.get(DiscordChannelIDFriend).send("[RequestRecipient] Request Recipient " + " ( http://steamcommunity.com/profiles/" + sid + " )");
    console.log("[RequestRecipient] Request Recipient " + " ( " + sid + " )");
  }

  if (relationship == SteamUser.Steam.EFriendRelationship.RequestInitiator) {
    discord.channels.get(DiscordChannelIDFriend).send("[RequestInitiator] Request Initiator http://steamcommunity.com/profiles/" + " ( " + sid + " )");
    console.log("[RequestInitiator] Request Initiator " + " ( " + sid + " )");
  }

  if (relationship == SteamUser.Steam.EFriendRelationship.PendingInviter) {
    discord.channels.get(DiscordChannelIDFriend).send("[FRIENDINVITESENT] Friend Invite Sent to http://steamcommunity.com/profiles/" + " ( " + sid + " )");
    console.log("[FRIENDINVITESENT] Friend Invite Sent to " + " ( " + sid + " )");
  }

  if (relationship == SteamUser.Steam.EFriendRelationship.IgnoredFriend) {
    discord.channels.get(DiscordChannelIDFriend).send("[IGNOREDFRIEND] Ignored Friend Request http://steamcommunity.com/profiles/" + " ( " + sid + " )");
    console.log("[IGNOREDFRIEND] Ignored Friend Request " + " ( " + sid + " )");
  }

  if (relationship == SteamUser.Steam.EFriendRelationship.SuggestedFriend) { // 7
    discord.channels.get(DiscordChannelIDFriend).send("[SUGGESTED] Suggested Friend" + " ( http://steamcommunity.com/profiles/" + sid + " )");
    console.log("[SUGGESTED] Suggested Friend" + " ( " + sid + " )");
  }

});
//
// End of friend request logs
//



// Chat Logs
client.on('friendMessage', function (steamID, message) {
  if (message) {
   discord.channels.get(DiscordChatID).sendMessage(date + " | " + + current_hour + ": " + message + " from: " + " http://steamcommunity.com/profiles/" + steamID);
  }
});
// End of chat logs