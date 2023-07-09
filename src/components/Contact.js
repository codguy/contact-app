import React from 'react'
import ContactModal from './ContactModal';

const Contact = (props) => {
    let { _id, name, phone, email, dial_code, image } = props.contact;
    if (image === "") {
        image = "https://semantic-ui.com/images/avatar2/large/kristy.png";
    }

    return (
        <div className="item mt-2">
            <div className="right floated content">
                <i className='fa fa-pen btn btn-outline-warning mt-3 mr-3' style={{marginRight: 6 + "px"}} onClick={props.editContact}></i>
                <i className="fa fa-times btn btn-outline-danger mt-3" onClick={props.deleteContact} data-id={_id}>
                </i>
            </div>
            <img className="ui avatar image" style={{height:50+"px", width:50+"px"}} alt="profile_pic" src={image}  onClick={props.contactModal} />

            <div className="content" onClick={props.contactModal}>
                <span className="header"><h5>{name}</h5></span>
                <div className="description"><i className='fa fa-envelope text-danger'></i> : {email}</div>
                <div className="description"><i className='fa fa-phone text-primary'></i> : {dial_code} {phone}</div>
            </div>
        </div>
    );
}
export default Contact;