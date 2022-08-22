const { SlashCommandBuilder } = require('@discordjs/builders');
const d20 = require('d20');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('rolld a die')
		.addStringOption(option => option.setName('input').setDescription('Enter a string')),
	async execute(interaction) {
		const string = interaction.options.getString('input');
		interaction.reply({ content: d20.verboseRoll(string).toString(), fetchReply: true })
	},
};