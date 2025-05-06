const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const { clientId, everyoneId } = require(`../config.json`)

module.exports = {
    async buttonFunc(Interaction){
        const guild = Interaction.guild;
                    const category = guild.channels.cache.get("1345128366050906215");
                    const ticket = await guild.channels.create({
                        name: `ticket de ${Interaction.user.displayName}`,
                        type: 0,
                        parent: category,
                        permissionOverwrites: [
                            {
                            id: clientId,
                            allow: ['ViewChannel']
                            },
                            {
                            id: Interaction.user.id,
                            allow: ["ViewChannel"]
                            },
                            {
                            id: everyoneId,
                            deny: ["ViewChannel"]
                            },
                            {
                            id: "1345135946294890568",
                            allow: ["ViewChannel"]
                            }

                                        
                            ]
                    });
                    const delet = new ButtonBuilder()
			            .setCustomId('delet-ticket')
			            .setLabel('supprimer le ticket')
			            .setStyle(ButtonStyle.Danger);

                    const transcript = new ButtonBuilder()
			            .setCustomId('transcript-ticket')
			            .setLabel('transcription')
			            .setStyle(ButtonStyle.Secondary);

                    const row = new ActionRowBuilder()
                        .addComponents(delet, transcript);

                    const Embed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle(`bienvenue ${Interaction.user.displayName}`)
                        .setDescription('le staff réponsdra a votre demande des que possible')

                    await ticket.send({
                        embeds : [Embed],
                        components: [row],})
                    await Interaction.reply({ content: `votre ticket a été crée avec succes`, ephemeral: true})

    }


}