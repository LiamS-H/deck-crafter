import { useContext, useState } from "react";

import { IscryfallResult } from "../../../types/card";
import { scryfallQuery } from "../../../services/scryfallService";

import { DeckListContext } from "..";

import styled from "styled-components";

const SearchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export default function CardSearch() {
    const [input, setInput] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const {decklist, updateDeckList} = useContext(DeckListContext)

    function beginQuery(event : React.FormEvent) {
        event.preventDefault()
        scryfallQuery(input).then(handleSuccess, handleError)
        setMessage((message)=>message="searching")
    }

    function handleSuccess(queryObj : IscryfallResult) {
        if (queryObj.object == "error") {
            if (queryObj.details != undefined) {
                setMessage(queryObj.details)
                return;
            } 
            setMessage("error")
        }
        
        setMessage("")

        const cards = queryObj.data
        const card_ids : string[] = []
        
        for (let cardObj of cards) {
            const id = cardObj.id
            card_ids.push(id)
            if (decklist.cards.hasOwnProperty(id)) continue;
            cardObj.price = cardObj.prices.usd
            decklist.cards[id] = cardObj
        }

        const newDecklist = {...decklist}
        newDecklist.zones.search.card_ids = card_ids

        // console.log("cards after search:", newDecklist.zones.search.card_ids.map(card_id=>newDecklist.cards[card_id].name))
        updateDeckList(newDecklist)
    }

    function handleError() {
        setMessage("error")
    }

    return (
    <SearchWrapper>
        <form onSubmit={beginQuery}>
            <input name="bootleg-scryfall-search" type="text" onChange={(e)=>setInput(e.currentTarget.value)}></input>
            <button type="submit" >Search</button>
        </form>
        <span>{message}</span>
    </SearchWrapper>
    )
}