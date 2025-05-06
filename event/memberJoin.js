// const { Events, EmbedBuilder } = require('discord.js')

// module.exports = {
//     name: Events.GuildMemberAdd,
//     async execute(member){

//         const guild = member.guild
//         const role = await guild.roles.fetch("1292502143953145906")
//         const channel = guild.channels.cache.find(channel => channel.id === '1309599506093969459')
//         const embed = new EmbedBuilder()
//             .setColor(0x0000FF)
//             .setThumbnail(member.displayAvatarURL({ dynamic: true, size: 512 }))
//             .setTitle(`bienvenue a ${member.displayName}`)
//             .setDescription(`Bienvenue a toi ${member.displayName} nous esperons que tu te plairas sure le serveur de ${guild.Name}`)
//             .setTimestamp()
//         await channel.send({ embeds : [embed] })
//         await member.roles.add(role)
//         }



// }