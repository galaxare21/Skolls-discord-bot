
const { Events } = require('discord.js')
const { clientId, everyoneId } = require('../config.json')

module.exports = {
    name: Events.InteractionCreate,
    async execute(Interaction, client) {
        if (Interaction.isChatInputCommand()){
            const command = Interaction.client.commands.get(Interaction.commandName)

            if (!command) {
                console.error(`No command matching ${Interaction.commandName} was found.`)
                return
            }

            try {
                await command.execute(Interaction, client)
            } catch (error) {
                console.error(error)
                if (Interaction.replied || Interaction.deferred) {
                    await Interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true})
                } else {
                    await Interaction.reply({ content: 'There was a error while executing this command!', ephemeral: true})
                }
            }
        } else if (Interaction.isButton()){
            try {
                const id = Interaction.customId
                const { buttonFunc } = require(`../button/${id}.js`) 
                buttonFunc(Interaction)
            } catch (err) {
                console.error(err)
            }
            
            

        } else if (Interaction.isStringSelectMenu()){


        }
}}