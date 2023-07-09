import { memo } from "react"

import { ICard } from "../../../../types/card"

import leftArrow from '../../../../assets/Left-Arrow.png'
import rightArrow from '../../../../assets/right-Arrow.png'
import './card-tile.css'

import { cardTypes } from "../../../../types/card"

export const CardTile = memo((props : {cardObj : ICard})=>{
    console.log("rendering:",props.cardObj.name)

    const card = props.cardObj.card_faces? props.cardObj.card_faces[0] : props.cardObj
    const name = props.cardObj.name

    const type_line = (card.type_line.toLowerCase()+'—').split('—');
    const sub_types = type_line[1].split(" ")
    
    const super_types : string[] = []
    const card_types : string[] = []

    type_line[0].split(" ").map((type)=>{
        if (cardTypes.includes(type)) {card_types.push(type)}
        else {super_types.push(type)}
    })

    // console.log('sup',super_types)
    // console.log('card',card_types)
    // console.log('sub',sub_types)
    
    const power_toughness = card.power?`${card.toughness}/${card.power}`:``


    if (card_types.includes("Creature") || true) return (
        <div className="card-tile">
            <button type="button"><img src={leftArrow}></img></button>
            <span>{name}</span>
            <span>{card.mana_cost}</span>
            <span>{power_toughness}</span>
            <span>{sub_types.join(" ")}</span>
            <button type="button"><img src={rightArrow}></img></button>
        </div>
    )
})