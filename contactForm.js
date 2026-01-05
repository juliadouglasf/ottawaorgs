// Listen for the submit button
// document.getElementById('submit-btn').addEventListener("click", sendMessage());
const contact_form = document.getElementById('contact-form');

contact_form.addEventListener("submit", (e) => {
  e.preventDefault();

  sendMessage();
});

//document.getElementById('submit-btn').addEventListener("click", sendMessage);

function sendMessage() {

  console.log("sendMessage.js activated");

  // Get contact info
  let name_value = document.getElementById('name-input').value.trim();
  let email_value = document.getElementById('email-input').value.trim();
  let message_value = document.getElementById('message-input').value.trim();

  // Determine date & time
  let date = String(new Date());
  console.log("name:", name_value);
  console.log("email:", email_value);
  console.log("message:", message_value);
  console.log("date:", date);

  var emailParams = {
    name: name_value,
    time: date,
    message: message_value,
    email: email_value,
  };

  console.log("emailParams:", emailParams);
  console.log(JSON.stringify(emailParams));

  emailjs.init({
    publicKey: 'FTq6C-ZWXjQJuXRYu'
  })

  // Send the message via email
  console.log("sending message");


  emailjs.send('ottawa_orgs', 'contact_form', {
    name: name_value,
    time: date,
    message: message_value,
    email: email_value
  });
  
};