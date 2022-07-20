const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder } = require('@discordjs/builders');
const { ReactionUserManager } = require('discord.js');
const nationList = require("../nations.json");

module.exports = 
{
	data: new SlashCommandBuilder()
	.setName('edit')
	.setDescription('edits nation stats'),		
	
	async execute(interaction) 
	{
		
		let menuContents = [{}]
		let length = 0;
		nationList.forEach(db => 
		{
			if( length == 0)
			{
				menuContents[0] = 
				{
					label: db.name,
					description: db.player,
					value: db.id.toString()
				}
			}
			else
			{
				menuContents.push
				(
					{
						label: db.name,
						description: db.player,
						value: db.id.toString()
					}
				)
			}
			length++
		});
		var ActionRow = new ActionRowBuilder()
			.addComponents
			(
				new SelectMenuBuilder()
					.setMinValues(1)
					.setMaxValues(1)
					.setPlaceholder("select a nation")
					.setCustomId("nationSelection")
					.setOptions(menuContents)
			)
		await interaction.reply({components: [ActionRow]});
		
	},
};