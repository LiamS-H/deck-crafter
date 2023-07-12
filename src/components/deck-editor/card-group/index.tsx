import './card-group.css'

import { useState } from 'react'
import { ICard } from '../../../types/card'
import { CardTile } from './card-tile'

export default function CardGroup(props : {group : {name: string; cards: ICard[];}}) {
    const [open, setOpen] = useState(true)

    function toggle() {
        setOpen((open)=>!open)
    }

    if (!open) return (
        <div className='card-group'>
            <div className="group-title" onClick={toggle}>
                <span>{props.group.name} ▶</span>
            </div>
        </div>
    )

    const dispList = props.group.cards.map(card => <CardTile cardObj={card} zone={"cards"} key={card.id}/>)

    return (
        <div className='card-group'>
            <div className="group-title" onClick={toggle}>
                <span>{props.group.name} ▼</span>
            </div>
            <div className="card-list">{dispList}</div>
        </div>
    )

}