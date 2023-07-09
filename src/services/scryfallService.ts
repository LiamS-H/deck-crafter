import { MTGCard, scryfallResult } from "../types/card";

export async function scryfallQuery(query : string) {
    console.log(`https://api.scryfall.com/cards/search?q=${query}`)
    try {
        const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}`);
        const promise = await response.json();
        return promise;
    } catch(error) {
        return [];
    }

}