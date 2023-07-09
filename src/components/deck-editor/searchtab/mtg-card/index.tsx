import { useState, useContext } from 'react'
import { IMTGCard } from '../../../../types/card'

import { deckContext } from '../..'

export default function MTGCard(props : {CardObj : IMTGCard}) {
    const {deck, modifyDeck} = useContext(deckContext)

    const [selected, setState] = useState(false)

    function addToMaybe() {
        const newDeck = {...deck}

        newDeck.maybeBoard.push(props.CardObj)

        modifyDeck(newDeck)
    }


    return (
            <div className='mtg-card selected'
                onMouseLeave={() => setState(false)}
                onClick={addToMaybe}
            >
                <p className="oracle">{props.CardObj.name}{props.CardObj.oracle_text}</p>
            </div>
        )


}