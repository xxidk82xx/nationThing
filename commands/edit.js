const { SlashCommandBuilder } = require('@discordjs/builders');
const { ReactionUserManager } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('edit')
		.setDescription('edits nation stats'),
	async execute(interaction) {
		if (interaction.user.id !== "518634527267225620")
		{
			interaction.reply({ content: "not allowed to use this command", fetchReply: true })
			return
		}

	},
};