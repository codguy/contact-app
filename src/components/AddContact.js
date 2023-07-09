import React from 'react';
import $ from "jquery";
import { useNavigate, useParams } from "react-router-dom";

const AddContact = (props) => {
    const searchParam = useParams();
    const navigate = useNavigate();
    const gotoContactList = () => {
        navigate('/');
    }
    var image = "https://semantic-ui.com/images/avatar2/large/kristy.png";

    let contactJSON = localStorage.getItem('contacts');
    let contacts = [];
    if (contactJSON !== null) {
        let contactArray = JSON.parse(contactJSON);
        if (contactArray.length > 0) {
            contacts = contactArray.map((contact) => {
                if (typeof contact === 'string') {
                    return JSON.parse(contact);
                }
                return contact;
            });
            contacts.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        }
    }

    $(document).ready(() => {
        if (JSON.stringify(searchParam) !== '{}') {
            let contact = contacts.find((data) => {
                if (data._id === searchParam.id) {
                    return true;
                }
            });
            $("#contact-form input[name='name']").val(contact.name);
            $("#contact-form input[name='email']").val(contact.email);
            $("#contact-form input[name='dial_code']").val(contact.dial_code);
            $("#contact-form input[name='phone']").val(contact.phone);
            $("#contact-form input[name='_id']").val(contact._id);
            $(".avatar").attr("src", contact.image);
            document.getElementById("image-file").setAttribute("value", contact.image);
        }
    });

    const uploadImage = (e) => {
        for (let file of e.target.files) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function () {
                $(".avatar").attr("src", reader.result);
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
        if(document.getElementById("contact-id").value.length == 0) {
            obj['_id'] = Math.random().toString(36).slice(2, 7);
        }
        obj['image'] = files;
        let oldContacts = localStorage.getItem('contacts');
        if (oldContacts === null) {
            contacts = JSON.stringify([obj]);
            localStorage.setItem('contacts', contacts);
        } else {
            contacts = [...JSON.parse(oldContacts)];
            contacts = contacts.filter(item => {
                if(typeof item === 'string'){
                    item = JSON.parse(item);
                }
                return (item._id !== document.getElementById("contact-id").value);
            });
            contacts.push(JSON.stringify(obj));
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }
        navigate('/');
    }

    const selectFile = () => {
        $('#image-file').trigger('click');
    }

    return (
        <div className="ui main mt-5">
            <form className="ui form segment p-4" id="contact-form" method="post" onSubmit={saveContact}>
                <div className='float-right' style={{ float: "right" }}>
                    <i className="fa fa-list btn btn-outline-success" onClick={gotoContactList}></i>
                </div>
                <h3>Add Contact</h3>
                <input type="hidden" name="_id" id="contact-id" />
                <div className="row">
                    <div className="col-2">
                        <div className="field">
                            <img src={image} height={120} width={120} className="rounded mx-auto d-block m-3 avatar" onClick={selectFile} />
                            <input type="file" id="image-file" className="d-none" name="image" placeholder="pi.jpeg" onChange={uploadImage} />
                        </div>
                    </div>
                    <div className="col-10">
                        <div className="field">
                            <label>Full Name</label>
                            <input type="text" name="name" placeholder="John Doe" />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input type="email" name="email" placeholder="example@gmail.com" />
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>Phone number</label>
                    <div className="row">
                        <div className="col-2 field">
                            <input type="number" name="dial_code" placeholder="+91" />
                        </div>
                        <div className="col-10 field">
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