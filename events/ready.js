const ac = require('ansi-colors');
const fs = require('fs')
const { Collection, Client, GatewayIntentBits, Partials, ActivityType, REST, Routes, Discord } = require('discord.js');
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(ac.gray.bold('[STARTUP] ') + ac.green.bold(`Bot started and ready to use.`) + ac.gray.bold(` | `) + ac.blueBright.bold(`Logged in as ${client.user.tag}`))
    },
};