window.addEventListener("DOMContentLoaded", init);


function init() {

    const form = document.getElementById("contact-form");
    const formErrors = document.getElementById("form-errors");

    const name = document.getElementById("fullname");
    const email = document.getElementById("email");
    const comments = document.getElementById("comments");
    const emailRegEx = new RegExp(email.pattern);

    const maxCommentLength = parseInt(comments.getAttribute("maxlength"));

    const emailError = document.querySelector("input[type='email'] + output.error-output")
    const commentsError = document.querySelector("textarea + output.error-output")

    let formErrorsList = [];

    name.setCustomValidity("Name cannot be empty");

    name.addEventListener("input", (event) => {
        if(name.validity.valueMissing) {
            name.setCustomValidity("Name cannot be empty");
            formErrorsList.push({field:'name', message:"Name cannot be empty"})
        }
        else {
            name.setCustomValidity("");
        }
    });

    email.addEventListener("input", (event) => {
       
        if(!emailRegEx.test(email.value)) {
            email.setCustomValidity("Either missing a period or not formatted");
            formErrorsList.push({field:'email', message: "Either missing a period or not formatted"})

            email.style.outline = "solid 3px var(--error-red)"
            emailError.innerHTML = "Ensure you have valid characters and domain length";
            emailError.classList.remove('hidden');

            setTimeout(() => {
                emailError.classList.add('hidden');
            }, 1000); // hide after 1 seconds
        }
        else {
            email.setCustomValidity("");
            email.style.outline = "none"
            emailError.innerHTML = ""
        }
    });

    comments.addEventListener("input", (event) => {

        if(comments.validity.valueMissing) {
            comments.setCustomValidity("Comments must not be empty");
            formErrorsList.push({field:'comments', message: "Comments must not be empty"})

        }
        else {
            comments.setCustomValidity("");
        }

        const remainingChars = maxCommentLength - comments.value.length;
        if (remainingChars > 150) {
            comments.style.outline = "";
        }
        if (remainingChars <= 150) {
            comments.style.outline = "solid 3px var(--warning-yellow)";
        }
        if (remainingChars <= 50) {
            comments.style.outline = "solid 3px var(--error-red)";
        }
    
        commentsError.innerHTML = `Remaining characters: ${remainingChars}`;

    });




    form.addEventListener("submit", function (event) {
        if(!form.checkValidity()){
            event.preventDefault();
            form.reportValidity();
            return;
        }

        const formErrorsJSON = JSON.stringify(formErrorsList);
        formErrors.setAttribute("value", formErrorsJSON);

     });
    


}