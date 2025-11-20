import React from 'react';
import { THEME } from '../../constants';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'cyan' | 'pink' | 'green';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    pulsing?: boolean;
}

export const NeonButton: React.FC<Props> = ({ 
    children, 
    variant = 'cyan', 
    size = 'md', 
    pulsing = false,
    className = '',
    ...props 
}) => {
    const colors = {
        cyan: `border-[#0FF0FC] text-[#0FF0FC] shadow-[0_0_10px_#0FF0FC] hover:bg-[#0FF0FC]/10`,
        pink: `border-[#FF00A8] text-[#FF00A8] shadow-[0_0_10px_#FF00A8] hover:bg-[#FF00A8]/10`,
        green: `border-[#00FF90] text-[#00FF90] shadow-[0_0_10px_#00FF90] hover:bg-[#00FF90]/10`,
    };

    const sizes = {
        sm: 'px-3 py-1 text-xs',
        md: 'px-6 py-2 text-sm',
        lg: 'px-8 py-3 text-base font-bold',
        xl: 'w-24 h-24 rounded-full flex items-center justify-center text-xl font-black tracking-tighter'
    };

    return (
        <button 
            className={`
                relative border border-opacity-80 backdrop-blur-md
                font-mono uppercase tracking-widest transition-all duration-200
                active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                ${colors[variant]}
                ${sizes[size]}
                ${pulsing ? 'animate-pulse-fast' : ''}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};