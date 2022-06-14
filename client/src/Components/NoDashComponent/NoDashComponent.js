import React from 'react'
import NoTasksSVG from '../../Assets/NoTasksSVG'

function NoDashComponent({content}) {
  return (
    <div className="d-flex p-3 flex-column align-items-center">
          <NoTasksSVG height="20vh" />
          <h3 className="fw-bold fst-italic mt-3">{`No ${content} yet`}</h3>
        </div>
  )
}

export default NoDashComponent