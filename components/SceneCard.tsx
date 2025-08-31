
import React from 'react';
import { Scene, Style } from '../types';
import { STYLES, SOUND_EFFECTS } from '../constants';
import { TrashIcon, ArrowUpIcon, ArrowDownIcon, DuplicateIcon, UploadCloudIcon } from './icons';

interface SceneCardProps {
    scene: Scene;
    sceneNumber: number;
    onUpdate: (id: string, updatedScene: Partial<Scene>) => void;
    onRemove: (id: string) => void;
    onDuplicate: (id: string) => void;
    onMove: (id: string, direction: 'up' | 'down') => void;
    isFirst: boolean;
    isLast: boolean;
}

const SceneCard: React.FC<SceneCardProps> = ({
    scene,
    sceneNumber,
    onUpdate,
    onRemove,
    onDuplicate,
    onMove,
    isFirst,
    isLast
}) => {
    const handleFieldChange = (field: keyof Scene, value: any) => {
        onUpdate(scene.id, { [field]: value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Fix: Use e.currentTarget to safely access the files property.
        const file = e.currentTarget.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleFieldChange('customImage', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg flex gap-4 p-4 border border-gray-700 transition-shadow hover:shadow-indigo-500/20">
            <div className="flex flex-col items-center gap-2 text-gray-400">
                <span className="text-2xl font-bold text-indigo-400">{sceneNumber}</span>
                <button onClick={() => onMove(scene.id, 'up')} disabled={isFirst} className="p-1 rounded-full hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed">
                    <ArrowUpIcon />
                </button>
                <button onClick={() => onMove(scene.id, 'down')} disabled={isLast} className="p-1 rounded-full hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed">
                    <ArrowDownIcon />
                </button>
                 <div className="w-px h-full bg-gray-700 my-2"></div>
                <button onClick={() => onDuplicate(scene.id)} className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-indigo-400">
                    <DuplicateIcon />
                </button>
                <button onClick={() => onRemove(scene.id)} className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-red-500">
                    <TrashIcon />
                </button>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Scene Prompt</label>
                        <textarea
                            value={scene.prompt}
                            // Fix: Use e.currentTarget to safely access the textarea value.
                            onChange={(e) => handleFieldChange('prompt', e.currentTarget.value)}
                            placeholder="e.g., A dragon flying over a medieval castle at sunset"
                            className="w-full h-32 p-2 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-300 mb-1">Visual Style</label>
                            <select
                                value={scene.style}
                                // Fix: Use e.currentTarget to safely access the select value.
                                onChange={(e) => handleFieldChange('style', e.currentTarget.value as Style)}
                                className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            >
                                {STYLES.map(style => <option key={style}>{style}</option>)}
                            </select>
                        </div>
                         <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-300 mb-1">Background Music</label>
                            <select
                                value={scene.backgroundMusic || ''}
                                // Fix: Use e.currentTarget to safely access the select value.
                                onChange={(e) => handleFieldChange('backgroundMusic', e.currentTarget.value)}
                                className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            >
                                {SOUND_EFFECTS.map(sfx => <option key={sfx.name} value={sfx.path}>{sfx.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                {/* Right Column */}
                <div className="flex flex-col gap-4">
                    {/* Narration Section */}
                    <div>
                        <div className="flex items-center mb-1">
                            <label htmlFor={`narration-${scene.id}`} className="block text-sm font-medium text-gray-300">Enable Narration</label>
                        </div>
                        <textarea
                            id={`narration-${scene.id}`}
                            value={scene.narrationText}
                            // Fix: Use e.currentTarget to safely access the textarea value.
                            onChange={(e) => handleFieldChange('narrationText', e.currentTarget.value)}
                            placeholder="Enter narration text..."
                            disabled={!scene.narrationEnabled}
                            className="w-full h-[132px] p-2 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:opacity-50"
                        />
                    </div>
                    {/* Custom Image Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Custom Image (Optional)</label>
                        {scene.customImage ? (
                            <div className="relative group w-full h-[132px]">
                                <img src={scene.customImage} alt="Custom scene preview" className="w-full h-full object-cover rounded-md border border-gray-600" />
                                <button
                                    onClick={() => handleFieldChange('customImage', undefined)}
                                    aria-label="Remove custom image"
                                    className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <label htmlFor={`image-upload-${scene.id}`} className="cursor-pointer w-full h-[132px] border-2 border-dashed border-gray-600 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:border-gray-500 transition-colors">
                                <div className="text-center">
                                    <UploadCloudIcon className="w-8 h-8 mx-auto mb-2 text-gray-500"/>
                                    <span className="text-sm">Upload Image</span>
                                </div>
                                <input
                                    id={`image-upload-${scene.id}`}
                                    type="file"
                                    accept="image/png, image/jpeg, image/webp"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SceneCard;
