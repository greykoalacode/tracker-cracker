import React from 'react'
import Modal from '../Modal/Modal'
import ChooseRoutine from './ChooseRoutine'

function RoutineCard() {
  return (
    <>
        <div className="banner-routine">
            <h3>Tired of adding each exercise to your schedule ?</h3>
            <button data-bs-toggle="modal"
              data-bs-target="#modal-add-routine" className="btn normalbtn">Import Routines</button>
        </div>
        <Modal
        id="modal-add-routine"
        title="Add Routine to your Schedule"
        content="Add Routine"
        contentClass="regbtn"
        isForm
        >
            <ChooseRoutine />
        </Modal>
    </>
  )
}

export default RoutineCard