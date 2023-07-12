import { useState, useContext, createContext } from 'react'

import './deckEditor.css'

import { IDeck, EMPTYDECK } from '../../types/deck'

import SearchTab from "./searchtab"
import { MaybeTab } from './maybetab'
import { DeckTab } from './decktab'
import CardGroupGrid from './card-group-grid'
import CardGroup from './card-group'

import { ICard } from '../../types/card'
import { zoneByTypes } from '../../services/grouping'

interface IDeckContext {
    deck : IDeck
    toMaybe: (card : ICard) => void
    toMain: (card : ICard) => void
}

export const deckContext = createContext<IDeckContext>({
    deck : EMPTYDECK,
    toMaybe: (card : ICard) => {},
    toMain: (card : ICard) => {},
})

export default function DeckEditor() {
    const [deck, setDeck] = useState<IDeck>(EMPTYDECK)

    function removeFromDeck(deckObj : IDeck, cardObj : ICard) : void {
        deckObj.mainBoard = deckObj.mainBoard.filter((card)=>card.name!=cardObj.name)
        deckObj.maybeBoard = deckObj.maybeBoard.filter((card)=>card.name!=cardObj.name)
    }

    function tagsContains(cardObj : ICard) : boolean {
        for (var prop in deck.tags) {
            for (let card of deck.tags[prop]) {
                if (card.name == cardObj.name) return true
            }
        }
        return false
    }

    function toMaybe(cardObj : ICard) {
        const newDeck = {...deck}
        removeFromDeck(newDeck, cardObj)

        if (!tagsContains(cardObj)) {
            newDeck.tags.untagged.push(cardObj)
        }

        newDeck.maybeBoard.push(cardObj)

        setDeck(newDeck)
        console.log(newDeck)
    }

    function toMain(cardObj : ICard) { 
        const newDeck = {...deck}
        removeFromDeck(newDeck, cardObj)

        if (!tagsContains(cardObj)) {
            newDeck.tags.untagged.push(cardObj)
        }

        newDeck.mainBoard.push(cardObj)

        setDeck(newDeck)
    }

    const groups = zoneByTypes(deck.mainBoard)

    // const dispDeck = groups.map((group)=><CardGroup group={group} />)

    return (
        <deckContext.Provider value= {{deck, toMaybe, toMain}}>
            <div className='deck-editor'>
                {/* <DeckTab /> */}
                <div className="main-tab"><CardGroupGrid groups={groups} /></div>
                {/* <MaybeTab />
                <SearchTab /> */}
            </div>
        </deckContext.Provider>
    )
    return (
        <deckContext.Provider value= {{deck, toMaybe, toMain}}>
            
        </deckContext.Provider>
    )
}