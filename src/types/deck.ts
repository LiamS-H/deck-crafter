import { ITagMapping } from "./tags";
import { ICard } from "./card";

export const EMPTYDECK : IDeck = {
    name: "Untitled",
    commander: "None",
    colorspace: [],
    tagMap: [],
    maybeBoard: [],
    cards: [],
}

export interface IDeck {
    name: string;
    commander: string;
    colorspace: string[];
    tagMap: ITagMapping[];
    maybeBoard: ICard[];
    cards: ICard[];

}