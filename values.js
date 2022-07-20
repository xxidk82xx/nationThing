module.exports = { stability }
fs = require('fs');

const { channel } = require('diagnostics_channel');
const { waitForDebugger } = require('inspector');
var nations = require('./nations.json')

function stability(interaction, textInput, nationSel, client)
{
	interaction.update({content: "send the new stability value to chat", components: []})
	textInput[0] = interaction.user.id
	textInput[1] = interaction.channel.id
	let filter = m => m.author.id === textInput[0]
	client.channels.cache.get(textInput[1]).awaitMessages(filter, {
		max: 1,
		time: 30000,
		errors: ['time']
	  })
	  .then(reply =>
		{
			if(parseInt(reply.cleanContent) >= 0 && parseInt(reply.cleanContent) <= 100 )
			{
				nations[nationSel].stability = parseInt(reply.cleanContent)
				fs.writeFileSync("./nations.json", nations);
				client.channels.cache.get(textInput[1]).send(`set stability of ${nations[nationSel].name} to ${reply}`)
				return 0;
			}
		})
}

