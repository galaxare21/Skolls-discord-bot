const sqlite3 = require('better-sqlite3') // importation de la library better-sqlite3
const db = sqlite3('./data/skoll.sqlite')// création de la base de donné


// création de la table qui stock l'argent des utilisateur
db.prepare(`CREATE TABLE IF NOT EXISTS silver(
    user VARCHAR(20) PRIMARY KEY NOT NULL,
    ammount INTEGER NOT NULL
    )`).run()
db.prepare(`CREATE TABLE IF NOT EXISTS ticket(
    id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT,
    ticket VARCHAR(20)    
    )`)

// table contenant la liste des admin pour sécurisé la base de donné

// splitdb.prepare(`CREATE TABLE IF NOT EXISTS admin(
//     id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//     user VARCHAR(20)
//     )`)


