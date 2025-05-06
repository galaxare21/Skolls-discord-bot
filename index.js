
const sfs = require("node:fs")
const fs = require("fs")
const path = require("node:path")
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js') // importation des element de la library discord.js
const { token } = require("./config.json") // importation du token dans le fichier de configuration


const client = new Client({intents: Object.values(GatewayIntentBits),}) // assemblage du bot avec ces intents


client.commands = new Collection() // création de la collection qui stock les event et les commande


const foldersPath = path.join(__dirname, 'commande') // récupération du dossier contenant les commande
const commandFolders = fs.readdirSync(foldersPath) // récupération des dossier présent dans le dossier commande

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder) //déplacement dans le répertoire des commande
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')) // trie uniquement les fichier qui finissent avec .js 
	// la boucle qui récupère la liste des commande dans le dossier 
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file) // ouvre le fichier de la commande
		const command = require(filePath) // importation du fichier de commande dans la boucle

		/* vérification que la commande contient bien un data et un execute
		le data : contient les donné tel que le nom de la commande sa description et ses paramètre
		le execute : contient le code executé lors de l'appel de la commande*/
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command) // enregistrement des commande dans la collection
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`) // si l'enregistrement echoue un message est envoyé
		}
	}
}



const eventsPath = path.join(__dirname, 'event') // récupération du chemin du dossier contenant les event
const eventFile = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')) // récupération des event sous forme de fichier javascript
// boucle de récupération des event
for (const file of eventFile) {
    const filePath = path.join(eventsPath, file) // ouverture du dossier des commande
    const event = require(filePath) // importation des commande dans la boucle
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args)) // si l'event doit être éxécuté une seul fois il est executé
    } else {
        client.on(event.name, (...args) => event.execute(...args)) // si once = false alors le code est démaré et l'event ce lancera a chaque fois que cela sera necessaire
    }


}

client.login(token) // démarage du bot