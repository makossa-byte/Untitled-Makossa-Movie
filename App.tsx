
import React, { useState, useCallback, useRef } from 'react';
import { Scene, Resolution, Project } from './types';
import { RESOLUTIONS } from './constants';
import useStoryboard from './hooks/useStoryboard';
import Header from './components/Header';
import Storyboard from './components/Storyboard';
import SettingsPanel from './components/SettingsPanel';
import PreviewPlayer from './components/PreviewPlayer';

const App: React.FC = () => {
    const {
        scenes,
        setScenes,
        addScene,
        updateScene,
        removeScene,
        duplicateScene,
        moveScene,
        undo,
        canUndo,
        redo,
        canRedo,
    } = useStoryboard();

    const [projectName, setProjectName] = useState('Untitled Makossa Movie');
    const [resolution, setResolution] = useState<Resolution>(RESOLUTIONS[1]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleGenerate = useCallback(async () => {
        setIsGenerating(true);
        setProgress(0);
        setLogs(['Generation started...']);
        setVideoUrl(null);

        const totalSteps = scenes.length * 5 + 10; // Simulated steps
        let currentStep = 0;

        const updateProgress = (logMessage: string) => {
            currentStep++;
            setProgress(Math.round((currentStep / totalSteps) * 100));
            setLogs(prev => [...prev, logMessage]);
        };

        for (let i = 0; i < scenes.length; i++) {
            updateProgress(`Processing Scene ${i + 1}: "${scenes[i].prompt.substring(0, 20)}..."`);
            await new Promise(res => setTimeout(res, 200));
            updateProgress(`- Generating frames with Stable Diffusion...`);
            await new Promise(res => setTimeout(res, 500));
            updateProgress(`- Synthesizing narration with Coqui TTS...`);
            await new Promise(res => setTimeout(res, 300));
            updateProgress(`- Adding background audio...`);
            await new Promise(res => setTimeout(res, 200));
             updateProgress(`- Scene ${i + 1} processed.`);
            await new Promise(res => setTimeout(res, 100));
        }

        updateProgress('Assembling all scenes with FFmpeg...');
        await new Promise(res => setTimeout(res, 1000));
        updateProgress('Finalizing video file...');
        await new Promise(res => setTimeout(res, 500));
        
        // Simulate video URL
        setVideoUrl('https://picsum.photos/seed/movie/1280/720');
        setProgress(100);
        setLogs(prev => [...prev, 'Generation complete!']);
        setIsGenerating(false);
    }, [scenes]);

    const handleSaveProject = useCallback(() => {
        const project: Project = {
            name: projectName,
            resolution,
            scenes,
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project, null, 2));
        // Fix: Use globalThis to access document and avoid TypeScript error when 'dom' lib is not available.
        const downloadAnchorNode = (globalThis as any).document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${projectName.replace(/\s+/g, '_')}.json`);
        // Fix: Use globalThis to access document and avoid TypeScript error when 'dom' lib is not available.
        (globalThis as any).document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }, [projectName, resolution, scenes]);

    const handleLoadProject = () => {
        // Fix: Cast to any to call click() method, avoiding TypeScript error when 'dom' lib has incomplete types.
        (fileInputRef.current as any)?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Fix: Use event.currentTarget to correctly access the 'files' property.
        const file = event.currentTarget.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const result = e.target?.result as string;
                    const project: Project = JSON.parse(result);
                    setProjectName(project.name);
                    setResolution(project.resolution);
                    setScenes(project.scenes);
                } catch (error) {
                    console.error("Failed to parse project file", error);
                    // Fix: Use globalThis to access alert and avoid TypeScript error when 'dom' lib is not available.
                    (globalThis as any).alert("Error: Could not load the project file. It may be corrupted.");
                }
            };
            reader.readAsText(file);
            // Reset file input to allow loading the same file again
            // Fix: Cast to any to set value property, avoiding TypeScript error when 'dom' lib has incomplete types.
            if(fileInputRef.current) (fileInputRef.current as any).value = "";
        }
    };


    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
            />
            <Header
                projectName={projectName}
                setProjectName={setProjectName}
                onSave={handleSaveProject}
                onLoad={handleLoadProject}
                onUndo={undo}
                canUndo={canUndo}
                onRedo={redo}
                canRedo={canRedo}
            />
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 flex flex-col overflow-hidden">
                    <Storyboard
                        scenes={scenes}
                        onAddScene={addScene}
                        onUpdateScene={updateScene}
                        onRemoveScene={removeScene}
                        onDuplicateScene={duplicateScene}
                        onMoveScene={moveScene}
                    />
                    <PreviewPlayer
                        isGenerating={isGenerating}
                        progress={progress}
                        logs={logs}
                        videoUrl={videoUrl}
                        projectName={projectName}
                    />
                </main>
                <aside className="w-80 bg-gray-800 p-4 border-l border-gray-700 overflow-y-auto">
                    <SettingsPanel
                        resolution={resolution}
                        setResolution={setResolution}
                        onGenerate={handleGenerate}
                        isGenerating={isGenerating}
                        sceneCount={scenes.length}
                    />
                </aside>
            </div>
        </div>
    );
};

export default App;
