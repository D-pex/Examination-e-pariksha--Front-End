import React, { useEffect, useState } from 'react';
import { api } from '../../../services';
import { TestReportDto } from '../../../types/master';
import { Grid } from '../../../shared/component/grid';

export const TestList: React.FC = () => {
    const [reports, setReports] = useState<TestReportDto[]>([]);

    useEffect(() => {
        api.getTestReports().then(setReports);
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Test Reports</h1>
            <Grid columns={2}>
                <strong>Test Name</strong>
                <strong>Users Appeared</strong>
                {reports.map(r => (
                    <React.Fragment key={r.testId}>
                        <span>{r.testName}</span>
                        <span>{r.usersAppeared}</span>
                    </React.Fragment>
                ))}
            </Grid>
        </div>
    );
};