/* importation des dépendence necessaire */
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const sqlite3 = require('better-sqlite3')
const path = require('path')
const db = sqlite3(path.join(__dirname, '../../data/coin.sqlite')) // connexion a la base de donné

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket_setup')
    .setDescription("permet d'envoyer un poste de création de ticket")
    
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(Interaction){
        const confirm = new ButtonBuilder() // création du bouton
			.setCustomId('ticket-create')
			.setLabel('créer un ticket')
			.setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder() // placage du bouton dans le row
			.addComponents(confirm);

            const Embed = new EmbedBuilder() // création de l'embed
            .setColor(0x0099FF)
            .setTitle('créer un ticket')
            .setDescription('cliquez sur le bouton pour vous créer un ticket afin d\'entrer en contacte avec le staff')

		await Interaction.reply({ // envoi de tout le bordel
			embeds : [Embed],
			components: [row],
        }
    )


    }
}