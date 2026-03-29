import { getUsers, saveSession } from "../storage.js";

const form = document.querySelector("[data-js='login-form']");
const emailInput = document.querySelector("[data-js='input-email']");
const passwordInput = document.querySelector("[data-js='input-password']");
const emailError = document.querySelector("[data-js='error-email']");
const passwordError = document.querySelector("[data-js='error-password']");

const showError = (element, input, message) => {
  element.textContent = message;
  input.setAttribute("aria-invalid", "true");
};

const clearError = (element, input) => {
  element.textContent = "";
  input.setAttribute("aria-invalid", "false");
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  clearError(emailError, emailInput);
  clearError(passwordError, passwordInput);

  let isValid = true;

  if (!email) {
    showError(emailError, emailInput, "Email cannot be empty");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError(emailError, emailInput, "Invalid email format");
    isValid = false;
  }

  if (!password) {
    showError(passwordError, passwordInput, "Password cannot be empty");
    isValid = false;
  }

  if (!isValid) return;

  const users = getUsers();
  const user = users.find((user) => user.email === email);

  if (!user) {
    showError(emailError, emailInput, "Email not found");
    return;
  }

  if (user.password !== password) {
    showError(passwordError, passwordInput, "Incorrect Email or Password");
    return;
  }

  saveSession({ id: user.id, email: user.email, initials: user.initials });

  window.location.href = "../index.html";
});
