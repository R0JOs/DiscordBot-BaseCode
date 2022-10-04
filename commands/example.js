kconst { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const discord = require("discord.js")
const fs = require('fs')
const client = require("../index.js").client
const { prefix } = require("../config/config.json")//the prefix for the bot from config.json
const { hello } = "../config/config.json"//useless

//modules
module.exports = {
    data: new SlashCommandBuilder()
        .setName('example')
        .setDescription(`Example command`),
    async execute(interaction, client) {
        await interaction.reply({ content: 'asd', ephemeral: true })
}}
