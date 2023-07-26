import { IDeckList } from "../../src/types/decklist"


export interface IUser {
    id : string
    decks : {
        [key:string] : IDeckList
    };
}

export interface IDB {
    [key:string] : IUser
}