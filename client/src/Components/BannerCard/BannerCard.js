import React from 'react'

function BannerCard({eachBanner}) {
  return (
    <div className="col align-self-start banner-entry-card">
        <div className="d-flex align-items-center gap-2">
            <span className="fs-2">{eachBanner.emoji}</span>
            <p className="fw-bold fs-4 m-0">{eachBanner.title}</p>
        </div>
        <p className="m-0 mt-2">{eachBanner.content}</p>
    </div>
  )
}

export default BannerCard