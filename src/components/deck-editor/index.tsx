import { useState, useContext, createContext } from 'react'

import './deckEditor.css'

import { IDeck, EMPTYDECK } from '../../types/deck'

import SearchTab from "./searchtab"
import { MaybeTab } from './maybetab'

interface IdeckContext {
    deck : IDeck
    modifyDeck: (deck : IDeck) => void
}

export const deckContext = createContext<IdeckContext>({
    deck : EMPTYDECK,
    modifyDeck: (deck : IDeck) => {},
})

export default function DeckEditor() {
    const [deck, modifyDeck] = useState<IDeck>(EMPTYDECK)

    return (
        <deckContext.Provider value= {{deck, modifyDeck}}>
            <div className='deck-editor'>
                <div className='deck'></div>
                <MaybeTab />
                <SearchTab />
            </div>
        </deckContext.Provider>
    )
}