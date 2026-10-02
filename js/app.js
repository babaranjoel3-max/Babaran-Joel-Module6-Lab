var STUDENT_NUMBER_PATTERN = /^\d{2}-\d{4}-\d{3}$/;
var EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+\.[^\s@.]+$/;
var MOBILE_PATTERN = /^(09\d{9}|\+639\d{9})$/;
var PASSWORD_PATTERN = /^(?=\S{8,}$)(?=.*[A-Z])(?=.*\d)(?=.*[@$!]).*$/;

function isValidStudentNumber(value) {
  return typeof value === "string" && STUDENT_NUMBER_PATTERN.test(value.trim());
}

function isValidPassword(value) {
  return typeof value === "string" && PASSWORD_PATTERN.test(value);
}

function isValidFullName(value) {
  return typeof value === "string" && value.trim().length >= 2;
}

function isValidEmail(value) {
  return typeof value === "string" && EMAIL_PATTERN.test(value.trim());
}

function isValidMobileNumber(value) {
  return typeof value === "string" && MOBILE_PATTERN.test(value.trim());
}

if (typeof document !== "undefined") {
  (function () {
    var form = document.getElementById("registrationForm");

    if (!form) {
      return;
    }

    var fullName = document.getElementById("fullName");
    var studentNumber = document.getElementById("studentNumber");
    var email = document.getElementById("email");
    var mobileNumber = document.getElementById("mobileNumber");
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");
    var course = document.getElementById("course");
    var terms = document.getElementById("terms");

    var fullNameError = document.getElementById("fullNameError");
    var studentNumberError = document.getElementById("studentNumberError");
    var emailError = document.getElementById("emailError");
    var mobileNumberError = document.getElementById("mobileNumberError");
    var passwordError = document.getElementById("passwordError");
    var confirmPasswordError = document.getElementById("confirmPasswordError");
    var courseError = document.getElementById("courseError");
    var termsError = document.getElementById("termsError");

    var passwordFeedback = document.getElementById("passwordFeedback");
    var successMessage = document.getElementById("successMessage");
    var registrationSummary = document.getElementById("registrationSummary");

    var summaryName = document.getElementById("summaryName");
    var summaryStudentNumber = document.getElementById("summaryStudentNumber");
    var summaryEmail = document.getElementById("summaryEmail");
    var summaryMobileNumber = document.getElementById("summaryMobileNumber");
    var summaryCourse = document.getElementById("summaryCourse");

    function setFieldError(field, errorElement, message) {
      errorElement.textContent = message;
      field.setAttribute("aria-invalid", message ? "true" : "false");
      return message === "";
    }

    function validateFullName() {
      var value = fullName.value.trim();

      if (value === "") {
        return setFieldError(fullName, fullNameError, "Enter your full name.");
      }

      if (value.length < 2) {
        return setFieldError(fullName, fullNameError, "Full name must have at least two characters.");
      }

      return setFieldError(fullName, fullNameError, "");
    }

    function validateStudentNumber() {
      var value = studentNumber.value.trim();

      if (value === "") {
        return setFieldError(studentNumber, studentNumberError, "Enter your student number.");
      }

      if (!isValidStudentNumber(value)) {
        return setFieldError(studentNumber, studentNumberError, "Enter a student number in the format 24-1234-123.");
      }

      return setFieldError(studentNumber, studentNumberError, "");
    }

    function validateEmail() {
      var value = email.value.trim();

      if (value === "") {
        return setFieldError(email, emailError, "Enter your email address.");
      }

      if (!isValidEmail(value)) {
        return setFieldError(email, emailError, "Enter a valid email address.");
      }

      return setFieldError(email, emailError, "");
    }

    function validateMobileNumber() {
      var value = mobileNumber.value.trim();

      if (value === "") {
        return setFieldError(mobileNumber, mobileNumberError, "Enter your mobile number.");
      }

      if (!isValidMobileNumber(value)) {
        return setFieldError(
          mobileNumber,
          mobileNumberError,
          "Enter 09XXXXXXXXX or +639XXXXXXXXX without spaces or hyphens."
        );
      }

      return setFieldError(mobileNumber, mobileNumberError, "");
    }

    function validatePassword() {
      var value = password.value;

      if (value === "") {
        return setFieldError(password, passwordError, "Enter a password.");
      }

      if (!isValidPassword(value)) {
        return setFieldError(
          password,
          passwordError,
          "Password must be at least 8 characters with one uppercase letter, one digit, and one of @, $, or !, with no spaces."
        );
      }

      return setFieldError(password, passwordError, "");
    }

    function validateConfirmPassword() {
      var value = confirmPassword.value;

      if (value === "") {
        return setFieldError(confirmPassword, confirmPasswordError, "Confirm your password.");
      }

      if (value !== password.value) {
        return setFieldError(confirmPassword, confirmPasswordError, "Passwords do not match.");
      }

      return setFieldError(confirmPassword, confirmPasswordError, "");
    }

    function validateCourse() {
      if (course.value !== "BSIT" && course.value !== "BSCS") {
        return setFieldError(course, courseError, "Select BSIT or BSCS as your course.");
      }

      return setFieldError(course, courseError, "");
    }

    function validateTerms() {
      if (!terms.checked) {
        return setFieldError(terms, termsError, "You must agree to the terms to register.");
      }

      return setFieldError(terms, termsError, "");
    }

    function updatePasswordFeedback() {
      var value = password.value;

      if (value === "") {
        passwordFeedback.textContent = "";
        passwordFeedback.className = "feedback";
        return;
      }

      if (isValidPassword(value)) {
        passwordFeedback.textContent = "Password meets all the rules.";
        passwordFeedback.className = "feedback ok";
      } else {
        passwordFeedback.textContent = "Password does not meet all the required rules.";
        passwordFeedback.className = "feedback bad";
      }
    }

    function clearSummary() {
      successMessage.textContent = "";
      successMessage.hidden = true;

      registrationSummary.hidden = true;

      summaryName.textContent = "";
      summaryStudentNumber.textContent = "";
      summaryEmail.textContent = "";
      summaryMobileNumber.textContent = "";
      summaryCourse.textContent = "";
    }

    function showSummary() {
      summaryName.textContent = fullName.value.trim();
      summaryStudentNumber.textContent = studentNumber.value.trim();
      summaryEmail.textContent = email.value.trim();
      summaryMobileNumber.textContent = mobileNumber.value.trim();
      summaryCourse.textContent = course.value;

      successMessage.textContent = "Registration details validated successfully!";
      successMessage.hidden = false;
      registrationSummary.hidden = false;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var valid = true;

      if (!validateFullName()) valid = false;
      if (!validateStudentNumber()) valid = false;
      if (!validateEmail()) valid = false;
      if (!validateMobileNumber()) valid = false;
      if (!validatePassword()) valid = false;
      if (!validateConfirmPassword()) valid = false;
      if (!validateCourse()) valid = false;
      if (!validateTerms()) valid = false;

      if (valid) {
        showSummary();
      } else {
        clearSummary();

        var invalidFields = [
          fullName,
          studentNumber,
          email,
          mobileNumber,
          password,
          confirmPassword,
          course,
          terms
        ];

        for (var i = 0; i < invalidFields.length; i++) {
          if (invalidFields[i].getAttribute("aria-invalid") === "true") {
            invalidFields[i].focus();
            break;
          }
        }
      }
    });

    fullName.addEventListener("blur", validateFullName);

    password.addEventListener("input", function () {
      updatePasswordFeedback();

      if (password.getAttribute("aria-invalid") === "true") {
        validatePassword();
      }

      if (
        confirmPassword.value !== "" ||
        confirmPassword.getAttribute("aria-invalid") === "true"
      ) {
        validateConfirmPassword();
      }
    });

    studentNumber.addEventListener("input", function () {
      if (studentNumber.getAttribute("aria-invalid") === "true") {
        validateStudentNumber();
      }
    });

    email.addEventListener("input", function () {
      if (email.getAttribute("aria-invalid") === "true") {
        validateEmail();
      }
    });

    mobileNumber.addEventListener("input", function () {
      if (mobileNumber.getAttribute("aria-invalid") === "true") {
        validateMobileNumber();
      }
    });

    confirmPassword.addEventListener("input", function () {
      if (confirmPassword.getAttribute("aria-invalid") === "true") {
        validateConfirmPassword();
      }
    });

    course.addEventListener("change", validateCourse);

    terms.addEventListener("change", validateTerms);

    form.addEventListener("reset", function () {
      fullNameError.textContent = "";
      studentNumberError.textContent = "";
      emailError.textContent = "";
      mobileNumberError.textContent = "";
      passwordError.textContent = "";
      confirmPasswordError.textContent = "";
      courseError.textContent = "";
      termsError.textContent = "";

      fullName.setAttribute("aria-invalid", "false");
      studentNumber.setAttribute("aria-invalid", "false");
      email.setAttribute("aria-invalid", "false");
      mobileNumber.setAttribute("aria-invalid", "false");
      password.setAttribute("aria-invalid", "false");
      confirmPassword.setAttribute("aria-invalid", "false");
      course.setAttribute("aria-invalid", "false");
      terms.setAttribute("aria-invalid", "false");

      passwordFeedback.textContent = "";
      passwordFeedback.className = "feedback";

      clearSummary();
    });
  })();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isValidStudentNumber: isValidStudentNumber,
    isValidPassword: isValidPassword
  };
}