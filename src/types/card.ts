export interface IscryfallResult {
    object: 'error' | 'list';
    //succes atribute
    total_cards: number;
    has_more: boolean;
    next_page: string;
    data: IMTGCard[];

    //error atributes
    code: string;
    status: number;
    warnings: string[];
    details: string;
}

export interface ICardFace {
    artist: string;
    mana_cost: string;
    name: string;
    object: "card_face";
    oracle_text: string;
    image_uris: ICardImages;
}

export interface ICardImages {
    art_crop: string;
    border_crop: string;
    large: string;
    normal: string;
    png: string;
    small: string;
}

export interface IMTGCard {
    id: string;
    name: string;
    artist: string;
    image_status: "lowres" | "highres_scan" | string;
    image_uris: ICardImages;
    card_faces: ICardFace[]
    oracle_text: string;
}