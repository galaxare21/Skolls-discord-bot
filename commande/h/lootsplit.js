// importation des dependance
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const sqlite3 = require('better-sqlite3')
const path = require('path')

const db = sqlite3(path.join(__dirname, '../../data/coin.sqlite')) // connexion a la base de donné


module.exports = {
    data: new SlashCommandBuilder()
    .setName('lootsplit')
    .setDescription("permet de faire le partage ")
    .addStringOption( Option => 
        Option.setName('value')
            .setDescription("le total d'argent a partager")
            .setRequired(true))
    .addStringOption( Option => 
            Option.setName("groupe")
                .setDescription("le role qui reçcevra le partage")
                .addChoices(
                    { name: 'groupe 1', value: '1349288549811228692' },
                    { name: 'groupe 2', value: '1349288590475268116' },
                    { name: 'groupe 3', value: '1349288618447077418' },)
                .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.SendTTSMessages),
    async execute(Interaction){
        const value = Interaction.options.getString('value', true).toLowerCase() // récupération et passage en minuscule de la valeur entré dans la commande
        const role = Interaction.options.getString('group', true) // récupération du groupe pour qui la valeur vas être partager
        const membre_list = []; // création du tableau qui contient tout les utilisateur du groupe

        Interaction.guild.members.fetch().then((members) => {
            members.filter(mmbr => mmbr.roles.cache.has(role)).forEach(m => {
                console.log(m.user.tag, m.user.id);
                membre_list.push(m.user.id);
            });

    let split = parseInt(value) - (parseInt(value)/5) // calcul du pourcentage qui revient a la guilde
    split /= membre_list.length // calcul du montant qui revient au utilisateur
    console.log(parseInt(split))
    for(let i = 0; i < membre_list.length; i++ ){ // pour chaque utilisateur de la liste
        db.prepare(`INSERT OR IGNORE INTO silver (user, ammount) VALUES (?, ?)`).run(membre_list[i], 0) // si l'utilisateur n'est pas enregistré alors une ligne lui est crée
        const monney = db.prepare(`SELECT (ammount) FROM silver WHERE user=${membre_list[i]}`).get() // récupération du montant actuel de l'utilisateur
        
        const new_silver = parseInt(monney.ammount, 10) + parseInt(split, 10) // ici on calcul la nouvel valeur monétaire de l'utilisateur
        db.prepare(`UPDATE silver SET ammount = (${new_silver}) WHERE user=${membre_list[i]}`).run() // le montant lui est ajouté}
    }});
        

    }
}