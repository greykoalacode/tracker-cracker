import React from 'react'

function Loading() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh"}}>
        <p className="h1 my-5">Tracker getting ready ...</p>
        <div className="spinner-border" style={{width: "8rem", height: "8rem", borderWidth: "0.5rem"}} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default Loading