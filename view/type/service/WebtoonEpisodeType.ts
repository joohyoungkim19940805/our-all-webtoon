export interface WebtoonEpisodeType {
    title: string;
    id: number;
    episode: Episode;
}

export interface Episode {
    chapter: number | string;
    kind: string;
    id: number;
    subTitle?: string;
    thumbnail: string;
    createAt: number;
    views?: number;
}

export interface WebtoonSummary {
    id: number;
    thumbnail: string;
    summary: string;
    author: string;
}
