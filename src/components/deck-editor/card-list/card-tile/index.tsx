import { memo, useContext } from "react"

import { ICard, cardTypes } from "../../../../types/card"

// assets
import leftArrow from '../../../../assets/Left-Arrow.png'
import rightArrow from '../../../../assets/right-Arrow.png'
import './card-tile.css'

import { deckContext } from "../.."

export const CardTile = memo((props : {cardObj : ICard, zone : "cards"|"maybeBoard"})=>{
    const {deck, modifyDeck} = useContext(deckContext)

    function deckToMaybe() {
        const newDeck = {...deck}
        newDeck.maybeBoard.push(props.cardObj)
        newDeck.mainBoard = newDeck.mainBoard.filter((card)=>card.name!=props.cardObj.name)
        modifyDeck(newDeck)
    }

    function maybeToDeck() {
        const newDeck = {...deck}
        newDeck.mainBoard.push(props.cardObj)
        newDeck.maybeBoard = newDeck.maybeBoard.filter((card)=>card.name!=props.cardObj.name)
        modifyDeck(newDeck)
    }

    function maybeToOut() {
        const newDeck = {...deck}
        newDeck.maybeBoard = newDeck.maybeBoard.filter((card)=>card.name!=props.cardObj.name)
        modifyDeck(newDeck)
    }

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
    
    const power_toughness = card.power?`${card.toughness}/${card.power}`:""

    switch (props.zone) {
        default : return (
            <div className="card-tile">
                <button type="button" onClick={maybeToDeck}>
                    <img src={leftArrow}></img>
                </button>
                
                <div className="card-display">
                    <span>{name}</span>
                    <span>{card.mana_cost}</span>
                    <span>{power_toughness}</span>
                    <span>{sub_types.join(" ")}</span>
                </div>
                
                <button type="button" onClick={maybeToOut}>
                    <img src={rightArrow}></img>
                </button>
            </div>
        )
    
        case "cards" : return (
            <div className="card-tile">
                <div className="card-display">
                    <span>{name}</span>
                    <span>{card.mana_cost}</span>
                    <span>{power_toughness}</span>
                    <span>{sub_types.join(" ")}</span>
                </div>
                
                <button type="button" onClick={deckToMaybe}>
                    <img src={rightArrow}></img>
                    </button>
            </div>
        )


    }
    
})