import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import {
    useUser
} from "@clerk/clerk-react";

import styled from "styled-components"
import { DeckTile } from "./deck-tile"

import { EMPTY_DECKLIST, IDeckList } from "../../types/decklist"
import { getDecksQuery, putDecksQuery } from "../../services/backendService";

const DecksListWrapper = styled.div`
    width : 50%;
    background-color : ${(props)=>props.theme.container};
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const DecksListBG = styled.div`
    width : 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const NewDeck = styled.button`
    background-color : ${(props)=>props.theme.group};
    cursor: pointer;
    color : ${(props)=>props.theme.text};
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
`

export function DecksList() {
    const {user} = useUser();
    const [decks, setDecks] = useState<{[key:string] : IDeckList}>({})
    const navigate = useNavigate();

    useEffect(()=>{
        if (!user) return;
        getDecksQuery(user.id)
        .then((res)=>{
            const decks : {[key:string]:IDeckList} = res.data
            setDecks(decks)
        })
        .catch((error) => {console.log(error)})
    }, [])

    const deck_tiles = [];
    
    for (let deck_id in decks) {
        deck_tiles.push(<DeckTile deck_id={deck_id} deck={decks[deck_id]} key={deck_id}/>)
    }

    deck_tiles.push(
        <NewDeck key="new-deck"
            onClick={()=>{
                if (!user) return;
                putDecksQuery(user.id, EMPTY_DECKLIST)
                .then((res)=>{
                    const deck_id : string = res.data.deck_id
                    navigate(`/deck/${deck_id}`)
                })
                .catch((error) => {console.log(error)})
                
            }}
        >
            New Deck +
        </NewDeck>
    )

    return (
    <DecksListBG>
        <DecksListWrapper>
        {deck_tiles}  
        </DecksListWrapper>
    </DecksListBG>
    )
}