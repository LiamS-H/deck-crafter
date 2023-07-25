import { DragStart, Droppable } from "@hello-pangea/dnd";

import { IDeckDisp } from "../../../../types/decklist";

import CardGroup from "../../card-group";

import { ZoneWrapper, ZoneTitle, DropZone } from "../styled/zones";



export default function SearchZone( props : { deckDisp : IDeckDisp, drag : DragStart | null | undefined }) {
    const disabled = props.drag ? props.drag.draggableId.split("/")[0] == "search" : false

    const groups = props.deckDisp.zones.search.group_ids.map(group_id=>{
        const group = props.deckDisp.groups[group_id]
        const cards = group.card_ids.map(card_id=>props.deckDisp.cards[card_id])

        let editable = props.deckDisp.display.grouping === "tags"
        editable = editable ? !group_id.includes("untagged") : false
        
        return <CardGroup key={group.id} group={group} cards={cards} disabled={disabled} editable={editable}/>
    })

    const [src_zone_id, src_group_id, card_id] = props.drag ? props.drag.draggableId.split("/") : []
    
    groups.push(
        <Droppable
            key={"search"}
            droppableId={"search"}
            isDropDisabled={src_zone_id === "search"}
        >
            {provided => (
                <DropZone ref={provided.innerRef}>
                    {provided.placeholder}
                </DropZone>
            )}
            
        </Droppable>
    )


    return (
    <ZoneWrapper>
        <ZoneTitle>{props.deckDisp.zones.search.title}</ZoneTitle>
        {groups}
    </ZoneWrapper>
        

    )
}