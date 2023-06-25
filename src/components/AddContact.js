import React from 'react';
import $ from "jquery";
import { useNavigate } from "react-router-dom";

const AddContact = (props) => {

    const navigate = useNavigate();
    const gotoContactList = () => {
        navigate('/');
    }

    const uploadImage = (e) => {
        for (let file of e.target.files) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function () {
                document.getElementById("image-file").setAttribute("value", reader.result);
            }
        }
    }

    const saveContact = (e) => {
        e.preventDefault();
        let data = $(e.target).serializeArray();
        let files = document.getElementById("image-file").defaultValue;
        let obj = {}
        let contacts = [];
        data.map((data) => {
            return obj[data['name']] = data['value'];
        });
        obj['_id'] = Math.random().toString(36).slice(2, 7);
        obj['image'] = files;
        let oldContacts = localStorage.getItem('contacts');
        if (oldContacts === null) {
            contacts = JSON.stringify([obj]);
            localStorage.setItem('contacts', contacts);
        } else {
            contacts = [...JSON.parse(oldContacts)];

            contacts.push(JSON.stringify(obj));
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }
        navigate('/');
    }

    return (
        <div className="ui main mt-5">
            <form className="ui form segment" id="contact-form" method="post" onSubmit={saveContact}>
                <div className='float-right' style={{ float: "right" }}>
                    <i className="fa fa-list btn btn-outline-success" onClick={gotoContactList}></i>
                </div>
                <h3>Add Contact</h3>
                <div className="field">
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="John Doe" />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="example@gmail.com" />
                </div>
                <div className="field">
                    <label>Image</label>
                    <input type="file" id="image-file" name="image" placeholder="pi.jpeg" onChange={uploadImage} />
                </div>
                <div className="field">
                    <label>Phone number</label>
                    <div class="row">
                        <div class="col-2 field">
                            <input type="number" name="dial_code" placeholder="+91" />
                        </div>
                        <div class="col-10 field">
                            <input type="number" name="phone" maxLength={10} minLength={8} placeholder="9876543210" />
                        </div>
                    </div>
                </div>
                <button className="ui blue button" type="submit">Submit</button>

            </form>

        </div>
    );

}

export default AddContact;