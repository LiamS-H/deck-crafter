import { useState, useContext, createContext } from 'react'

import './deckEditor.css'

import { IDeck, EMPTYDECK } from '../../types/deck'

import SearchTab from "./searchtab"
import { MaybeTab } from './maybetab'
import { DeckTab } from './decktab'



interface IDeckContext {
    deck : IDeck
    modifyDeck: (deck : IDeck) => void
}

export const deckContext = createContext<IDeckContext>({
    deck : EMPTYDECK,
    modifyDeck: (deck : IDeck) => {},
})

export default function DeckEditor() {
    const [deck, modifyDeck] = useState<IDeck>(EMPTYDECK)

    return (
        <deckContext.Provider value= {{deck, modifyDeck}}>
            <div className='deck-editor'>
                <DeckTab />
                <MaybeTab />
                <SearchTab />
            </div>
        </deckContext.Provider>
    )
}