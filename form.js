window.addEventListener("DOMContentLoaded", init);


function init() {

    const form = document.getElementById("contact-form");
    const name = document.getElementById("fullname");
    const email = document.getElementById("email");
    const comments = document.getElementById("comments");
    const emailRegEx = new RegExp(email.pattern);

    const nameError = document.querySelector("input[type='text']:invalid + output.error-output")
    const emailError = document.querySelector("input[type='email']:invalid + output.error-output")

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
        console.log(event.target.value);
        if(email.validity.typeMismatch) {
            email.setCustomValidity("email is not properly formatted");
        }
      
        if(!emailRegEx.test(email.value)) {
            email.setCustomValidity("Either missing a period or not formatted");
            email.style = "outline: solid 3px var(--error-red)"
            emailError.innerHTML = "Ensure you have valid characters and domain length";
            emailError.classList.remove('hidden');

            setTimeout(() => {
                emailError.classList.add('hidden');
            }, 1000); // hide after 1 seconds
        }
        else {
            email.setCustomValidity("");
            email.style = "outline: none"
            emailError.innerHTML = ""
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
            form.reportValidity();
            // Trigger validation messages if the form is not valid
        }
        
    });
    


}