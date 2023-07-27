import { ICard } from "./card"
import { ITagMapping } from "./tags"

export interface IZone {
    id : string,
    title : string,
    group_ids : string[]
}

export interface IGroup {
    id : string,
    title ?: string,
    card_ids : string[],
}

export interface IDispGroup {
    id : string,
    title ?: string,
    card_ids : string[],
    disabled : string[],
}

export interface IDeckDispMode {
    grouping : "tags" | "type" | "color" | "cmc"
    order : "cmc" | "price"
}

export interface IDeckList {
    title : string;
    colors : string[];
    display : IDeckDispMode;
    cards : {
        [key:string] : ICard
    },
    tags : {
        [key:string] : string[]
    } 
    tag_map : ITagMapping
    zones: {
        search: IGroup,
        maybe: IGroup,
        main: IGroup,
        [key:string]: IGroup,
    }
    zone_ids : ["search","maybe","main"]
}

export const EMPTY_DECKLIST : IDeckList = {
    title: "unnamed",
    colors: [ ],
    display : {
        grouping : "type",
        order: "cmc"
    },
    cards : {},
    tags : {
        "untagged" : []
    },
    tag_map : {
        tag : "untagged",
        otags : [],
    },
    zones : {
        search : {
            id : "search",
            card_ids : [],
        },
        maybe : {
            id : "maybe",
            card_ids : [],
        },
        main : {
            id : "main",
            card_ids : [],
        }
    },
    zone_ids : ["search","maybe","main"]
}

export interface IDeckDisp {
    title: string,
    display : IDeckDispMode;
    cards : {
        [key:string] : ICard
    },
    groups : {
        [key:string] : IDispGroup
    }
    zones : {
        search : {
            id : "search",
            title : "Search Results",
            group_ids : string[],
        },
        maybe : {
            id : "maybe",
            title : "Maybeboard",
            group_ids : string[],
        },
        main : {
            id : "main",
            title : "Maindeck",
            group_ids : string[],
        }
    },
    zone_ids : ["search","maybe","main"]
}

export const EMPTY_DECKDISP : IDeckDisp = {
    title: "unnamed",
    display : {grouping : "tags", order: "cmc" },
    cards : { },
    groups : { },
    zones : {
        search : {
            id : "search",
            title : "Search Results",
            group_ids : [],
        },
        maybe : {
            id : "maybe",
            title : "Maybeboard",
            group_ids : [],
        },
        main : {
            id : "main",
            title : "Maindeck",
            group_ids : [],
        }
    },
    zone_ids : ["search","maybe","main"]
}