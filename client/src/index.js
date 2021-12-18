// Packages
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"

// Components
import App from "./App"
import { AuthProviderWrapper } from "./context/auth"

// Styles
import "./styles/index.css"

ReactDOM.render(
    <AuthProviderWrapper>
        <Router>
            <App />
        </Router>
    </AuthProviderWrapper>,
    document.getElementById("root")
)
