import { useContext } from 'react'

import { deckContext } from '..'

import { CardList } from '../card-list'


export function MaybeTab() {

    const {deck, modifyDeck} = useContext(deckContext)

    modifyDeck

    const cards = deck.maybeBoard

    return (
        <div className='maybe-tab'>
        
            <CardList cards={cards} zone="maybeBoard"/>
        
        </div>
    )
}