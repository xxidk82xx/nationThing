const discord = require ("discord.js")
const { SelectMenuBuilder, ActionRowBuilder } = require('@discordjs/builders');
const path = require('node:path');
const fs = require("fs");
const { Client, Intents, Collection } = require('discord.js');
const {token} = require('./config.json');
const client = new Client({ intents: ["Guilds", "GuildMessages"] });
client.commands = new Collection();
const nationList = require("./nations.json");
const values = require("./values.js");
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


let nationSel = 0;
let textInput = ['','',''];

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => 
{
	console.log('Ready!');
});

//client.on("messageCreate", async message =>
//{
//	if(message.channel.id == textInput[1] && message.author.id == textInput[0]) textInput[2] = message
//})

client.on('interactionCreate', async interaction => 
{
	if (interaction.isChatInputCommand())
	{
		const command = client.commands.get(interaction.commandName);
		
		if (!command) return;
		
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	else if (interaction.isSelectMenu())
	{
		if(interaction.customId === "nationSelection")
		{
			nationSel = parseInt(interaction.values)
			let selection = nationList[nationSel]
			var ActionRow = new ActionRowBuilder()
			.addComponents
			(
				new SelectMenuBuilder()
				.setMinValues(1)
				.setMaxValues(1)
						.setPlaceholder("now select a value")
						.setCustomId("valueSelection")
						.setOptions(
							[
								{
									label: `stability: ${selection.stability}`,
									description: "the stability of the nation",
									value: "stability"
								},
								{
									label: `war support: ${selection.warSupport}`,
									description: "the war support of the nation",
									value: "warSupport"
								},
								{
									label: `government structure: ${selection.governmentStructure.name}`,
									description: "the structure of the nations government",
									value: "governmentStructure"
								},
								{
									label: `government ideology: ${selection.governmentIdeology.name}`,
									description: "the ideology of the nation",
									value: "governmuntIdeology"
								},
								{
									label: `tax: ${selection.tax}`,
									description: "the tax rate of the nation",
									value: "tax"
								},
								{
									label: `inflation: ${selection.inflation}`,
									description: "the inflation rate of the nation",
									value: "inflation"
								},
								{
									label: `maintenance: ${selection.maintenance}`,
									description: "the maintenance level of the nation",
									value: "maintenance"
								},
								{
									label: `conscription: ${selection.conscription.name}`,
									description: "the conscription law of the nation",
									value: "conscription"
								},
								{
									label: `military: ${selection.military}`,
									description: "the amount of people in the military",
									value: "military"
								},
								{
									label: `religous law: ${selection.religon.name}`,
									description: "the religous law of the nation",
									value: "religon"
								}
							])
							)
							interaction.update({content: `you selected ${selection.name}`, components: [ActionRow]})
						}
						else if(interaction.customId === "valueSelection")
						{
							switch(interaction.values[0])
							{
								case "stability":
									values.stability(interaction, textInput, nationSel, client);
									break;
							}
						}
		}
	});
	client.login(token);