import { ICard } from "../../../types/card";
import { CardTile } from "./card-tile";

import './card-list.css'

export function CardList (props : {cards : ICard[], zone : "cards"|"maybeBoard"}) {
    const dispList = props.cards.map(card => <CardTile cardObj={card} zone={props.zone} key={card.id}/>)

    return (
        <div className="card-list">{dispList}</div>
    )
}