import { IDeckDisp, EMPTY_DECKDISP, IDeckList, IDeckDispMode } from "../types/decklist";
import { ICard, cardTypes, cardColors } from "../types/card";

export function getTypes(cardObj : ICard) : {super_types : string[], card_types : string[], sub_types : string[]} {
    const types : {super_types : string[], card_types : string[], sub_types : string[]} = {super_types : [], card_types : [], sub_types : []}
        
    const type_line = (cardObj.type_line+'—').split('—');
    types.sub_types = type_line[1].split(" ")

    type_line[0].split(" ").map((type)=>{
        if (cardTypes.includes(type)) {types.card_types.push(type)}
        else {types.super_types.push(type)}
    })

    return types;
}

export function getDeckDisp(decklist : IDeckList) : IDeckDisp {
    const dispDeck : IDeckDisp = {
        title : decklist.title,
        display : {...decklist.display},
        cards : {...decklist.cards},
        groups : { },
        zones : {
            search : {
                id : "search",
                title : "Search Results",
                group_ids : [],
            },
            maybe : {
                id : "maybe",
                title : "Maybeboard",
                group_ids : [],
            },
            main : {
                id : "main",
                title : "Maindeck",
                group_ids : [],
            }
        },
        zone_ids : ["search","maybe","main"]
    }

    const mode = decklist.display;


    decklist.zone_ids.map(zone_id=>{
        const zone = decklist.zones[zone_id];
        zone.card_ids.sort((card_id1,card_id2)=>{
            return Number(decklist.cards[card_id1][mode.order]) - Number(decklist.cards[card_id2][mode.order])
        })

        zone.card_ids.map(card_id=>{
            const card = decklist.cards[card_id]

            let group_names : string[] = []; // the groups the card falls into
            switch (mode.grouping) {
                case "type":
                    const types = getTypes(card)
                    group_names = types.card_types
                    break
                case "tags":
                    for (let tag in decklist.tags) {
                        if (decklist.tags[tag].includes(card_id)) group_names.push(tag)
                    }
                    if (group_names.length === 0) group_names.push("untagged");
                    break
                case "color":
                    let color: keyof typeof cardColors;
                    for (color in cardColors) {
                        if (card.color_identity.includes(color)) group_names.push(cardColors[color]);
                    }
                    if (group_names.length === 0) group_names.push("Colorless");
                    break
                default:
                    group_names=[card[mode.grouping]]
            }

            group_names.forEach(group_name=>{
                const group_id = `${zone_id}/${group_name}`
                if (!dispDeck.zones[zone_id].group_ids.includes(group_id)) { //group not included
                    dispDeck.zones[zone_id].group_ids.push(group_id)
                    const disabled : string[] = []
                    if (zone_id === "search" && (decklist.zones.maybe.card_ids.includes(card_id) || decklist.zones.main.card_ids.includes(card_id))) {
                        disabled.push(card_id)
                    }

                    dispDeck.groups[group_id] = {
                        id : group_id,
                        title : group_name,
                        card_ids : [card_id],
                        disabled : disabled,
                    }
                    return;
                }
                if (zone_id === "search" && (decklist.zones.maybe.card_ids.includes(card_id) || decklist.zones.main.card_ids.includes(card_id))) {
                    dispDeck.groups[group_id].disabled.push(card_id)
                }
                if (dispDeck.groups[group_id].card_ids.includes(card_id)) return; //card allready included
                dispDeck.groups[group_id].card_ids.push(card_id) //add card
            })

            dispDeck.zones[zone_id].group_ids.sort((gID1, gID2)=> gID1 < gID2 ? -1 : 1)
            

        })
    })
    return dispDeck
}