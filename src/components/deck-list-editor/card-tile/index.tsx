import { Draggable } from "@hello-pangea/dnd";
import styled from 'styled-components'
import { useState} from "react"

import { ICard, cardTypes } from "../../../types/card"

import {BsGridFill} from 'react-icons/bs'


const TileWrapper = styled.div`
    margin-top: 8px;
    
    border: 1px solid ${props=>props.theme.tile.border};
    border-radius: 2px;

    display: flex;
`;

const TileDisplay = styled.div`
    flex-grow: 1;
    
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    white-space: nowrap;
    overflow: hidden;
`

const CardWrapper = styled.div<{open : true | false}>`
    flex-direction: column wrap;
    ${props=> props.open ? "background-color: rgb(50, 50, 50, .1);" : ""}
`

const CardAtribute = styled.div<{align : "right" | "left" }>`
    ${props=>props.align == "right" ? "margin-left:auto" : "margin-right:auto"}
    align-self: flex-end;
`

const Handle = styled.div`
    margin-left: 5px;
`;

const GridIcon = styled(BsGridFill)`
    color: rgba(0,0,0,0.2);
    width: 12px;
    height: 12px;

    align-self: flex-start;
`

export default function CardTile(props : {cardObj : ICard, index : number, id : string, disabled : boolean}) {
    const [open, setOpen] = useState(false)
    function toggle() {
        setOpen(!open)
    }
    
    const card = props.cardObj.card_faces? props.cardObj.card_faces[0] : props.cardObj
    const card_faces = props.cardObj.card_faces? props.cardObj.card_faces : [props.cardObj]
    const name = props.cardObj.name

    const keywords = props.cardObj.keywords

    let text_faces : string[][] = []
    card_faces.forEach(face => {
        const power_toughness = face.power?`${card.toughness}/${face.power}`:""
        
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
    
    const power_toughness = card.power?`${card.toughness}/${card.power}`:""

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
                        <span>{sub_types.join(" ")}</span></>}
                    </TileDisplay>
                    
                     <Handle {...provided.dragHandleProps}>
                        {!props.disabled && <GridIcon />}
                    </Handle>
                </TileWrapper>
                {open &&
                    <>
                        {props.cardObj.card_faces !== undefined &&
                            <TileDisplay>
                                <span></span>
                            </TileDisplay>}
                        
                        {text_faces.map(face=>face.map((line, index)=>
                            <CardAtribute key={index} align={"left"}>{line}</CardAtribute>
                        ))}
                    </>
                }
                </CardWrapper>

            )}
        </Draggable>
        
    
    </> )
}