import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ContactModal = (props) => {
    const state = props.state;
    const data = props.state.data;
    const openModal = props.openModal;
    const closeModal = props.closeModal;

    // console.log(state, openModal, closeModal, data);

    const GetData = () => {
        console.log(data);
        if (data != undefined) {
            return (
                <div className="item mt-2">
                    <img className="ui avatar image" id="image-file" alt="profile_pic" src={data.image} />

                    <div className="content">
                        <span className="header"><h5>{data.name}</h5></span>
                        <div className="description"><i className='fa fa-envelope text-danger'></i> : {data.email}</div>
                        <div className="description"><i className='fa fa-phone text-primary'></i> : {data.dial_code} {data.phone}</div>
                    </div>
                </div>
            )
        }
    }
    return (
        <>
            <Button variant="primary" onClick={openModal}>
                Launch demo modal
            </Button>
            <Modal show={state.isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GetData />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ContactModal;