// const { REST, Routes } = require('discord.js'); // importation de l'api rest
// const { clientId, guildId, token } = require('./config.json');
// const fs = require('node:fs')
// const path = require('node:path');

// // création des liste qui vont contenire les commande pour le déploiement
// const commands = [] // commande public
// const guild_commands = [] // commande privé
// const commands_logger = [] 

// const foldersPath = path.join(__dirname, 'commande') // ouverture du dossier des commande
// const commandFolders = fs.readdirSync(foldersPath) // lecture du dossier des commande

// for (const folder of commandFolders) {
// 	const commandsPath = path.join(foldersPath, folder) // ouverture du dossier
// 	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')) // lecture et filtrage des commande pour ne récupérer que les fichier en .js
// 	for (const file of commandFiles) { 
// 		const filePath = path.join(commandsPath, file); // chemin du fichier de commande
// 		const command = require(filePath); // importation du fichier dans la boucle
// 		if ('data' in command && 'execute' in command) {
// 			commands.push(command.data.toJSON()) // la commande est mise dans le tableau des commande a envoyer a discord
// 			commands_logger.push(command.data.name) // le nom de la commande est enregistré afin d'assurer un retour correct du nombre de comande qui on été envoyer
// 		} else {
// 			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`); // si la commande est imcomplète ce message apparêtera en console
// 		}
// 	}
// }

// const rest = new REST().setToken(token); // crée une nouvelle instance de l'api rest afin d'envoyer les commande a discord
// console.log("gr")
// console.log(commands_logger)
// try {
// async () => {
// 	console.log("gr")
// 	try {
		
// 		console.log(commands_logger) // affichage de la liste des commande qui seron envoyer a discord
// 		console.log('\x1b[33m%s\x1b[0m', `Started refreshing ${commands.length} application (/) commands.`); // premier retour disant que la requête sera envoyer a discord

//         const data = await rest.put(
//             Routes.applicationCommands(clientId), // envois des commande a discord
//             { body: commands },
//         )
// 		console.log('\x1b[32m%s\x1b[0m', `Successfully reloaded ${data.length} application (/) commands.`); // retour final disant que les commande on correctement été envoyer a discord
// 	} catch (error) {
// 		console.log(error); // en cas d'erreur retourner l'erreur en console
// 	}
// };
// console.log("témoin")
// } catch(err){
// 	console.log(err)
// }

const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commande');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
async function deploy() {
	
{
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
			
		);
		

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
}};

deploy()
