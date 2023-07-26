import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import * as fs from "fs";
import crypto from "crypto";
import { IDB, IUser } from './databasetypes';
import { IDeckList } from '../../src/types/decklist';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.use(bodyParser.json(), function(req: Request, res: Response, next : NextFunction) {
    req;
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req: Request, res: Response) => {
    console.log(req.body)
    res.send('Express + TypeScript Server');
});

app.get('/:user/decks', (req: Request, res: Response) => {
    // see if user in database and return decks, if not add to database
    const user_id = req.params.user

    fs.readFile("./server/database.json", (error, data)=>{
        if (error) {
            console.log(error)
            res.json({error : "error fetching database"})
            throw Error;
        }

        const db : IDB = JSON.parse(data.toString())
        
        if (!db.hasOwnProperty(user_id)) {
            const newUser : IUser = {
                id : user_id,
                decks : {},
            }
            db[user_id] = newUser
            fs.writeFile("./server/database.json", JSON.stringify(db), error=>{
                if (!error) return;
                throw Error(`database failed write:\n${error}`);
            })
        }

        const user : IUser = db[user_id]

        res.json(user)
    })
    
});

app.post('/:user/decks', (req: Request, res: Response) => {
    //create new 
    const user_id = req.params.user

    fs.readFile("./server/database.json", (error, data)=>{
        if (error) {
            res.json({error : `error fetching database`})
            throw Error(`error fetching database:${error}`);
        }

        const db : IDB = JSON.parse(data.toString())
        
        if (!db.hasOwnProperty(user_id)) {
            res.json({error : "user not found"})
            console.log(`user:${user_id} not found`);
            return;
        }

        

        const new_deck : IDeckList = req.body


        const deck_id = crypto.randomUUID()

        db[user_id].decks[deck_id] = new_deck

        fs.writeFile("./server/database.json", JSON.stringify(db), error=>{
            if (!error) return;
            throw Error(`database failed write:\n${error}`);
        })

        res.json({deck_id : deck_id})
    })
});

app.get('/:user/decks/:deck', (req: Request, res: Response) => {
    const user_id = req.params.user

    const deck_id = req.params.deck

    fs.readFile("./server/database.json", (error, data)=>{
        if (error) {
            res.json({error : `error fetching database`})
            throw Error(`error fetching database:${error}`);
        }

        const db : IDB = JSON.parse(data.toString())
        
        if (!db.hasOwnProperty(user_id)) {
            res.json({error : "user not found"})
            console.log(`user:${user_id} not found`);
            return;
        }

        const user : IUser = db[user_id]
        const decks = user.decks

        if (!decks.hasOwnProperty(deck_id)) {
            res.json({error : "deck not found"})
            console.log(`user:${user_id} does not have deck:${deck_id}`);
            return;
        }

        const deck : IDeckList = decks[deck_id]

        res.json(deck)

    })
});

app.post('/:user/decks/:deck', (req: Request, res: Response) => {
    const user_id = req.params.user

    const deck_id = req.params.deck

    fs.readFile("./server/database.json", (error, data)=>{
        if (error) {
            res.json({error : `error fetching database`})
            throw Error(`error fetching database:${error}`);
        }

        const db : IDB = JSON.parse(data.toString())
        
        if (!db.hasOwnProperty(user_id)) {
            res.json({error : "user not found"})
            console.log(`user:${user_id} not found`);
            return;
        }

        const user : IUser = db[user_id]
        const decks = user.decks

        if (!decks.hasOwnProperty(deck_id)) {
            res.json({error : "deck not found"})
            console.log(`user:${user_id} does not have deck:${deck_id}`);
            return;
        }

        const new_deck : IDeckList = req.body

        delete db[user_id].decks[deck_id]

        db[user_id].decks[deck_id] = new_deck

        fs.writeFile("./server/database.json", JSON.stringify(db), error=>{
            if (!error) return;
            throw Error(`database failed write:\n${error}`);
        })

        res.json({status : "succes!"})
    })
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});