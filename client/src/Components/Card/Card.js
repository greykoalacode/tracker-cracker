import React from "react";

const Card = ({children, title, props}) => {
    return (
        <div className={`card shadow p-3 ${props}`}  style={{ minWidth: '240px', backgroundColor: '#242424', color: '#CCAFA5'}} >
            {/* , backgroundColor: '#C6DDF0' '#2A2B2A' '#242424', */}
            <h1 className="fw-bold mb-0">{title}</h1>
            {children}
        </div>
    )
};

export default Card;