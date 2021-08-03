const name = 'tclose';
const description = 'Archives a thread.';
module.exports = {
	name: name,
	description: description,
	data: {
		name: name,
		description: description,
	},
	async execute(interaction) {
		if (interaction.channel.isThread()) {
			await interaction.reply('Thread closed.');
			interaction.channel.setArchived(true);
		} else {
			interaction.reply('This command only works inside of a thread.');
		}
	},
};
