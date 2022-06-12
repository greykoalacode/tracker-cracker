import React from 'react'
import NoTasksSVG from '../../Assets/NoTasksSVG'

function NoDashComponent({content}) {
  return (
    <div className="d-flex p-3 flex-column align-items-center">
          <NoTasksSVG height="20vh" />
          <h2 className="fw-light mt-3">{`No ${content} yet`}</h2>
        </div>
  )
}

export default NoDashComponent