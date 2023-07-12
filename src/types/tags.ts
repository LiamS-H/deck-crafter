import { ICard } from "./card";

export interface ITag {
    [key: string] : ICard[]
}

export interface ITagMapping {
    otags: string[];
    tag: string;
}