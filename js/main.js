const signUp = document.querySelector(".sign-up");
const logIn = document.querySelector(".sign-in");
const registerLink = document.querySelector("#register");
const loginLink = document.querySelector("#login");
let createAccountBtn = document.querySelector("#create-account");
let loginBtn = document.querySelector("#signIn")
let closeButton = document.querySelector(".close-btn")
let overlayDiv = document.querySelector(".overlay");
let popupDiv = document.querySelector(".popup");
let text = document.querySelector(".popup p");

// Initialize user array from localStorage or create an empty array
let users = JSON.parse(localStorage.getItem("users")) || [];

//Regular Experssion for  password
let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/;

//Regular Experssion for email 
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;




// Swap between Sign in and Sign Up form
registerLink.addEventListener("click", (event) => {
  signUp.classList.remove("back");
  logIn.classList.remove("front");
  signUp.classList.add("front");
  logIn.classList.add("back");
});

loginLink.addEventListener("click", (event) => {
  signUp.classList.remove("front");
  logIn.classList.remove("back");
  signUp.classList.add("back");
  logIn.classList.add("front");
});



// Creat Account Form
createAccountBtn.addEventListener("click", function (event) {
  let fullName = document.getElementById("fullname").value;
  let emailAddress = document.getElementById("email-address").value;
  let newPassword = document.getElementById("newpassword").value;
  let confirmPassword = document.getElementById("confirmpass").value;
  let agreeTerms = document.getElementById("agree-box").checked;

  if (
    fullName === "" ||
    emailAddress === "" ||
    newPassword === "" ||
    confirmPassword === ""
  ) {
    event.preventDefault();
    appearAlert("Please fill out all fields");
    resetSignUpInput();
  }
  else if (!regex.test(newPassword)) {
    event.preventDefault();
    appearAlert("Password must be at least 10 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
    resetSignUpInput();
}

   else if (newPassword !== confirmPassword) {
       event.preventDefault();
       appearAlert("Password does not match");
       resetSignUpInput();
  }

  else if (!agreeTerms) {
     event.preventDefault();
    appearAlert("Please agree to the terms & conditions.");
    resetSignUpInput();
  }

  else{
    let user = {
        fullName: fullName,
        email: emailAddress,
        password: newPassword,
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      appearAlert("Account created successfully!");
      resetSignUpInput();
  }
});

// close popup when click the button close
closeButton.addEventListener("click",()=> {
    popupDiv.style.display = "none";
    overlayDiv.style.display = "none";
});

// Appear Alert
function appearAlert(Msg){
    text.innerHTML = Msg;
    overlayDiv.style.display = "block";
    popupDiv.style.display = "block";
}
//Reset Input Fileds
function resetSignUpInput(){
    document.getElementById("fullname").value = "";
    document.getElementById("email-address").value = "";
    document.getElementById("newpassword").value = "";
    document.getElementById("confirmpass").value = "";
    document.getElementById("agree-box").checked = false;
}


// Login 
loginBtn.addEventListener("click",function(ele){
    ele.preventDefault();
   

    // Get entered values
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let authenticatedUser = users.find(user => user.email === email && user.password === password);
    if(authenticatedUser){
        appearAlert(`Login successful! Welcome, ${authenticatedUser.fullName}`);
    }
    else{
        appearAlert("Invalid email or password. Please try again.");
    }
});


// Show & Hide  The Password
document.querySelectorAll(".lock").forEach(lockIcon => {
    lockIcon.addEventListener("click", function() {
        // Find the sibling input field
        let passwordInput = this.nextElementSibling;

        // Check if the next sibling is an input and toggle its type
        if (passwordInput && passwordInput.tagName.toLowerCase() === "input" && passwordInput.type === "password") {
            passwordInput.type = "text"; // Show password
        } else {
            passwordInput.type = "password"; // Hide password
        }
    });
});

console.log(users)

