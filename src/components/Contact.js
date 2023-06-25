import React from 'react'

const Contact = (props) => {
    let { _id, name, phone, email, dial_code, image } = props.contact;
    // console.log(props.contact.image);//
    if (image === "") {
        image = "https://semantic-ui.com/images/avatar2/large/kristy.png";
    }

    return (
        <div className="item mt-2">
            <div className="right floated content">
                {/* <div className="ui teal basic button">
                    <i className='fa fa-pen'></i>
                </div>  */}
                <i className="fa fa-times btn btn-outline-danger mt-3" onClick={props.deleteContact} data-id={_id}>
                </i>
            </div>
            <img className="ui avatar image" id="image-file" alt="profile_pic" src={image} />

            <div className="content">
                <span className="header"><h5>{name}</h5></span>
                <div className="description"><i className='fa fa-envelope text-danger'></i> : {email}</div>
                <div className="description"><i className='fa fa-phone text-primary'></i> : {dial_code} {phone}</div>
            </div>
        </div>
    );
}
export default Contact;