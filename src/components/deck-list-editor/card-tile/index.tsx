import { Draggable } from "@hello-pangea/dnd";
import { ICard, cardTypes } from "../../../types/card"
import styled from 'styled-components'

import {BsGridFill} from 'react-icons/bs'


const CardWrapper = styled.div`
    margin-top: 8px;
    
    border: 1px solid lightgrey;
    border-radius: 2px;

    display: flex;
`;

const CardDiplay = styled.div`
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
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

export default function CardTile(props : {cardObj : ICard, index : number, id : string}) {
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
        <Draggable draggableId={props.id} index={props.index}>
            {(provided) => (
                <CardWrapper
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <CardDiplay>
                        <span>{name}</span>
                        <span>{card.mana_cost}</span>
                        <span>{power_toughness}</span>
                        <span>{sub_types.join(" ")}</span>
                    </CardDiplay>
                    <Handle {...provided.dragHandleProps}>
                        <GridIcon />
                    </Handle>
                </CardWrapper>
                
            )}
        </Draggable>
    )
}