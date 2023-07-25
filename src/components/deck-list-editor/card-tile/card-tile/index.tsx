import { Draggable } from "@hello-pangea/dnd";
import { useState} from "react"

import { ICard, cardTypes } from "../../../../types/card"

import {TileWrapper, TileDisplay, CardAtribute, CardWrapper, GridIcon, Handle} from "../styled"

export default function CardTile(props : {cardObj : ICard, index : number, id : string, disabled : boolean}) {
    const [open, setOpen] = useState(false)
    function toggle() {
        setOpen(!open)
    }
    
    const card = props.cardObj.card_faces? props.cardObj.card_faces[0] : props.cardObj
    const name = props.cardObj.name

    const keywords = props.cardObj.keywords

    let card_text : string[] = []

    const power_toughness = card.power?`${card.toughness}/${card.power}`:""
    
    let oracle = card.oracle_text
    keywords.forEach(keyword=>{
        oracle = oracle.replace(keyword, `${keyword}.`)
    })
    card_text.push(card.type_line)
    card_text = card_text.concat(oracle.split("."))
    card_text.push(power_toughness)

    const type_line = (card.type_line+'—').split('—');
    const sub_types = type_line[1].split(" ")
    
    const super_types : string[] = []
    const card_types : string[] = []

    type_line[0].split(" ").forEach((type)=>{
        if (cardTypes.includes(type)) {card_types.push(type)}
        else {super_types.push(type)}
    })

    // console.log('sup',super_types)
    // console.log('card',card_types)
    // console.log('sub',sub_types)
    
     return ( <>
        <Draggable draggableId={props.id} index={props.index} isDragDisabled={props.disabled}>
            {(provided) => (
                <CardWrapper open={open}
                {...provided.draggableProps}
                ref={provided.innerRef}
                onClick={toggle}
                >
                <TileWrapper
                    
                >
                    <TileDisplay>
                        <span>{name}</span>
                        <span>{card.mana_cost}</span>
                        {!open && <>
                        <span>{power_toughness}</span>
                        <span>{sub_types.join(" ")}</span>
                        </>}
                    </TileDisplay>
                    
                     <Handle {...provided.dragHandleProps}>
                        {!props.disabled && <GridIcon />}
                    </Handle>
                </TileWrapper>
                    {open && <> {
                        card_text.map((line, index)=>
                            <CardAtribute key={index} align={"left"}>{line}</CardAtribute>
                        )
                    }</>}
                
                </CardWrapper>

            )}
        </Draggable>
        
    
    </> )
}