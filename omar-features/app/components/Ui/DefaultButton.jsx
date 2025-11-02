import React from 'react';

const DefaultButton = ({ children, onClick, disabled = false, type = "button", className = "" }) => {
    const ACCENT_COLOR = '#4EC5F5'; 
    const TEXT_COLOR = '#060010';   
    const CARD_BG = '#ffffff';

    const glowStyle = {
        '--accent-color': ACCENT_COLOR,
        '--text-color': TEXT_COLOR,
        '--card-bg': CARD_BG,
    };

    return (
        <>
            <button
                type={type}
                className={`button-glow-min  font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
                style={glowStyle}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </button>
            <style jsx>{`
                .button-glow-min {
                    background-color: var(--accent-color);
                    color: var(--card-bg);
                    border: 1px solid var(--accent-color);
                }
                .button-glow-min:hover:not(:disabled) {
                    color: var(--card-bg) !important; 
                    background-color: var(--text-color) !important;
                    border-color: var(--text-color) !important;
                    box-shadow: 
                        0 0 5px rgba(6, 0, 16, 0.4),
                        0 0 15px rgba(78, 197, 245, 0.8);
                }
            `}</style>
        </>
    );
};

export default DefaultButton;