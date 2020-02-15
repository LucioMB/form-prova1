import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToriiGate } from "@fortawesome/free-solid-svg-icons";

export function Loading({ text, onClick, loading }) {
    return (
        <button onClick={onClick} disabled={loading ? "disabled" : undefined}>
            {loading ? <FontAwesomeIcon icon={faToriiGate} /> : undefined}
            {text}
        </button>
    );
}
