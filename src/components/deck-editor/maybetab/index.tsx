import { useContext } from 'react'

import { deckContext } from '..'

import { CardList } from '../card-list'


export function MaybeTab() {

    const {deck, modifyDeck} = useContext(deckContext)

    modifyDeck

    const cards = deck.maybeBoard

    return (
        <div className='search-tab'>
        
            <CardList cards={cards}/>
        
        </div>
    )
}