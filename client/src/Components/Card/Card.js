import React from "react";

const Card = ({children, title, props}) => {
    return (
        <div className={`card shadow p-3 mx-2 ${props}`}  style={{ width: 'auto', minWidth:'280px', backgroundColor: '#242424', color: '#CCAFA5'}} >
            {/* , backgroundColor: '#C6DDF0' '#2A2B2A' */}
            <h1 className="fw-bold">{title}</h1>
            {children}
        </div>
    )
};

export default Card;