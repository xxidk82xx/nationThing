const discord = require ("discord.js")
const { SelectMenuBuilder, ActionRowBuilder } = require('@discordjs/builders');
const path = require('node:path');
const fs = require("fs");
const { Client, Intents, Collection } = require('discord.js');
const {token} = require('./config.json');
const client = new Client({ intents: ["Guilds", "GuildMessages"] });
client.commands = new Collection();
const nationList = require("./nations.json");

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
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
			let selection = nationList[parseInt(interaction.values)]
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
									value: "war support"
								}
							])
				)
			interaction.update({content: `you selected ${selection.name}`, components: [ActionRow]})
		}
		else if(interaction.customId === "valueSelection")
		{

		}
	}
});
client.login(token);