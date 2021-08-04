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
		await interaction.reply('Thread Bot v1.1 by Fanman03.');
	},
};
