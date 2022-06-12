import React from "react";

const Modal = ({
  title,
  children,
  onClick,
  content,
  contentClass,
  id,
  isForm = false,
}) => {
  return (
    <div
      className="modal fade text-dark"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content text-light bg-dark">
          <div className="modal-header border-0">
            <h5 className="modal-title" id={`${id}Label`}>
              {title}
            </h5>
            <button
              type="button close"
              aria-label="Close"
              className="btn btn-close btn-close-white"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-body">{children}</div>
          {!isForm && (
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                className={`btn ${contentClass}`}
                data-bs-dismiss="modal"
                onClick={onClick}
              >
                {content}
              </button>
              {/* <button type={isForm ? "submit": "button"} className={`btn ${contentClass}`} {isForm && onClick={!isForm && onClick}>{content}</button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
