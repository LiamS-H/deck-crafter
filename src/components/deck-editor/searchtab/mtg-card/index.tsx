import { useState, useContext } from 'react'
import { ICard } from '../../../../types/card'

import { deckContext } from '../..'

export default function MTGCard(props : {CardObj : ICard}) {
    const {deck, modifyDeck} = useContext(deckContext)

    const [selected, setState] = useState(false)

    function addToMaybe() {
        for (let card of deck.maybeBoard) {
            if (card.name == props.CardObj.name) return;
        }

        for (let card of deck.cards) {
            if (card.name == props.CardObj.name) return;
        }

        const newDeck = {...deck}

        newDeck.maybeBoard.push(props.CardObj)

        modifyDeck(newDeck)
    }


    return (
            <div className='mtg-card selected'
                onMouseLeave={() => setState(false)}
                onClick={addToMaybe}
            >
                <span className='card-name'>{props.CardObj.name}</span>
                <p className="oracle">{props.CardObj.oracle_text}</p>
            </div>
        )


}