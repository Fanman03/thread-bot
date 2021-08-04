const { MessageEmbed } = require('discord.js');
const name = 'about';
const description = 'Sends info about this bot.';
module.exports = {
	name: name,
	description: description,
	data: {
		name: name,
		description: description,
	},
	async execute(interaction) {
		const messageEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Thread Bot v1.1 by Fanman03');
		interaction.reply({ embeds: [messageEmbed] });
	},
};
