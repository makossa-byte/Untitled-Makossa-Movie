import { useState, useCallback } from 'react';
import { Scene } from '../types';
import { STYLES } from '../constants';

const MAX_HISTORY = 50;

const createNewScene = (): Scene => ({
    id: crypto.randomUUID(),
    prompt: '',
    style: 'Cinematic',
    narrationEnabled: true,
    narrationText: '',
    backgroundMusic: '', // Default to 'None'
});

const useStoryboard = (initialScenes: Scene[] = [createNewScene()]) => {
    const [scenes, setScenes] = useState<Scene[]>(initialScenes);
    const [history, setHistory] = useState<Scene[][]>([initialScenes]);
    const [historyIndex, setHistoryIndex] = useState(0);

    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;

    const updateStateAndHistory = useCallback((newState: Scene[]) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newState);
        
        if (newHistory.length > MAX_HISTORY) {
            newHistory.shift();
        }

        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setScenes(newState);
    }, [history, historyIndex]);

    const addScene = useCallback(() => {
        const newScene = createNewScene();
        const newScenes = [...scenes, newScene];
        updateStateAndHistory(newScenes);
    }, [scenes, updateStateAndHistory]);

    const updateScene = useCallback((id: string, updatedScene: Partial<Scene>) => {
        const newScenes = scenes.map(scene =>
            scene.id === id ? { ...scene, ...updatedScene } : scene
        );
        updateStateAndHistory(newScenes);
    }, [scenes, updateStateAndHistory]);

    const removeScene = useCallback((id: string) => {
        if (scenes.length <= 1) return; // Don't allow deleting the last scene
        const newScenes = scenes.filter(scene => scene.id !== id);
        updateStateAndHistory(newScenes);
    }, [scenes, updateStateAndHistory]);
    
    const duplicateScene = useCallback((id: string) => {
        const sceneToDuplicate = scenes.find(s => s.id === id);
        if (!sceneToDuplicate) return;

        const duplicatedScene = { ...sceneToDuplicate, id: crypto.randomUUID() };
        const index = scenes.findIndex(s => s.id === id);
        
        const newScenes = [
            ...scenes.slice(0, index + 1),
            duplicatedScene,
            ...scenes.slice(index + 1)
        ];
        updateStateAndHistory(newScenes);
    }, [scenes, updateStateAndHistory]);


    const moveScene = useCallback((id: string, direction: 'up' | 'down') => {
        const index = scenes.findIndex(scene => scene.id === id);
        if (index === -1) return;
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === scenes.length - 1) return;

        const newScenes = [...scenes];
        const [movedScene] = newScenes.splice(index, 1);
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        newScenes.splice(newIndex, 0, movedScene);
        updateStateAndHistory(newScenes);
    }, [scenes, updateStateAndHistory]);

    const undo = useCallback(() => {
        if (canUndo) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setScenes(history[newIndex]);
        }
    }, [canUndo, history, historyIndex]);

    const redo = useCallback(() => {
        if (canRedo) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setScenes(history[newIndex]);
        }
    }, [canRedo, history, historyIndex]);

    const directSetScenes = useCallback((newScenes: Scene[]) => {
        updateStateAndHistory(newScenes);
    }, [updateStateAndHistory]);


    return {
        scenes,
        setScenes: directSetScenes,
        addScene,
        updateScene,
        removeScene,
        duplicateScene,
        moveScene,
        undo,
        canUndo,
        redo,
        canRedo,
    };
};

export default useStoryboard;