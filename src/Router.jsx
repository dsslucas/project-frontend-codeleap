import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';

export default function Router() {
    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
    )
}