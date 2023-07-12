import { useContext } from 'react'
import { ICard } from '../../../../types/card'

import { deckContext } from '../..'

export default function MTGCard(props : {CardObj : ICard}) {
    const {toMain} = useContext(deckContext)

    return (
            <div className='mtg-card'
                onClick={()=>toMain(props.CardObj)}
            >
                <span className='card-name'>{props.CardObj.name}</span>
                <p className="oracle">{props.CardObj.oracle_text}</p>
            </div>
        )


}