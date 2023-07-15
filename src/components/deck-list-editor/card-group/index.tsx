import { Droppable } from "@hello-pangea/dnd";

import { ICard } from "../../../types/card";
import { IGroup } from "../../../types/decklist";
import { styled } from "styled-components";

import CardTile from '../card-tile'

const GroupWrapper = styled.div`
    background-color: red;
    width: 300px;
    margin: 2px;
    padding: 2px;
    border-radius: 5px;

    display: flex;
    flex-flow: column wrap;
`;

const Title = styled.h3`
`;

const Cards = styled.div`
    width: 100%;
    

    display: flex;
    flex-direction: column;
`;

//
export default function CardGroup( props : {group : IGroup, cards : ICard[]}) {
    return (
    <GroupWrapper >
        
        <Droppable droppableId={props.group.id}>
            {provided => (
                <Cards
                
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <Title>{props.group.title}</Title>
                    {props.cards.map((card, index) => (
                        <CardTile
                            cardObj={card}
                            index={index}
                            id={`${props.group.id}/${card.id}`}
                            key={`${props.group.id}/${card.id}`}
                        />
                    ))}
                    {provided.placeholder}
                </Cards>
            )}
        </Droppable>
            
    </GroupWrapper>
        

    )
}