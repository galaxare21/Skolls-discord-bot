// importation des dépendence necessaire
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const sqlite3 = require('better-sqlite3')
const path = require('path')


const db = sqlite3(path.join(__dirname, '../../data/coin.sqlite')) // connexion a la base de donné

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bal')
    .setDescription("permet de voir combien d'argent est possédé par un utilisateur")
    .addUserOption( Option => 
        Option.setName('user')
            .setDescription("l'utilisateur dont vous voulez voir les sous")
            .setRequired(true))
    
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(Interaction){
        const user = Interaction.options.getUser('user', true) // récupération des paramètre de la commande
            
        const monney = db.prepare(`SELECT (ammount) FROM silver WHERE user=${user.id}`).get() // récupération de la quantité d'argent que possède l'utilisateur
        if(monney != undefined){ // si la cellule de la bdd n'est pas vide
            await Interaction.reply({ content: `le solde de ${user.displayName} est de : ${monney.ammount} 💰 `, ephemeral: true}) // retourner la quantité d'argent possedé par l'utilisateur
        } else {
            await Interaction.reply({content:`cet utilisateur n'a jammais possedé de solde`, ephemeral: true}) // sinon le bot répond que l'utilisateur n'a jammais possedé de solde dans la guilde
        }
        
    }
}