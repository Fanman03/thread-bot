const { MessageEmbed } = require('discord.js');
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
			const messageEmbed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Thread closed.')
				.setFooter('Thread Bot by Fanman03', 'https://images-ext-2.discordapp.net/external/qFUpVs1VHK1zvWBc6T_bDMqNKYsO2pEXDgSAq8bb-OM/https/cdn.discordapp.com/avatars/303014314208395265/f715f04af3a3d07ef9607aae597e10fb.webp'); interaction.channel.setArchived(true);
			await interaction.reply({ embeds: [messageEmbed] });
		}
		else {
			const messageEmbed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('This command only works inside of a thread.')
				.setFooter('Thread Bot by Fanman03', 'https://images-ext-2.discordapp.net/external/qFUpVs1VHK1zvWBc6T_bDMqNKYsO2pEXDgSAq8bb-OM/https/cdn.discordapp.com/avatars/303014314208395265/f715f04af3a3d07ef9607aae597e10fb.webp');
			interaction.reply({ embeds: [messageEmbed] });
		}
	},
};
