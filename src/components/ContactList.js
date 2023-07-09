import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Contact from './Contact';
import ContactModal from './ContactModal';
// import $ from 'jquery';
import 'bootstrap';

const ContactList = (props) => {
    let contactJSON = localStorage.getItem('contacts');
    let contacts = [];
    const navigate = useNavigate();
    if (contactJSON !== null) {
        let contactArray = JSON.parse(contactJSON);
        if (contactArray.length > 0) {
            contacts = contactArray.map((contact) => {
                if (typeof contact === 'string') {
                    return JSON.parse(contact);
                }
                return contact;
            });
            // INFO: sorting the contacts
            contacts.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        }


    }
    
    const [state, setState] = useState({ isOpen: false });
    const openModal = () => setState({ isOpen: true });
    const closeModal = () => setState({ isOpen: false });

    const contactModal = (contact) => {
        setState({ isOpen: true, data: contact });
    }

    const allContacts = contacts.map(
        (contact) => {
            return (
                <Contact contact={contact} key={contact._id} deleteContact={deleteContact} contactModal={(event) => contactModal(contact)} editContact={(event) => editContact(contact)} />
            );
        }
    );

    function deleteContact(e) {
        let id = e.target.attributes['data-id'].value;

        contacts = contacts.filter(item => item._id !== id);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        navigate("/");
    }

    function editContact(e) {
        navigate("update/" + e._id);
    }

    const addContactForm = () => {
        navigate("/add");
    }

    function deleteAllContacts(e) {
        localStorage.clear();
        localStorage.setItem('contacts', JSON.stringify([]));
        window.location.reload();
    }
    return (
        <>
            <div className="ui middle aligned divided list segment p-4 mt-5" id="Contact-list">
                <div className='float-right' style={{ float: "right" }}>

                    <i className="fa fa-plus btn btn-outline-primary" onClick={addContactForm} style={{ marginRight: 6 + "px" }}></i>
                    <i className="fa fa-times btn btn-danger" onClick={deleteAllContacts}></i>
                </div>
                <h2>Contacts</h2>
                {allContacts}
            </div >
            <ContactModal state={state} openModal={openModal} closeModal={closeModal} />
        </>
    );
}

export default ContactList;
