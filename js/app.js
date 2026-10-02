var STUDENT_NUMBER_PATTERN = /^\d{2}-\d{4}-\d{3}$/;
var EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
var MOBILE_PATTERN = /^(09|\+639)\d{9}$/;
var PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!])\S{8,}$/;

function isValidStudentNumber(value) {
  if (typeof value !== "string") {
    return false;
  }

  return STUDENT_NUMBER_PATTERN.test(value.trim());
}

function isValidPassword(value) {
  if (typeof value !== "string") {
    return false;
  }

  return PASSWORD_PATTERN.test(value);
}

if (typeof document !== "undefined") {
  var form = document.getElementById("registrationForm");

  if (form) {
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

    function error(field, box, message) {
      box.textContent = message;
      field.setAttribute("aria-invalid", message ? "true" : "false");
      return message === "";
    }

    function checkFullName() {
      var value = fullName.value.trim();

      if (value === "") {
        return error(fullName, fullNameError, "Enter your full name.");
      }

      if (value.length < 2) {
        return error(fullName, fullNameError, "Full name must have at least two characters.");
      }

      return error(fullName, fullNameError, "");
    }

    function checkStudentNumber() {
      var value = studentNumber.value.trim();

      if (value === "") {
        return error(studentNumber, studentNumberError, "Enter your student number.");
      }

      if (!isValidStudentNumber(value)) {
        return error(
          studentNumber,
          studentNumberError,
          "Enter a student number in the format 24-1234-123."
        );
      }

      return error(studentNumber, studentNumberError, "");
    }

    function checkEmail() {
      var value = email.value.trim();

      if (value === "") {
        return error(email, emailError, "Enter your email address.");
      }

      if (!EMAIL_PATTERN.test(value)) {
        return error(email, emailError, "Enter a valid email address.");
      }

      return error(email, emailError, "");
    }

    function checkMobile() {
      var value = mobileNumber.value.trim();

      if (value === "") {
        return error(mobileNumber, mobileNumberError, "Enter your mobile number.");
      }

      if (!MOBILE_PATTERN.test(value)) {
        return error(
          mobileNumber,
          mobileNumberError,
          "Enter 09XXXXXXXXX or +639XXXXXXXXX without spaces or hyphens."
        );
      }

      return error(mobileNumber, mobileNumberError, "");
    }

    function checkPassword() {
      var value = password.value;

      if (value === "") {
        return error(password, passwordError, "Enter a password.");
      }

      if (!isValidPassword(value)) {
        return error(
          password,
          passwordError,
          "Password must be at least 8 characters, contain one uppercase letter, one digit, and one of @, $, or !, with no spaces."
        );
      }

      return error(password, passwordError, "");
    }

    function checkConfirmPassword() {
      var value = confirmPassword.value;

      if (value === "") {
        return error(
          confirmPassword,
          confirmPasswordError,
          "Confirm your password."
        );
      }

      if (value !== password.value) {
        return error(
          confirmPassword,
          confirmPasswordError,
          "Passwords do not match."
        );
      }

      return error(confirmPassword, confirmPasswordError, "");
    }

    function checkCourse() {
      if (course.value !== "BSIT" && course.value !== "BSCS") {
        return error(
          course,
          courseError,
          "Select BSIT or BSCS as your course."
        );
      }

      return error(course, courseError, "");
    }

    function checkTerms() {
      if (!terms.checked) {
        return error(
          terms,
          termsError,
          "You must agree to the terms to register."
        );
      }

      return error(terms, termsError, "");
    }

    function updatePasswordFeedback() {
      if (password.value === "") {
        passwordFeedback.textContent = "";
        passwordFeedback.className = "feedback";
        return;
      }

      if (isValidPassword(password.value)) {
        passwordFeedback.textContent = "Password meets all the rules.";
        passwordFeedback.className = "feedback ok";
      } else {
        passwordFeedback.textContent =
          "Password does not meet all the required rules.";
        passwordFeedback.className = "feedback bad";
      }
    }

    function clearOutput() {
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

      successMessage.textContent =
        "Registration details validated successfully!";
      successMessage.hidden = false;
      registrationSummary.hidden = false;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var valid = true;

      if (!checkFullName()) valid = false;
      if (!checkStudentNumber()) valid = false;
      if (!checkEmail()) valid = false;
      if (!checkMobile()) valid = false;
      if (!checkPassword()) valid = false;
      if (!checkConfirmPassword()) valid = false;
      if (!checkCourse()) valid = false;
      if (!checkTerms()) valid = false;

      if (valid) {
        showSummary();
      } else {
        clearOutput();
      }
    });

    fullName.addEventListener("blur", checkFullName);

    password.addEventListener("input", function () {
      updatePasswordFeedback();

      if (password.getAttribute("aria-invalid") === "true") {
        checkPassword();
      }

      if (confirmPassword.value !== "") {
        checkConfirmPassword();
      }
    });

    course.addEventListener("change", checkCourse);
    terms.addEventListener("change", checkTerms);

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

      clearOutput();
    });
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isValidStudentNumber: isValidStudentNumber,
    isValidPassword: isValidPassword
  };
}
