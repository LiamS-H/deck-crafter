import { IMTGCard } from "../../../types/card";
import { MTGTile } from "./card-tile";

import './card-list.css'

export function CardList (props : {cards : IMTGCard[]}) {
    const dispList = props.cards.map(card => <MTGTile cardObj={card}/>)

    return (
        <div className="card-list">{dispList}</div>
    )
}