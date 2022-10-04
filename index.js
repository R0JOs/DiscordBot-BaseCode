//Imports
if (process.platform !== "win32") require("child_process").exec("npm install");
const ac = require('ansi-colors');
const fs = require('fs')
const yaml = require("js-yaml")
const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'))
const { Collection, Client, GatewayIntentBits, Partials, ActivityType, REST, Routes, Discord } = require('discord.js');
const commands = [];
const path = require('path');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const clientId = config.clientID
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));;
module.exports = fs

//Client

const client = new Client({
    restRequestTimeout: 60000,
    partials: [Partials.Reaction],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildBans,
    ]
})
module.exports = client
client.commands = new Collection();
// Error Handler
client.on('warn', async (error) => {
    console.log(ac.red.bold('Warn detected. | Detailed information below.'))
    console.log(error.stack)
})

client.on('error', async (error) => {
    console.log(ac.red.bold('Error detected. | Detailed information below.'))
    console.log(error.stack)
})

process.on('unhandledRejection', async (error) => {
    console.log(ac.red.bold('Unhandled Rejection detected. | Detailed information below.'))
    console.log(error.stack)
})

process.on('uncaughtException', async (error) => {
    console.log(ac.red.bold('Uncaught Exception detected. | Detailed information below.'))
    console.log(error.stack)
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

    } catch (error) {
        console.log(ac.red.bold('Error when loading the commands detected. | Detailed information below.') + ac.gray.bold(" | ") + ac.cyanBright(`Fetched command files: ${commandFiles}`))
        console.error(error.stack);
    }
})();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.login(config.token)