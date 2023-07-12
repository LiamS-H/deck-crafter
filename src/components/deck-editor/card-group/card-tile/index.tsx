import { memo, useContext } from "react"

import { ICard, cardTypes } from "../../../../types/card"

// assets
import './card-tile.css'

import { deckContext } from "../.."

export const CardTile = memo((props : {cardObj : ICard, zone : "cards"|"maybeBoard"})=>{
    const {deck} = useContext(deckContext)

    

    const card = props.cardObj.card_faces? props.cardObj.card_faces[0] : props.cardObj
    const name = props.cardObj.name

    const type_line = (card.type_line+'—').split('—');
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
    
    const power_toughness = card.power?`${card.toughness}/${card.power}`:""

     return (
            <div className="card-tile">
                <div className="card-display">
                    <span>{name}</span>
                    <span>{card.mana_cost}</span>
                    <span>{power_toughness}</span>
                    <span>{sub_types.join(" ")}</span>
                </div>
            </div>
        )
})