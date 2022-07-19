const { SlashCommandBuilder } = require('@discordjs/builders');

const nationList = require("../nations.json");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('lists all of the nations and players'),
	async execute(interaction) {
		let replycache = ""
        nationList.forEach(db => {
            replycache += db.name + ": " + db.player + "\n";
        });
        interaction.reply({ content: replycache, fetchReply: true })
	},
};