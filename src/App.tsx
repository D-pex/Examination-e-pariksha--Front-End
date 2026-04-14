import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './feature/homedashboard/home';
import { AttemptTest, CreateTest, TestList } from './feature/test';
import { Login } from './feature/auth';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/test/attempt/:id" element={<AttemptTest />} />
                <Route path="/test/create" element={<CreateTest />} />
                <Route path="/test/reports" element={<TestList />} />
            </Routes>
        </BrowserRouter>
    );
};