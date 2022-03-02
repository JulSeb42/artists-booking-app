// Packages
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"

// Tests
import reportWebVitals from "./tests/reportWebVitals"

// Components
import { AuthProviderWrapper } from "./context/auth"
import App from "./App"

// Styles
import "components-react-julseb/dist/components/index.css"
import "./styles/root.css"

ReactDOM.render(
    <AuthProviderWrapper>
        <Router>
            <App />
        </Router>
    </AuthProviderWrapper>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
