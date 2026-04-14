import React from 'react';
import { Button } from '../../../shared/component/button';

export const Login: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Login</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                <input placeholder="Username" />
                <input type="password" placeholder="Password" />
                <Button>Login</Button>
            </div>
        </div>
    );
};