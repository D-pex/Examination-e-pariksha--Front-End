import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'success' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
    const baseStyle = { padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer', color: '#fff' };
    const colors = {
        primary: '#007bff',
        success: '#28a745',
        danger: '#dc3545'
    };
    return (
        <button style={{ ...baseStyle, backgroundColor: colors[variant] }} {...props} />
    );
};