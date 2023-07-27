import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import crypto from "crypto";
import { IDeckList } from '../src/types/decklist';

import mysql from 'mysql2'

dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: 'deckcrafter',
})

const app: Express = express();
const port = process.env.PORT;

function toSQLJSON(deck : IDeckList) : string {
    const string1 = JSON.stringify(deck)
    const string2 = string1.replace(/'/g,"''")
    const string3 = string2.replace(/\\/g,"\\\\")
    return string3;
}

app.use(bodyParser.json(), function(req: Request, res: Response, next : NextFunction) {
    req;
    // console.log(req.);
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req: Request, res: Response) => {
    console.log(req.body)
    res.send('Express + TypeScript Server');
});

app.get('/:user/decks', async (req: Request, res: Response) => {
    // see if user in database and return decks, if not add to database
    const user_id = req.params.user

    const connection = pool.promise()

    const [user_data] = await connection.execute(`SELECT * FROM USERS WHERE id=?`, [user_id])
    const users = <mysql.RowDataPacket[]> user_data

    if (users.length === 0) {
        connection.query(`INSERT INTO Users (id) VALUES (?)`,[user_id]);
        console.log("adding to db")
    }

    const [results] = await connection.execute(`SELECT * FROM Decks WHERE owner_id=?`, [user_id])
    const rows = <mysql.RowDataPacket[]> results
    
    const decks : {[key:string] : IDeckList} = {}

    rows.forEach(row =>{
        decks[row.id] = row.deckObj
    })
    
    res.json(decks)
    
});

app.post('/:user/decks', async (req: Request, res: Response) => {
    const user_id = req.params.user

    const connection = pool.promise()

    const [user_data] = await connection.execute(`SELECT * FROM USERS WHERE id=?`, [user_id])
    const users = <mysql.RowDataPacket[]> user_data

    if (users.length === 0) {
        res.json({error : "user not found"})
        return;
    }

    const new_deck : IDeckList = req.body

    const deck_id = crypto.randomUUID()

    connection.execute(
        `INSERT INTO decks (id, owner_id, deckObj) VALUES (?, ?, ?)`,
        [deck_id, user_id, toSQLJSON(new_deck)]
    )
    
    res.json({deck_id : deck_id})
});

app.get('/:user/decks/:deck', async (req: Request, res: Response) => {
    const user_id = req.params.user

    const deck_id = req.params.deck

    const connection = pool.promise()

    const [user_data] = await connection.execute(`SELECT * FROM USERS WHERE id=?`, [user_id])
    const users = <mysql.RowDataPacket[]> user_data

    if (users.length === 0) {
        res.json({error : "user not found"})
        return;
    }

    const [deck_data] = await connection.execute(`SELECT deckObj FROM Decks WHERE id=?`,[deck_id])
    const decks = <mysql.RowDataPacket[]> deck_data

    if (decks.length == 0) {
        res.json({error : "deck not found"})
        return;
    }

    const deck : IDeckList = decks[0].deckObj

    res.json(deck)

});

app.post('/:user/decks/:deck', async (req: Request, res: Response) => {
    const user_id = req.params.user

    const deck_id = req.params.deck

    const connection = pool.promise()

    const [user_data] = await connection.execute(`SELECT * FROM USERS WHERE id=?`, [user_id])
    const users = <mysql.RowDataPacket[]> user_data

    if (users.length === 0) {
        res.json({error : "user not found"})
        return;
    }

    const new_deck : IDeckList = req.body

    connection.execute(
        `UPDATE decks SET deckObj=? WHERE id=?`,
        [toSQLJSON(new_deck), deck_id]
    )
    
    res.json({deck_id : deck_id})
});

app.delete('/:user/decks/:deck', async (req: Request, res: Response) => {
    const user_id = req.params.user

    const deck_id = req.params.deck

    const connection = pool.promise()

    const [user_data] = await connection.execute(`SELECT * FROM USERS WHERE id=?`, [user_id])
    const users = <mysql.RowDataPacket[]> user_data

    if (users.length === 0) {
        res.json({error : "user not found"})
        return;
    }

    connection.execute(
        `DELETE FROM Decks WHERE owner_id=? AND id=?`,
        [user_id, deck_id]
    )
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

