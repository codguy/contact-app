import React from 'react'

const Contact = (props) => {
    let { _id, name, phone, email, dial_code, image } = props.contact;
    // console.log(props.contact.image);//
    if (image === undefined) {
        image = "https://semantic-ui.com/images/avatar2/large/kristy.png";
    } else {
        // image = new File([image], "Download.png", { type: "image/png" });
        // console.log(file);
        
        // console.log(createObjectURL(image));
        // var urlCreator = window.URL || window.webkitURL;
        // var imageUrl = urlCreator.createObjectURL(image);
        // console.log(imageUrl);
        // document.querySelector("#image").src = imageUrl;
    }

    function createObjectURL ( file ) {
        if ( window.webkitURL ) {
            return window.webkitURL.createObjectURL( file );
        } else if ( window.URL && window.URL.createObjectURL ) {
            return window.URL.createObjectURL( file );
        } else {
            return null;
        }
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

            <div class="content">
                <span class="header"><h5>{name}</h5></span>
                <div class="description"><i className='fa fa-envelope text-danger'></i> : {email}</div>
                <div class="description"><i className='fa fa-phone text-primary'></i> : {dial_code} {phone}</div>
            </div>
        </div>
    );
}
export default Contact;