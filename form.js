window.addEventListener("DOMContentLoaded", init);


function init() {

    const form = document.getElementById("contact-form");
    const name = document.getElementById("fullname");
    const email = document.getElementById("email");
    const comments = document.getElementById("comments");

    const nameError = document.querySelector("input[type='text']:invalid + output.error-output")

    name.setCustomValidity("Name cannot be empty");

    name.addEventListener("input", (event) => {
        if(name.validity.valueMissing) {
            name.setCustomValidity("Name cannot be empty");
        }
        else {
            name.setCustomValidity("");
        }
    });

    email.addEventListener("input", (event) => {
        if(email.validity.valid) {
            email.setCustomValidity("email is not properly formatted");
            console.log("invalid")

        }
        else {
            email.setCustomValidity("");
            console.log("valid")
        }
    });

    comments.addEventListener("input", (event) => {
        if(comments.validity.valueMissing) {
            comments.setCustomValidity("please fill out the comments");
        }
        else {
            comments.setCustomValidity("");
        }
    });

    form.addEventListener("submit", function (event) {
        if(!form.checkValidity()){
            event.preventDefault();
            // Trigger validation messages if the form is not valid
        }
        
    });
    


}