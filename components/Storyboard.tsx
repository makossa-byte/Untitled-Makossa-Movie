
import React from 'react';
import { Scene } from '../types';
import SceneCard from './SceneCard';
import { PlusIcon } from './icons';

interface StoryboardProps {
    scenes: Scene[];
    onAddScene: () => void;
    onUpdateScene: (id: string, updatedScene: Partial<Scene>) => void;
    onRemoveScene: (id: string) => void;
    onDuplicateScene: (id: string) => void;
    onMoveScene: (id: string, direction: 'up' | 'down') => void;
}

const Storyboard: React.FC<StoryboardProps> = ({
    scenes,
    onAddScene,
    onUpdateScene,
    onRemoveScene,
    onDuplicateScene,
    onMoveScene
}) => {
    return (
        <div className="flex-1 p-6 overflow-y-auto bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    {scenes.map((scene, index) => (
                        <SceneCard
                            key={scene.id}
                            scene={scene}
                            sceneNumber={index + 1}
                            onUpdate={onUpdateScene}
                            onRemove={onRemoveScene}
                            onDuplicate={onDuplicateScene}
                            onMove={onMoveScene}
                            isFirst={index === 0}
                            isLast={index === scenes.length - 1}
                        />
                    ))}
                </div>
                <div className="mt-6 text-center">
                    <button
                        onClick={onAddScene}
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:bg-gray-800 hover:border-gray-500 hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add Scene
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Storyboard;
