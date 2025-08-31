
import React from 'react';
import { Resolution } from '../types';
import { RESOLUTIONS } from '../constants';

interface SettingsPanelProps {
    resolution: Resolution;
    setResolution: (res: Resolution) => void;
    onGenerate: () => void;
    isGenerating: boolean;
    sceneCount: number;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
    resolution,
    setResolution,
    onGenerate,
    isGenerating,
    sceneCount,
}) => {
    return (
        <div className="flex flex-col gap-6 h-full">
            <h2 className="text-xl font-semibold text-white">Movie Settings</h2>
            
            <div className="flex-1 flex flex-col gap-6">
                <div>
                    <label htmlFor="resolution" className="block text-sm font-medium text-gray-300 mb-1">Export Resolution</label>
                    <select
                        id="resolution"
                        value={resolution.name}
                        onChange={(e) => {
                            // Fix: Use e.currentTarget to safely access the select value.
                            const newRes = RESOLUTIONS.find(r => r.name === e.currentTarget.value);
                            if (newRes) setResolution(newRes);
                        }}
                        className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                        {RESOLUTIONS.map(res => (
                            <option key={res.name} value={res.name}>{res.name} ({res.width}x{res.height})</option>
                        ))}
                    </select>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">System Status</h3>
                    <div className="p-3 bg-gray-900 rounded-md space-y-2 text-sm">
                       <div className="flex justify-between">
                           <span className="text-gray-400">Processing Mode:</span>
                           <span className="font-mono text-green-400">GPU Accelerated</span>
                       </div>
                       <div className="flex justify-between">
                           <span className="text-gray-400">Stable Diffusion:</span>
                           <span className="font-mono text-green-400">Loaded</span>
                       </div>
                       <div className="flex justify-between">
                           <span className="text-gray-400">Coqui TTS:</span>
                           <span className="font-mono text-green-400">Loaded</span>
                       </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                <button
                    onClick={onGenerate}
                    disabled={isGenerating || sceneCount === 0}
                    className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed disabled:text-gray-400 transition-all flex items-center justify-center"
                >
                    {isGenerating ? (
                        <>
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : `Generate Movie (${sceneCount} ${sceneCount === 1 ? 'Scene' : 'Scenes'})`}
                </button>
            </div>
        </div>
    );
};

export default SettingsPanel;
