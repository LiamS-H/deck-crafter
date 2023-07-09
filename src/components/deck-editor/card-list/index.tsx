import { ICard } from "../../../types/card";
import { CardTile } from "./card-tile";

import './card-list.css'

export function CardList (props : {cards : ICard[]}) {
    const dispList = props.cards.map(card => <CardTile cardObj={card} key={card.id}/>)

    return (
        <div className="card-list">{dispList}</div>
    )
}