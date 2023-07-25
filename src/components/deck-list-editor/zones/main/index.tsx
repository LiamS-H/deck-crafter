import { DragStart, Droppable } from "@hello-pangea/dnd";

import { IDeckDisp } from "../../../../types/decklist";

import CardGroup from "../../card-group";

import { DropZone, ZoneTitle, MainZoneWrapper } from "../styled/zones";



export default function MainZone( props : { deckDisp : IDeckDisp, drag : DragStart | null | undefined }) {
    const [src_zone_id, src_group_id, card_id] = props.drag ? props.drag.draggableId.split("/") : []

    const groups = props.deckDisp.zones.main.group_ids.map(group_id=>{
        const group = props.deckDisp.groups[group_id]
        const cards = group.card_ids.map(card_id=>props.deckDisp.cards[card_id])
        
        let disabled = src_zone_id + "/" + src_group_id === group_id
        disabled = disabled || group.card_ids.includes(card_id)
        
        let editable = props.deckDisp.display.grouping === "tags"
        editable = editable ? !group_id.includes("untagged") : false

        return (
            <CardGroup
                key={group.id}
                group={group}
                cards={cards}
                disabled={disabled}
                editable={editable}
            />
        )
    })


    if (props.deckDisp.display.grouping == "tags") {
        groups.push(
            <CardGroup key={"new-tag"} group={{id:`main/new-tag`,card_ids:[],title:"new tag",disabled:[]}} cards={[]} disabled={false} editable={false} />
        )
    }

    
    groups.push(
        <Droppable
            key={"main"}
            droppableId={"main"}
            isDropDisabled={src_group_id === "untagged" || (props.deckDisp.display.grouping !== "tags" && (src_zone_id == "main"))}
        >
            {provided => (
                <DropZone ref={provided.innerRef}>
                    {provided.placeholder}
                </DropZone>
            )}
            
        </Droppable>
    )
    
    

    


    return (
    <MainZoneWrapper>
        <ZoneTitle>{props.deckDisp.zones.main.title}</ZoneTitle>
        {groups}
    </MainZoneWrapper>
        

    )
}