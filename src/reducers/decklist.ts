import { IDeckList } from "../types/decklist";

export function cleanDeckList(decklist : IDeckList) : IDeckList {
    const new_decklist : IDeckList = {
        ...decklist,
        zones: {
            main : {...decklist.zones.main},
            maybe: { ...decklist.zones.maybe},
            search : {
                id : "search",
                card_ids : [],
            },
        },
        cards : {}
    }

    const cards = [...decklist.zones.main.card_ids, ...decklist.zones.maybe.card_ids]

    cards.forEach((card_id)=>new_decklist.cards[card_id]=decklist.cards[card_id])

    return new_decklist
}