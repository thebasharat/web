document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const form = event.target;
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
  

    if (emailInput.value && !emailInput.value.endsWith('.com')) {
      emailInput.setCustomValidity('Only .com emails are allowed.');
      emailError.textContent = "Please enter a valid .com email address.";
    } else {

      emailInput.setCustomValidity(''); 
    }
    
  
    if (emailInput.validity.typeMismatch) {
      emailError.textContent = "Please enter a valid email address.";
    } else if (emailInput.validity.valueMissing) {
      emailError.textContent = "Email address is required.";
    }
  
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      document.getElementById('successMessage').classList.add('d-none');
      return;
    }
  
    form.classList.remove('was-validated');
  
    const name = document.getElementById('name').value;
    const email = emailInput.value;
    const age = document.getElementById('age').value;
  
    const successDataText = `<strong>Name:</strong> ${name} | <strong>Email:</strong> ${email} | <strong>Age:</strong> ${age}`;
    document.getElementById('successData').innerHTML = successDataText;
  
    document.getElementById('successMessage').classList.remove('d-none');
  
    form.reset();
  });
  