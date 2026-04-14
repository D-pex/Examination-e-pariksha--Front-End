import React from 'react';

interface SelectorProps {
    options: { id: string; label: string }[];
    selectedValue: string;
    onChange: (value: string) => void;
    name: string;
}

export const Selector: React.FC<SelectorProps> = ({ options, selectedValue, onChange, name }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {options.map(opt => (
                <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                        type="radio"
                        name={name}
                        value={opt.id}
                        checked={selectedValue === opt.id}
                        onChange={() => onChange(opt.id)}
                    />
                    {opt.label}
                </label>
            ))}
        </div>
    );
};