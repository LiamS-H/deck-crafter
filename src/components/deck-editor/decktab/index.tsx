import { useContext } from 'react'

import { deckContext } from '..'

import { CardList } from '../card-list'


export function DeckTab() {

    const {deck, modifyDeck} = useContext(deckContext)

    modifyDeck

    const cards = deck.mainBoard

    return (
        <div className='deck-tab'>
        
            <CardList cards={cards} zone="cards"/>
        
        </div>
    )
}