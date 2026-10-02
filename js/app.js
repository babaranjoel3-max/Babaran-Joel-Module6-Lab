function isValidStudentNumber(value) {
  return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}

function isValidPassword(value) {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!])[^\s]{8,}$/.test(value);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidMobileNumber(value) {
  return /^(09\d{9}|\+639\d{9})$/.test(value.trim());
}

function isValidFullName(value) {
  return value.trim().length >= 2;
}

if (typeof document !== "undefined") {
  const form = document.getElementById("registrationForm");

  const fullName = document.getElementById("fullName");
  const studentNumber = document.getElementById("studentNumber");
  const email = document.getElementById("email");
  const mobileNumber = document.getElementById("mobileNumber");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const course = document.getElementById("course");
  const terms = document.getElementById("terms");

  const successMessage = document.getElementById("successMessage");
  const registrationSummary = document.getElementById("registrationSummary");

  const summaryName = document.getElementById("summaryName");
  const summaryStudentNumber = document.getElementById("summaryStudentNumber");
  const summaryEmail = document.getElementById("summaryEmail");
  const summaryMobileNumber = document.getElementById("summaryMobileNumber");
  const summaryCourse = document.getElementById("summaryCourse");

  const passwordFeedback = document.getElementById("passwordFeedback");

  function setError(field, errorId, message) {
    const errorElement = document.getElementById(errorId);

    errorElement.textContent = message;

    if (message) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.setAttribute("aria-invalid", "false");
    }
  }

  function validateFullName() {
    const value = fullName.value.trim();

    if (!value) {
      setError(fullName, "fullNameError", "Full name is required.");
      return false;
    }

    if (value.length < 2) {
      setError(
        fullName,
        "fullNameError",
        "Full name must contain at least two characters."
      );
      return false;
    }

    setError(fullName, "fullNameError", "");
    return true;
  }

  function validateStudentNumber() {
    const value = studentNumber.value.trim();

    if (!value) {
      setError(
        studentNumber,
        "studentNumberError",
        "Student number is required."
      );
      return false;
    }

    if (!isValidStudentNumber(value)) {
      setError(
        studentNumber,
        "studentNumberError",
        "Enter a student number in the format 24-1234-123."
      );
      return false;
    }

    setError(studentNumber, "studentNumberError", "");
    return true;
  }

  function validateEmail() {
    const value = email.value.trim();

    if (!value) {
      setError(email, "emailError", "Email address is required.");
      return false;
    }

    if (!isValidEmail(value)) {
      setError(
        email,
        "emailError",
        "Enter a valid email address such as student@example.com."
      );
      return false;
    }

    setError(email, "emailError", "");
    return true;
  }

  function validateMobileNumber() {
    const value = mobileNumber.value.trim();

    if (!value) {
      setError(
        mobileNumber,
        "mobileNumberError",
        "Mobile number is required."
      );
      return false;
    }

    if (!isValidMobileNumber(value)) {
      setError(
        mobileNumber,
        "mobileNumberError",
        "Enter a mobile number beginning with 09 or +639 followed by nine digits."
      );
      return false;
    }

    setError(mobileNumber, "mobileNumberError", "");
    return true;
  }

  function validatePassword() {
    if (!password.value) {
      setError(password, "passwordError", "Password is required.");
      return false;
    }

    if (!isValidPassword(password.value)) {
      setError(
        password,
        "passwordError",
        "Password must be at least 8 characters, contain one uppercase letter, one digit, and one of @, $, or !, with no spaces."
      );
      return false;
    }

    setError(password, "passwordError", "");
    return true;
  }

  function validateConfirmPassword() {
    if (!confirmPassword.value) {
      setError(
        confirmPassword,
        "confirmPasswordError",
        "Please confirm your password."
      );
      return false;
    }

    if (confirmPassword.value !== password.value) {
      setError(
        confirmPassword,
        "confirmPasswordError",
        "Passwords do not match."
      );
      return false;
    }

    setError(confirmPassword, "confirmPasswordError", "");
    return true;
  }

  function validateCourse() {
    if (course.value !== "BSIT" && course.value !== "BSCS") {
      setError(
        course,
        "courseError",
        "Please select BSIT or BSCS."
      );
      return false;
    }

    setError(course, "courseError", "");
    return true;
  }

  function validateTerms() {
    if (!terms.checked) {
      setError(
        terms,
        "termsError",
        "You must agree to the terms and conditions."
      );
      return false;
    }

    setError(terms, "termsError", "");
    return true;
  }

  function updatePasswordFeedback() {
    if (!password.value) {
      passwordFeedback.textContent = "";
      return;
    }

    if (isValidPassword(password.value)) {
      passwordFeedback.textContent = "Password meets all requirements.";
      passwordFeedback.style.color = "#146c43";
    } else {
      passwordFeedback.textContent =
        "Password needs 8+ characters, an uppercase letter, a digit, and @, $, or !, with no spaces.";
      passwordFeedback.style.color = "#b00020";
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const validFullName = validateFullName();
    const validStudentNumber = validateStudentNumber();
    const validEmail = validateEmail();
    const validMobileNumber = validateMobileNumber();
    const validPassword = validatePassword();
    const validConfirmPassword = validateConfirmPassword();
    const validCourse = validateCourse();
    const validTerms = validateTerms();

    updatePasswordFeedback();

    const isValid =
      validFullName &&
      validStudentNumber &&
      validEmail &&
      validMobileNumber &&
      validPassword &&
      validConfirmPassword &&
      validCourse &&
      validTerms;

    if (!isValid) {
      successMessage.textContent = "";
      registrationSummary.hidden = true;
      return;
    }

    summaryName.textContent = fullName.value.trim();
    summaryStudentNumber.textContent = studentNumber.value.trim();
    summaryEmail.textContent = email.value.trim();
    summaryMobileNumber.textContent = mobileNumber.value.trim();
    summaryCourse.textContent = course.value;

    successMessage.textContent =
      "Registration details validated successfully!";

    registrationSummary.hidden = false;
  });

  password.addEventListener("input", function () {
    updatePasswordFeedback();
    validatePassword();

    if (confirmPassword.value) {
      validateConfirmPassword();
    }
  });

  fullName.addEventListener("blur", function () {
    validateFullName();
  });

  course.addEventListener("change", function () {
    validateCourse();
  });

  terms.addEventListener("change", function () {
    validateTerms();
  });

  studentNumber.addEventListener("blur", validateStudentNumber);
  email.addEventListener("blur", validateEmail);
  mobileNumber.addEventListener("blur", validateMobileNumber);
  confirmPassword.addEventListener("blur", validateConfirmPassword);

  form.addEventListener("reset", function () {
    setTimeout(function () {
      const fields = [
        fullName,
        studentNumber,
        email,
        mobileNumber,
        password,
        confirmPassword,
        course,
        terms
      ];

      fields.forEach(function (field) {
        field.setAttribute("aria-invalid", "false");
      });

      document.querySelectorAll(".error").forEach(function (error) {
        error.textContent = "";
      });

      passwordFeedback.textContent = "";
      successMessage.textContent = "";

      registrationSummary.hidden = true;

      summaryName.textContent = "";
      summaryStudentNumber.textContent = "";
      summaryEmail.textContent = "";
      summaryMobileNumber.textContent = "";
      summaryCourse.textContent = "";
    }, 0);
  });

  registrationSummary.hidden = true;
  successMessage.textContent = "";

  [
    fullName,
    studentNumber,
    email,
    mobileNumber,
    password,
    confirmPassword,
    course,
    terms
  ].forEach(function (field) {
    field.setAttribute("aria-invalid", "false");
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isValidStudentNumber,
    isValidPassword
  };
}
