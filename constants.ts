
import { Style, Resolution, SoundEffect } from './types';

export const STYLES: Style[] = ['Realistic', 'Cinematic', 'Anime', 'Cartoon', 'Watercolor', 'Pixel Art'];

export const RESOLUTIONS: Resolution[] = [
    { name: '720p', width: 1280, height: 720 },
    { name: '1080p', width: 1920, height: 1080 },
    { name: '4K', width: 3840, height: 2160 },
];

export const SOUND_EFFECTS: SoundEffect[] = [
    { name: 'None', path: '' },
    { name: 'Dramatic Score', path: '/sounds/dramatic.mp3' },
    { name: 'Peaceful Forest', path: '/sounds/forest.mp3' },
    { name: 'Cyberpunk City', path: '/sounds/city.mp3' },
    { name: 'Epic Battle', path: '/sounds/battle.mp3' },
];
