import { getUsers, saveUsers, saveSession } from "../storage.js";

const form = document.querySelector("[data-js='register-form']");
const emailInput = document.querySelector("[data-js='input-email']");
const passwordInput = document.querySelector("[data-js='input-password']");
const confirmPasswordInput = document.querySelector(
  "[data-js='input-confirm-password']",
);
const emailError = document.querySelector("[data-js='error-email']");
const passwordError = document.querySelector("[data-js='error-password']");
const confirmPasswordError = document.querySelector(
  "[data-js='error-confirm-password']",
);

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

const getInitials = (email) => {
  return email.split("@")[0].slice(0, 2).toUpperCase();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  clearError(emailError, emailInput);
  clearError(passwordError, passwordInput);
  clearError(confirmPasswordError, confirmPasswordInput);

  let isValid = true;

  if (!email) {
    showError(emailError, emailInput, "Email cannot be empty");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError(emailError, emailInput, "Invalid email format.");
    isValid = false;
  }

  if (!password) {
    showError(passwordError, passwordInput, "Password cannot be empty");
    isValid = false;
  } else if (password.length < 6) {
    showError(
      passwordError,
      passwordInput,
      "Password must be at least 6 characters",
    );
    isValid = false;
  }

  if (!confirmPassword) {
    showError(
      confirmPasswordError,
      confirmPasswordInput,
      "Password cannot be empty",
    );
    isValid = false;
  } else if (password !== confirmPassword) {
    showError(
      confirmPasswordError,
      confirmPasswordInput,
      "Passwords do not match",
    );
    isValid = false;
  }

  if (!isValid) return;

  const users = getUsers();
  const isEmailTaken = users.find((user) => user.email === email);

  if (isEmailTaken) {
    showError(emailError, emailInput, "User already exists!");
    return;
  }

  const newUser = {
    id: Date.now(),
    email,
    password,
    initials: getInitials(email),
    watchlist: [],
  };

  saveUsers([...users, newUser]);
  saveSession({
    id: newUser.id,
    email: newUser.email,
    initials: newUser.initials,
  });

  window.location.href = "../index.html";
});
