const fs = require('fs');
const { Client, Collection, Intents, Message, MessageAttachment } = require('discord.js');
const config = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Bot ready!');
	client.user.setActivity('/tcreate', { type: 'PLAYING' });
});

client.on('messageCreate', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!deploy' && message.author.id == 303014314208395265) {
		// console.log('Deploying slash commands');
		// let server = client.guilds.cache.get('852703867572715560');
		// console.log(server.commands);
		client.guilds.cache.get('477912521806839819')?.commands.set([])
			.then(console.log)
			.catch(console.log);
		client.application?.commands.set([])
			.then(console.log)
			.catch(console.log);
		for (const file of commandFiles) {
			const command = require(`./commands/${file}`);
			const slashCmd = await client.application?.commands.create(command.data);
			console.log(slashCmd);
		}
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (!client.commands.has(interaction.commandName)) return;

	try {
		await client.commands.get(interaction.commandName).execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(config.token);