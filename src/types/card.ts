export interface IscryfallResult {
    object: 'error' | 'list';
    //succes atribute
    total_cards: number;
    has_more: boolean;
    next_page: string;
    data: ICard[];

    //error atributes
    code: string;
    status: number;
    warnings: string[];
    details: string;
}

export interface ICardFace {
    object: "card_face";

    name: string;
    mana_cost: string;
    power: string;
    toughness: string;
    
    colors: string[];
    color_identity: string[];
    type_line: string;
    oracle_text: string;
    
    image_uris: ICardImages;
    

    artist: string;
}

export interface ICardImages {
    art_crop: string;
    border_crop: string;
    large: string;
    normal: string;
    png: string;
    small: string;
}

export interface ICard {
    object: 'card';

    id: string;
    name: string;
    mana_cost: string;
    power: string;
    toughness: string;
    
    colors: string[];
    color_identity: string[];
    type_line: string;
    oracle_text: string;

    image_status: "lowres" | "highres_scan" | string;
    image_uris: ICardImages;
    card_faces: ICardFace[]
    
    artist: string;
}

export const cardTypes = [
    'Artifact',
    'Conspiracy',
    'Creature',
    'Dungeon',
    'Enchantment',
    'Instant',
    'Land',
    'Phenomenon',
    'Plane',
    'Planeswalker',
    'Scheme',
    'Sorcery',
    'Tribal',
    'Vanguard',
]