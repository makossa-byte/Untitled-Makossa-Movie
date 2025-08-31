
import React from 'react';
import { SaveIcon, LoadIcon, UndoIcon, RedoIcon } from './icons';

interface HeaderProps {
    projectName: string;
    setProjectName: (name: string) => void;
    onSave: () => void;
    onLoad: () => void;
    onUndo: () => void;
    canUndo: boolean;
    onRedo: () => void;
    canRedo: boolean;
}

const Header: React.FC<HeaderProps> = ({
    projectName,
    setProjectName,
    onSave,
    onLoad,
    onUndo,
    canUndo,
    onRedo,
    canRedo,
}) => {
    return (
        <header className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700 shadow-md h-16 shrink-0">
            <div className="flex items-center gap-4">
                <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg'>
                  M
                </div>
                <input
                    type="text"
                    value={projectName}
                    // Fix: Use e.currentTarget to safely access the input value.
                    onChange={(e) => setProjectName(e.currentTarget.value)}
                    className="bg-transparent text-xl font-semibold p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-700"
                />
            </div>
            <div className="flex items-center gap-2">
                <button onClick={onUndo} disabled={!canUndo} className="px-3 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors">
                    <UndoIcon /> Undo
                </button>
                <button onClick={onRedo} disabled={!canRedo} className="px-3 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors">
                    <RedoIcon /> Redo
                </button>
                <div className="w-px h-6 bg-gray-600 mx-2"></div>
                <button onClick={onLoad} className="px-3 py-2 rounded-md hover:bg-gray-700 flex items-center gap-2 transition-colors">
                    <LoadIcon /> Load
                </button>
                <button onClick={onSave} className="px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2 transition-colors font-semibold">
                    <SaveIcon /> Save Project
                </button>
            </div>
        </header>
    );
};

export default Header;
