// Packages
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

// API
import { AuthProviderWrapper } from "./context/auth"

// Components
import App from "./App"

// Tests
import reportWebVitals from "./tests/reportWebVitals"

// Styles
import "components-react-julseb/dist/components/index.css"
import "./styles/root.css"

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProviderWrapper>
                <App />
            </AuthProviderWrapper>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
