/* importation des dépendence necessaire */
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const sqlite3 = require('better-sqlite3')
const path = require('path')
const db = sqlite3(path.join(__dirname, '../../data/coin.sqlite')) // connexion a la base de donné

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bal_remove')
    .setDescription("permet a un admin de retirer de l'argent a un joueur")
    .addUserOption( Option => 
        Option.setName('user')
            .setDescription("l'utilisateur a qui vous voulez retirer de l'argent")
            .setRequired(true)
    )
    .addStringOption( Option => 
        Option.setName('ammount')
            .setDescription("le montant que vous voulez prendre a l'utilisateur")
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.SendTTSMessages),
    async execute(Interaction){
        const user = Interaction.options.getUser('user', true) // récupération des paramètre
        const ammount = Interaction.options.getString('ammount', true).toLowerCase()
        if (ammount > 0){

        db.prepare(`INSERT OR IGNORE INTO silver (user, ammount) VALUES (?, ?)`).run(user.id, 0) // si l'utilisateur n'est pas enregistré alors une ligne lui est crée
        const monney = db.prepare(`SELECT (ammount) FROM silver WHERE user=${user.id}`).get() // récupération du montant actuel de l'utilisateur

        const new_silver = parseInt(monney.ammount, 10) - parseInt(ammount, 10) // ici on calcul la nouvel valeur monétaire de l'utilisateur
        db.prepare(`UPDATE silver SET ammount = (${new_silver}) WHERE user=${user.id}`).run() // le montant lui est ajouté
        
        
        await Interaction.reply( { content: `ajustement correctement éffectué`, ephemeral: true} ) // une réponse est renvoyer pour déclarer que tout s'est bien passé
        } else {
            await Interaction.reply({content: "vous devez entrer un nombre positif", ephemeral: true})
        }
    }
}