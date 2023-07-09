import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ContactModal = (props) => {
    const state = props.state;
    const data = props.state.data;
    // const openModal = props.openModal;
    const closeModal = props.closeModal;
    const GetData = () => {
        if (data !== undefined) {
            return (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>{data.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="card">
                            <img className="card-img-top" src={data.image} alt="Card image cap" />
                            <div className="card-body">
                                <p className="card-text"><i className='fa fa-envelope text-danger'></i> : {data.email}</p>
                                <p className="card-text"><i className='fa fa-phone text-primary'></i> : {data.dial_code} {data.phone}</p>
                            </div>
                        </div>
                    </Modal.Body>
                </>
            )
        }
    }
    return (
        <>
            <Modal show={state.isOpen} onHide={closeModal}>
                <GetData />
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ContactModal;