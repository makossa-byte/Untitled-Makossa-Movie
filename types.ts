export type Style = 'Realistic' | 'Cinematic' | 'Anime' | 'Cartoon' | 'Watercolor' | 'Pixel Art';

export interface Resolution {
    name: string;
    width: number;
    height: number;
}

export interface SoundEffect {
    name: string;
    path: string;
}

export interface Scene {
    id: string;
    prompt: string;
    style: Style;
    narrationEnabled: boolean;
    narrationText: string;
    customImage?: string; // a base64 string or local path
    backgroundMusic?: string; // name of a track
}

export interface Project {
    name: string;
    resolution: Resolution;
    scenes: Scene[];
}