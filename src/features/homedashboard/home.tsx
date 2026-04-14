import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services';
import { TestDto } from '../../types/master';
import { Grid } from '../../shared/component/grid';

export const Home: React.FC = () => {
    const [tests, setTests] = useState<TestDto[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.getPublishedTests().then(setTests);
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Home - Available Tests</h1>
            <Grid columns={3}>
                {tests.map(test => (
                    <div 
                        key={test.id} 
                        style={{ border: '1px solid #ccc', padding: '16px', cursor: 'pointer' }}
                        onClick={() => navigate(`/test/attempt/${test.id}`)}
                    >
                        <h3>{test.name}</h3>
                        <p>{test.subject}</p>
                    </div>
                ))}
            </Grid>
        </div>
    );
};