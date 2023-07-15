import { createContext, useState } from "react"
import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import { styled } from "styled-components";

import { IDeckList, EMPTY_DECKLIST } from "../../types/decklist"
import { getDeckDisp } from "../../reducers/deckdisp";

import CardSearch from "./card-search"
import Zone from "./zone"

const DeckWindow = styled.div`
    width: 100%;
    
    display: flex;
    flex-direction: row;
`

interface IDeckListContext {
    decklist : IDeckList,
    setDecklist : (decklist : IDeckList)=>void
}

export const DeckListContext = createContext<IDeckListContext>({
    decklist : EMPTY_DECKLIST,
    setDecklist : (decklist : IDeckList)=>{decklist}
})

export default function DeckListEditor() {
    const [decklist, setDecklist] = useState(EMPTY_DECKLIST)

    const deckdisp = getDeckDisp(decklist, decklist.display)


    const zones = deckdisp.zone_ids.map(zone_id=>{
        const zone = deckdisp.zones[zone_id]
        const groups = zone.group_ids.map(group_id=>deckdisp.groups[group_id])
        
        return <Zone display={decklist.display} key={zone.id} zone={zone} groups={groups} cards={deckdisp.cards} />
    })

    function onDragEnd(result : DropResult) {
        const {destination, source, draggableId} = result

        if (!destination) {console.log("no destination"); return;}

        if (destination.droppableId === source.droppableId) {console.log("same destination"); return;}

        const [dest_zone_id, dest_group_id ] = destination.droppableId.split("/")

        const [src_zone_id, src_group_id, card_id] = draggableId.split("/")

        if (dest_zone_id == "search") {
            const source_zone = {...decklist.zones[src_zone_id]}
            source_zone.card_ids = source_zone.card_ids.filter(filter_id=>card_id!=filter_id)
            
            const newDecklist : IDeckList = {
                ...decklist,
                zones: {
                    ...decklist.zones,
                    [source_zone.id] : {...source_zone},
                }
            }
            setDecklist(newDecklist)

            return;
        }

        if (src_zone_id == "search") {
            if (decklist.zones.maybe.card_ids.includes(card_id)) {console.log("allready in maybe");return;}
            if (decklist.zones.main.card_ids.includes(card_id)) {console.log("allready in  main");return;}
            if (dest_group_id === undefined) {console.log("untagged cards may not be added");return;}
            
            const destination_zone = {...decklist.zones[dest_zone_id]}
            destination_zone.card_ids.push(card_id)

            const newDecklist : IDeckList = {
                ...decklist,
                zones: {
                    ...decklist.zones,
                    [destination_zone.id] : {...destination_zone},
                }
            }

            if (decklist.display.grouping === "tags") {
                if (dest_group_id === "new-tag") {
                    let tag_number = 1;
                    while (decklist.tags.hasOwnProperty(`new tag (${tag_number})`)) {
                        tag_number ++;
                    }
                    newDecklist.tags[`new tag (${tag_number})`] = [card_id]
                } else {
                    newDecklist.tags[dest_group_id].push(card_id)
                }
                
            }
    
            setDecklist(newDecklist)

            return;
        }

        const source_zone = {...decklist.zones[src_zone_id]}
        const destination_zone = {...decklist.zones[dest_zone_id]}

        source_zone.card_ids = source_zone.card_ids.filter(filter_id=>card_id!=filter_id)
        destination_zone.card_ids.push(card_id)

        const newDecklist : IDeckList = {
            ...decklist,
            zones: {
                ...decklist.zones,
                [source_zone.id] : {...source_zone},
                [destination_zone.id] : {...destination_zone},
            }
        }

        setDecklist(newDecklist)
        
    }

    return (
    <>
        <DeckListContext.Provider value={{decklist, setDecklist}}>
            <CardSearch />
        </DeckListContext.Provider>
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <DeckWindow>{zones}</DeckWindow>
        </DragDropContext>
        
    </>
    )
}