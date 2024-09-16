import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./contexts/AuthContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import Templates from "./pages/Templates";
import Database from "./pages/Database";
import ApiIntegration from "./pages/ApiIntegration";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#dc004e",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AuthProvider>
                    <DndProvider backend={HTML5Backend}>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/builder" component={Builder} />
                            <Route path="/templates" component={Templates} />
                            <Route path="/database" component={Database} />
                            <Route path="/api-integration" component={ApiIntegration} />
                            <Route path="/settings" component={Settings} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                        </Switch>
                        <Footer />
                    </DndProvider>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
