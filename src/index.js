import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Templates from './pages/Templates';
import Database from './pages/Database';
import ApiIntegration from './pages/ApiIntegration';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2'
        },
        secondary: {
            main: '#dc004e'
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AuthProvider>
                    <DndProvider backend={HTML5Backend}>
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/builder" element={<Builder />} />
                            <Route path="/templates" element={<Templates />} />
                            <Route path="/database" element={<Database />} />
                            <Route path="/api-integration" element={<ApiIntegration />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                        <Footer />
                    </DndProvider>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
