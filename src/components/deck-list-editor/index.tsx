import { createContext, useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, DropResult, DragStart } from "@hello-pangea/dnd"
import { styled } from "styled-components";

import { IDeckList, EMPTY_DECKLIST } from "../../types/decklist"
import { getDeckDisp } from "../../reducers/deckdisp";

import axios from "axios"

import CardSearch from "./card-search";
import ModeSelector from "./ModeSelector";
import DeckTitle from "./DeckTitle";

import SearchZone from "./zones/search";
import MaybeZone from "./zones/maybe";
import MainZone from "./zones/main";

const EditorHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const DeckWindow = styled.div`
    width: 100%;
    height: 90%;
    background-color: ${props=>props.theme.background};
    
    
    display: flex;
    flex-direction: row;
`

interface IDeckListContext {
    decklist : IDeckList,
    updateDeckList : (decklist : IDeckList)=>void
}

export const DeckListContext = createContext<IDeckListContext>({
    decklist : EMPTY_DECKLIST,
    updateDeckList : (decklist : IDeckList)=>{decklist}
})

export default function DeckListEditor(props : {deck_id : string}) {
    const [decklist, setDeckList] = useState(EMPTY_DECKLIST)

    const {user} = useUser()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user) return;
        axios
        .get(`http://localhost:8000/${user?.id}/decks/${props.deck_id}`)
        .then((res)=>{
            if (res.data.hasOwnProperty("error")) navigate("/error");
            const loaded_deck : IDeckList = res.data
            setDeckList(loaded_deck)
        })
        .catch((error) => {console.log(error)})
    },[user])

    async function updateDeckList(new_decklist : IDeckList) {
        setDeckList(new_decklist)
        axios
        .post(`http://localhost:8000/${user?.id}/decks/${props.deck_id}`, new_decklist)
        .then(()=>{})
        .catch((error) => {console.log(error)})
    }

    const [dragStart, setDragStart] = useState<DragStart | null>()

    const deckdisp = getDeckDisp(decklist)

    function onDragStart(start : DragStart) {
        setDragStart(start)
        return;
    }

    function onDragEnd(result : DropResult) {
        setDragStart(null)

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
            updateDeckList(newDecklist)

            return;
        }

        if (src_zone_id == "search") {
            if (dest_group_id === undefined && src_group_id === "untagged") {"cannot add untagged";return;}
            if (decklist.zones.maybe.card_ids.includes(card_id)) {console.log("allready in maybe");return;}
            if (decklist.zones.main.card_ids.includes(card_id)) {console.log("allready in  main");return;}
            
            
            const destination_zone = {...decklist.zones[dest_zone_id]}
            destination_zone.card_ids.push(card_id)

            const newDecklist : IDeckList = {
                ...decklist,
                zones: {
                    ...decklist.zones,
                    [destination_zone.id] : {...destination_zone},
                }
            }

            if (decklist.display.grouping === "tags" && dest_group_id != undefined) {
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
    
            updateDeckList(newDecklist)

            return;
        }

        if (decklist.display.grouping === "tags" ) {
            const newDecklist : IDeckList = {
                ...decklist,
            }

            switch (dest_group_id) {
                case undefined:
                    if (src_zone_id !== dest_zone_id) break;
                    newDecklist.tags[src_group_id] = newDecklist.tags[src_group_id].filter(card=>card!==card_id)
                    break
                case "new-tag":
                    let tag_number = 1;
                    while (decklist.tags.hasOwnProperty(`new tag (${tag_number})`)) {
                        tag_number ++;
                    }
                    newDecklist.tags[`new tag (${tag_number})`] = [card_id]
                    break
                default:
                    newDecklist.tags[dest_group_id].push(card_id)

            }
   
    
            updateDeckList(newDecklist)

        }

        if (src_zone_id === dest_zone_id) {return;}

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

        updateDeckList(newDecklist)
        
    }

    return (
    <>
        <DeckListContext.Provider value={{decklist, updateDeckList}}>
            <EditorHeader>
                <DeckTitle />
                <ModeSelector />
                <CardSearch />
            </EditorHeader>
        
            <DragDropContext
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
            >
                <DeckWindow>
                    <MainZone deckDisp={deckdisp} drag={dragStart}/>
                    <MaybeZone deckDisp={deckdisp} drag={dragStart}/>
                    <SearchZone deckDisp={deckdisp} drag={dragStart} />
                </DeckWindow>
            </DragDropContext>
        </DeckListContext.Provider>
    </>
    )
}