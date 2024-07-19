import { Editor } from '@type/Editor';
import { Genre } from '@type/service/Genre';

export type WebtoonRegistRqeust = {
    agree: boolean;
    webtoonTitle: string;
    synopsis: Editor[];
    genre: string[];
    thumbnailExtension?: string;
};

export type WebtoonListResponse = {
    id: string;
    webtoonTitle: string;
    genre: string[];
    synopsis: Editor[];
    thumbnail: string;
};
