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
            
            resizePhotos(file, 1024);
        }
    }

    function resizePhotos(file, maxSize) {
        if (file.type.match(/image.*/)) {
            var reader = new FileReader();
            reader.onload = function (readerEvent) {
                var image = new Image();
                image.onload = function (imageEvent) {

                    var canvas = document.createElement("canvas"),
                        max_size = maxSize,
                        width = image.width,
                        height = image.height;
                    if (width > height) {
                        if (width > max_size) {
                            height *= max_size / width;
                            width = max_size;
                        }
                    } else {
                        if (height > max_size) {
                            width *= max_size / height;
                            height = max_size;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
                    var dataUrl = canvas.toDataURL("image/jpeg");
                    var resizedImage = dataURLToBlob(dataUrl);
                    console.log(dataUrl, resizedImage);
                    document.getElementById('image-file').setAttribute("src", dataUrl)
                }
            }
            reader.readAsDataURL(file);
        }
    };

    function dataURLToBlob(dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = parts[1];
    
            return new Blob([raw], {type: contentType});
        }
    
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
    
        var uInt8Array = new Uint8Array(rawLength);
    
        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
    
        return new Blob([uInt8Array], {type: contentType});
    }

    const saveContact = (e) => {
        e.preventDefault();
        let data = $(e.target).serializeArray();
        let files = document.getElementById("image-file").defaultValue;
        console.log(files);
        let obj = {}
        let contacts = [];
        data.map((data) => {
            return obj[data['name']] = data['value'];
        });
        obj['_id'] = Math.random().toString(36).slice(2, 7);
        obj['image'] = files;
        console.log(obj);
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