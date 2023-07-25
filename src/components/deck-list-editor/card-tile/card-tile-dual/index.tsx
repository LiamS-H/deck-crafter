import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react"

import { ICard } from "../../../../types/card"

import {TileWrapper, TileDisplay, CardAtribute, CardWrapper, GridIcon, Handle} from "../styled"

export default function CardTileDual(props : {cardObj : ICard, index : number, id : string, disabled : boolean}) {
    const [open, setOpen] = useState(false)
    function toggle() {
        setOpen(!open)
    }
    
    const card = props.cardObj

    const name = props.cardObj.name

    const keywords = props.cardObj.keywords

    let text_faces : string[][] = []

    card.card_faces.forEach(face => {
        const power_toughness = face.power?`${face.power}/${face.toughness}`:""
        
        let oracle = face.oracle_text
        keywords.forEach(keyword=>{
            oracle = oracle.replace(keyword, `${keyword}.`)
        })
        let card_text : string[] = []
        card_text.push(face.name)
        card_text.push(face.mana_cost)
        card_text.push(face.type_line)
        card_text = card_text.concat(oracle.split("."))
        card_text.push(power_toughness)
        text_faces.push(card_text)
    })


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
                    </TileDisplay>
                    
                     <Handle {...provided.dragHandleProps}>
                        {!props.disabled && <GridIcon />}
                    </Handle>
                </TileWrapper>
                {open && <> 
                    {text_faces.map((face)=>{
                        console.log(face)
                        const disp_face : JSX.Element[] = [
                            <TileDisplay key="title">
                                <span>{face[0]}</span><span>{face[1]}</span>
                            </TileDisplay>
                        ]
                        
                        face.forEach((line, index)=>{
                            if (index <=1) return;
                            disp_face.push(<CardAtribute key={index} align={"left"}>{line}</CardAtribute>) 
                        } )

                        return disp_face;
                    })}
                </>}
                </CardWrapper>

            )}
        </Draggable>
        
    
    </> )
}