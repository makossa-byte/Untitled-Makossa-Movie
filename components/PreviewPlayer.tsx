
import React, { useEffect, useRef } from 'react';
import { DownloadIcon } from './icons';

interface PreviewPlayerProps {
    isGenerating: boolean;
    progress: number;
    logs: string[];
    videoUrl: string | null;
    projectName: string;
}

const PreviewPlayer: React.FC<PreviewPlayerProps> = ({ isGenerating, progress, logs, videoUrl, projectName }) => {
    const logsEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fix: Cast to any to call scrollIntoView() method, avoiding TypeScript error when 'dom' lib has incomplete types.
        (logsEndRef.current as any)?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    const handleDownload = () => {
        if (!videoUrl) return;
        // Fix: Use globalThis to access document and avoid TypeScript error when 'dom' lib is not available.
        const a = (globalThis as any).document.createElement('a');
        a.href = videoUrl;
        const fileName = `${projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp4`;
        a.download = fileName;
        // Fix: Use globalThis to access document and avoid TypeScript error when 'dom' lib is not available.
        (globalThis as any).document.body.appendChild(a);
        a.click();
        // Fix: Use globalThis to access document and avoid TypeScript error when 'dom' lib is not available.
        (globalThis as any).document.body.removeChild(a);
    };

    return (
        <div className="h-64 bg-black border-t-2 border-gray-700 shrink-0 p-4 flex gap-4">
            <div className="w-1/3 h-full bg-gray-900 rounded-lg flex items-center justify-center relative">
                {videoUrl && !isGenerating ? (
                    <>
                        <video src={videoUrl} controls className="w-full h-full object-contain rounded-lg" />
                        <button
                            onClick={handleDownload}
                            className="absolute bottom-3 right-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-all duration-200 ease-in-out font-semibold text-base shadow-xl transform hover:scale-105"
                        >
                            <DownloadIcon className="w-5 h-5" />
                            Download
                        </button>
                    </>
                ) : (
                    <div className="text-gray-500 text-center">
                        {isGenerating ? 'Rendering...' : 'Video preview will appear here'}
                    </div>
                )}
            </div>
            <div className="flex-1 flex flex-col bg-gray-900 rounded-lg p-3">
                <h3 className="text-lg font-semibold mb-2">Generation Progress</h3>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}></div>
                </div>
                <div className="flex-1 bg-black rounded-md p-2 overflow-y-auto text-sm font-mono">
                    {logs.map((log, index) => (
                        <p key={index} className="text-gray-400 whitespace-pre-wrap">{`> ${log}`}</p>
                    ))}
                    <div ref={logsEndRef} />
                </div>
            </div>
        </div>
    );
};

export default PreviewPlayer;
