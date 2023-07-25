import { Droppable } from "@hello-pangea/dnd";
import { styled } from "styled-components";
import { useState, useContext } from "react";
import { EditText, onSaveProps } from 'react-edit-text'
import { DeckListContext } from "..";

import { ICard } from "../../../types/card";
import { IDispGroup } from "../../../types/decklist";

import { BsPencilSquare, BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import CardTile from '../card-tile/card-tile'
import CardTileDual from "../card-tile/card-tile-dual";

const GroupWrapper = styled.div`
    background-color: ${props=>props.theme.group};
    width: 300px;
    margin: 2px;
    padding: 2px;
    border-radius: 5px;

    display: flex;
    flex-flow: column wrap;
`;

const Title = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;

`;

const Cards = styled.div`
    width: 100%;
    min-height: 10px;

    display: flex;
    flex-direction: column;
`;

const EditTile = styled(BsPencilSquare)`
    margin-left: auto;
`

const CollapseTile = styled(BsFillCaretDownFill)`
`

const OpenTile = styled(BsFillCaretRightFill)`
    
`

//
export default function CardGroup( props : { group : IDispGroup, cards : ICard[], disabled : boolean, editable: boolean }) {
    const [open, setOpen] = useState(true)

    const { decklist, updateDeckList } = useContext(DeckListContext)

    function toggle() {
        setOpen(!open)
    }

    return (
    <GroupWrapper >
        <Title>
            {props.editable && <EditText
                name={props.group.id}
                placeholder={props.group.title}
                onSave={(change : onSaveProps)=>{
                    
                    const old_tag = change.name.split("/")[1]
                    const new_tag = change.value
                    const newDeckList = {...decklist}
                    const cards = [...newDeckList.tags[old_tag]]
                    
                    delete newDeckList.tags[old_tag]
                    newDeckList.tags[new_tag] = newDeckList.tags[new_tag] ? newDeckList.tags[new_tag].concat(cards) : cards
                    updateDeckList(newDeckList)
                }}
            />}
            {!props.editable && <>{props.group.title}</>}
            
            {open && <CollapseTile onClick={toggle}/>}
            {!open && <OpenTile onClick={toggle}/>}
            {props.editable && <EditTile />}
        </Title>
        {open &&
        <Droppable isDropDisabled={props.disabled} droppableId={props.group.id}>
            {(provided) => (
                <Cards
                
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    
                    {props.cards.map((card, index) => {
                        const card_tile_props = {
                            disabled : props.group.disabled.includes(card.id),
                            cardObj : card,
                            index : index,
                            id : `${props.group.id}/${card.id}`,
                            key : `${props.group.id}/${card.id}`,
                        }
                        return card.card_faces ? <CardTileDual {...card_tile_props} /> : <CardTile {...card_tile_props} />
                        

                    }
                        
                        
                    )}
                    {provided.placeholder}
                </Cards>
            )}
        </Droppable>
        }
    </GroupWrapper>
        

    )
}