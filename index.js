const discord = require ("discord.js")
const { token } = require('./config.json');
const fs = require("fs");
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: ["Guilds", "GuildMessages"] });
const nationList = require("./nations.json");

client.once('ready', () =>
{
    //const general = client.channels.cache.get('978451004800507919')
    //general.send("test")
})

client.on('ready', () => 
{
    const guild = client.guilds.cache.get("978451004158783509")
    let commands;
    if(guild)
    {
        commands = guild.commands
    } 
    else 
    {
        commands = client.application?.commands
    }
    commands?.create
    ({
        name: 'list',
        description: 'lists all the nations and users',
    })
})

client.on('interactionCreate', async (interaction) => 
{
    if(!interaction.isChatInputCommand()) return
    if(interaction.commandName === "list")
    {
        let replycache = ""
        nationList.forEach(db => {
            replycache += db.name + ": ";
            replycache += db.player;
            replycache += "\n"
        });
        interaction.reply({ content: replycache, fetchReply: true })
    }
})

client.login(token);