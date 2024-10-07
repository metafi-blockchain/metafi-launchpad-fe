import React from "react";
import "./index.scss";

const BFButton = ({ type = "button", variant = "", size = "sm", className = '', buttonText = "Test", icon, onClick, disabled = false }) => {
    return <button type={type} className={`mf-btn btn ${size} ${variant} ${className}`} disabled={disabled} onClick={onClick}>
        {icon ? icon : <></>}
        {buttonText}
    </button>
}
export default BFButton