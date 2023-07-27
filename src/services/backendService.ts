import { IDeckList } from "../types/decklist";
import axios from "axios";

export async function getDeckQuery(user_id : string, deck_id : string) {
    return axios.get(`http://localhost:8000/${user_id}/decks/${deck_id}`)
}

export async function putDeckQuery(user_id : string, deck_id : string, decklist : IDeckList) {
    return axios.post(`http://localhost:8000/${user_id}/decks/${deck_id}`, decklist)
}

export async function getDecksQuery(user_id : string) {
    return axios.get(`http://localhost:8000/${user_id}/decks`)
}

export async function putDecksQuery(user_id: string, decklist : IDeckList) {
    return axios.post(`http://localhost:8000/${user_id}/decks`, decklist)
}
