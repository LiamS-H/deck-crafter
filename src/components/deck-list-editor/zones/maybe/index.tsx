import { DragStart, Droppable } from "@hello-pangea/dnd";

import { IDeckDisp } from "../../../../types/decklist";

import CardGroup from "../../card-group";

import { DropZone, ZoneTitle, ZoneWrapper } from "../styled/zones";



export default function MaybeZone( props : { deckDisp : IDeckDisp, drag : DragStart | null | undefined }) {
    const [src_zone_id, src_group_id, card_id] = props.drag ? props.drag.draggableId.split("/") : []

    const groups = props.deckDisp.zones.maybe.group_ids.map(group_id=>{
        const group = props.deckDisp.groups[group_id]
        const cards = group.card_ids.map(card_id=>props.deckDisp.cards[card_id])
        
        let disabled = src_zone_id + "/" + src_group_id === group_id
        disabled = disabled || group.card_ids.includes(card_id)
        disabled = disabled || props.deckDisp.display.grouping !== "tags" && (src_zone_id == "maybe")
        
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
            <CardGroup key={"new-tag"} group={{id:`maybe/new-tag`,card_ids:[],title:"new tag",disabled:[]}} cards={[]} disabled={false} editable={false}/>
        )
    }

 
    groups.push(
        <Droppable
            key={"maybe"}
            droppableId={"maybe"}
            isDropDisabled={src_group_id === "untagged" || (props.deckDisp.display.grouping !== "tags" && (src_zone_id == "maybe"))}
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
        <ZoneTitle>{props.deckDisp.zones.maybe.title}</ZoneTitle>
        {groups}
    </ZoneWrapper>
        

    )
}