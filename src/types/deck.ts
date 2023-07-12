import { ITagMapping, ITag } from "./tags";
import { ICard } from "./card";

export const EMPTYDECK : IDeck = {
    name: "Untitled",
    commander: "None",
    colorspace: [],
    tags: {"untagged": []},
    tagMap: [],
    
    maybeBoard: [],
    mainBoard: [],
}

export interface IDeck {
    name: string;
    commander: string;
    colorspace: string[];
    tagMap: ITagMapping[];
    tags: ITag;
    maybeBoard: ICard[];
    mainBoard: ICard[];

}