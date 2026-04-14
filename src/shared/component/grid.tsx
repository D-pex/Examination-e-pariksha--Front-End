import React from 'react';

interface GridProps {
    children: React.ReactNode;
    columns?: number;
    gap?: string;
}

export const Grid: React.FC<GridProps> = ({ children, columns = 1, gap = '16px' }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap }}>
            {children}
        </div>
    );
};