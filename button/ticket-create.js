const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const { clientId, everyoneId } = require(`../config.json`)

module.exports = {
    async buttonFunc(Interaction){
        const guild = Interaction.guild;
                    const category = guild.channels.cache.get("1345128366050906215"); // get the category where the bot will create the ticket
                    const ticket = await guild.channels.create({
                        name: `ticket de ${Interaction.user.displayName}`, // name of the ticket
                        type: 0, // type 0 = texte channel
                        parent: category, // creating the channel in category
                        permissionOverwrites: [
                            {
                            id: clientId,
                            allow: ['ViewChannel']  // allow view channle to bot
                            },
                            {
                            id: Interaction.user.id,
                            allow: ["ViewChannel"] // allow view channel to ticket owner
                            },
                            {
                            id: everyoneId,
                            deny: ["ViewChannel"] // deny view channel to everyone mention
                            },
                            {
                            id: "1345135946294890568",
                            allow: ["ViewChannel"] // i no longer remember what this ID
                            }

                                        
                            ]
                    });
                    const delet = new ButtonBuilder() // create the delet button
			            .setCustomId('delet-ticket')
			            .setLabel('supprimer le ticket')
			            .setStyle(ButtonStyle.Danger);

                    const transcript = new ButtonBuilder() // create transcript button
			            .setCustomId('transcript-ticket')
			            .setLabel('transcription')
			            .setStyle(ButtonStyle.Secondary);

                    const row = new ActionRowBuilder() // put button in a row
                        .addComponents(delet, transcript);

                    const Embed = new EmbedBuilder() // create the embed of the ticket
                        .setColor(0x0099FF)
                        .setTitle(`bienvenue ${Interaction.user.displayName}`)
                        .setDescription('le staff réponsdra a votre demande des que possible')

                    await ticket.send({ // sending the ticket
                        embeds : [Embed],
                        components: [row],})
                    await Interaction.reply({ content: `votre ticket a été crée avec succes`, ephemeral: true})

    }


}