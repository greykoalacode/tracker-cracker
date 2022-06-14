import React from "react";
import data from "../../data";
import BannerCard from "../BannerCard/BannerCard";

function EntryBanner() {
  const { bannerContent } = data;
  return (
    <div
      className="my-4 alert alert-dismissible banner-entry fade show"
      role="alert"
    >
      <div className="align-items-center">
        <h2 className="m-0">How to get started ? 🚀</h2>
        <button
          type="button"
          className="btn-close btn-close-white close"
          data-bs-dismiss="alert"
          aria-label="Close"
        />
      </div>
      <div className="row">
        {bannerContent.map((each) => (
          <BannerCard key={each.emoji} eachBanner={each} />
        ))}
      </div>
    </div>
  );
}

export default EntryBanner;
