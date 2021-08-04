const crypto = require('crypto');
const { MessageEmbed } = require('discord.js');
const name = 'tcreate';
const description = 'Creates a new thread.';
module.exports = {
	name: name,
	description: description,
	data: {
		name: name,
		description: description,
		options: [{
			name: 'input',
			type: 'STRING',
			description: 'The ID of the message from which to create the thread.',
			required: true,
		}],
	},
	async execute(interaction) {
		// Create new thread
		const threadname = 'ticket-' + rand_string(8);
		const thread = await interaction.channel.threads.create({
			name: threadname,
			autoArchiveDuration: 1440,
			reason: 'New tech support thread.',
		});

		// Add original message author to thread
		const originalMessageId = interaction.options.getString('input');
		const originalMessage = await interaction.channel.messages.fetch(originalMessageId);
		await thread.members.add(originalMessage.author.id);

		// Resend original message
		const messageEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Support request:')
			.setAuthor(originalMessage.author.username, originalMessage.author.avatarURL())
			.setDescription(originalMessage.content)
			.setTimestamp(originalMessage.createdTimestamp)
			.setFooter('Thread Bot by Fanman03', 'https://images-ext-2.discordapp.net/external/qFUpVs1VHK1zvWBc6T_bDMqNKYsO2pEXDgSAq8bb-OM/https/cdn.discordapp.com/avatars/303014314208395265/f715f04af3a3d07ef9607aae597e10fb.webp');
		thread.send({ embeds: [messageEmbed] });
		console.log(originalMessage);

		// Add creator of thread to new thread
		const threadCreator = interaction.user.id;
		await thread.members.add(threadCreator);

		// Add other help bot to thread
		try {
			await thread.members.add('751229270667559003');
		}
		catch {
			console.log('Unable to add RGBot.');
		}

		// Reply to interaction
		interaction.reply('Created thread ' + threadname + ' sucessfully.');
	},
};

function rand_string(n) {
	if (n <= 0) {
		return '';
	}
	let rs = '';
	try {
		rs = crypto.randomBytes(Math.ceil(n / 2)).toString('hex').slice(0, n);
		/* note: could do this non-blocking, but still might fail */
	}
	catch (ex) {
		/* known exception cause: depletion of entropy info for randomBytes */
		console.error('Exception generating random string: ' + ex);
		/* weaker random fallback */
		rs = '';
		let r = n % 8, q = (n - r) / 8, i;
		for (i = 0; i < q; i++) {
			rs += Math.random().toString(16).slice(2);
		}
		if (r > 0) {
			rs += Math.random().toString(16).slice(2, i);
		}
	}
	return rs;
}