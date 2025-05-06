const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js') // import for later
const { clientId, everyoneId } = require(`../config.json`) // import some ID for later

module.exports = {
    async buttonFunc(Interaction){
        await Interaction.reply({content: `le bot est toujours en cours de création et de mise a jours lourde cette fonctionalité sera ajouté sous peu`, ephemeral: true})

    }
    


}