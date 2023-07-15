import { Droppable } from "@hello-pangea/dnd";

import { ICard } from "../../../types/card";
import { IZone, IGroup } from "../../../types/decklist";
import { IDeckDispMode } from "../../../types/decklist";
import { styled } from "styled-components";

import CardGroup from "../card-group";

const ZoneWrapper = styled.div<{$main: boolean}>`
    background-color: grey;
    margin: 1px;

    display: flex;
    flex-flow: column wrap;

    ${(props)=>
    props.$main == true ?
    `flex-grow: 1;
    ` :
    `width: 320px;
    overflow-y: auto;
    `
    }
`;

const DropZone = styled.div`
    flex-grow: 1;
`

const Title = styled.h3`
    padding: 8px;
`;

//
export default function Zone( props : {display : IDeckDispMode, zone : IZone, groups : IGroup[], cards : {[key:string] : ICard}}) {
    const groups = props.groups.map(group=>{
        const cards = group.card_ids.map(card_id=>props.cards[card_id])
        return <CardGroup key={group.id} group={group} cards={cards} />
    })

    if (props.zone.id != "search") {
        if (props.display.grouping == "tags") {
            groups.push(
                <CardGroup key={"new-tag"} group={{id:`${props.zone.id}/new-tag`,card_ids:[],title:"new tag"}} cards={[]} />
            )
        } 
        groups.push(
            <Droppable key={props.zone.id} droppableId={props.zone.id}>
                {provided => (
                    <DropZone ref={provided.innerRef}>
                        {provided.placeholder}
                    </DropZone>
                )}
                
            </Droppable>
        )
    }

    


    return (
    <ZoneWrapper $main={props.zone.id === 'main'}>
        <Title>{props.zone.title}</Title>
        {groups}
    </ZoneWrapper>
        

    )
}