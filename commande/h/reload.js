const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { galaxId } = require("../../config.json")
/* 
cette commande n'est pas encore commenté car elle n'est pas destiné a être changé pour l'instant
*/
module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription("cette commane permet d'en recharger une autre")
        .addStringOption(option =>
            option.setName('command')
            .setDescription('the command that you would reload')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        console.log(interaction.user.id)
        if (interaction.user.id === galaxId) {
            const commandName = interaction.options.getString('command', true).toLowerCase()
            const command = interaction.client.commands.get(commandName)

            if (!command) {
                return interaction.reply(`la commande \`${commandName}\` n'existe pas`)
            }
            delete require.cache[require.resolve(`./${command.data.name}`)]

            try {
                const newCommand = require(`./${command.data.name}.js`)
                interaction.client.commands.set(newCommand.data.name, newCommand);
                await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
            } catch (error) {
                console.error(error);
                await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
            }
        } else {
            await interaction.reply({ content:"You dont have permission to execute this command", ephemeral: true })
        }
        
    },


}