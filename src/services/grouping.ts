import { ICard } from "../types/card";
import { IDeck } from "../types/deck";
import { ITagMapping, ITag } from "../types/tags";

import { cardTypes } from "../types/card";

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
    

export function zoneByTypes(zone : ICard[]) : {name : string, cards : ICard[]}[] {
    const grouped : {name : string, cards : ICard[]}[] = [];
    
    for (let type of cardTypes) {
        const group : {name : string, cards : ICard[]} = {name : type, cards : []}
        
        for (let card of zone) {
            let type_line = card.type_line;
            if (card.type_line === undefined) type_line = card.card_faces[0].type_line
            if (type_line.includes(type)) {
                group.cards.push(card)
            }
        }

        if (group.cards.length == 0) continue;

        grouped.push(group)
    }

    
    
    return grouped;
}