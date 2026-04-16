import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
            <div className="relative flex items-center justify-center">
                {/* Outer pulsing ring */}
                <div className="absolute w-16 h-16 rounded-full border border-emerald-400/20 loading-ring"></div>
                {/* Middle ring */}
                <div className="absolute w-12 h-12 rounded-full border border-cyan-400/15 loading-ring" style={{ animationDelay: '0.4s' }}></div>
                {/* Center dot */}
                <div className="w-4 h-4 rounded-full loading-dot" style={{
                    background: 'linear-gradient(135deg, #6ee7b7, #67e8f9)'
                }}></div>
            </div>
            <p className="mt-8 text-sm text-white/40 font-light tracking-widest uppercase">
                Loading
            </p>
        </div>
    );
};

export default Loading;
