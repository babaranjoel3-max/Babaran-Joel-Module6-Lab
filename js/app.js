/* ITP10 Laboratory Activity 3: Student Registration Form with Input Validation
 * Safe to load in Node: DOM code runs only when `document` exists.
 */

/* ---------- Regular expressions ---------- */
var STUDENT_NUMBER_PATTERN = /^\d{2}-\d{4}-\d{3}$/;
var EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
var MOBILE_PATTERN = /^(09|\+639)\d{9}$/;
var PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!])\S{8,}$/;

/* ---------- Pure validation functions (no DOM access) ---------- */

/** True only when the trimmed value looks like 24-1234-123. */
function isValidStudentNumber(value) {
  if (typeof value !== "string") {
    return false;
  }
  return STUDENT_NUMBER_PATTERN.test(value.trim());
}

/** True only when the password meets every rule. The password is never trimmed. */
function isValidPassword(value) {
  if (typeof value !== "string") {
    return false;
  }
  return PASSWORD_PATTERN.test(value);
}

/* Small helpers used by the page (also pure). */
function isValidFullName(value) {
  return typeof value === "string" && value.trim().length >= 2;
}

function isValidEmail(value) {
  return typeof value === "string" && EMAIL_PATTERN.test(value.trim());
}

function isValidMobileNumber(value) {
  return typeof value === "string" && MOBILE_PATTERN.test(value.trim());
}

/** Lists the password rules that are not yet met (empty array = all met). */
function getPasswordProblems(value) {
  var password = typeof value === "string" ? value : "";
  var problems = [];
  if (password.length < 8) {
    problems.push("at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    problems.push("one uppercase letter");
  }
  if (!/\d/.test(password)) {
    problems.push("one digit");
  }
  if (!/[@$!]/.test(password)) {
    problems.push("one of @, $, or !");
  }
  if (/\s/.test(password)) {
    problems.push("no spaces");
  }
  return problems;
}

/* ---------- Browser behavior ---------- */
if (typeof document !== "undefined") {
  (function () {
    function $(id) {
      return document.getElementById(id);
    }

    var form = $("registrationForm");
    if (!form) {
      return;
    }

    var fields = {
      fullName: $("fullName"),
      studentNumber: $("studentNumber"),
      email: $("email"),
      mobileNumber: $("mobileNumber"),
      password: $("password"),
      confirmPassword: $("confirmPassword"),
      course: $("course"),
      terms: $("terms")
    };

    var errorBoxes = {
      fullName: $("fullNameError"),
      studentNumber: $("studentNumberError"),
      email: $("emailError"),
      mobileNumber: $("mobileNumberError"),
      password: $("passwordError"),
      confirmPassword: $("confirmPasswordError"),
      course: $("courseError"),
      terms: $("termsError")
    };

    var passwordFeedback = $("passwordFeedback");
    var successMessage = $("successMessage");
    var registrationSummary = $("registrationSummary");

    /* Show or clear a field's error and keep aria-invalid in sync. */
    function setError(name, message) {
      errorBoxes[name].textContent = message;
      fields[name].setAttribute("aria-invalid", message ? "true" : "false");
      return message === "";
    }

    /* Each checker returns true when valid and updates the message. */
    function checkFullName() {
      var name = fields.fullName.value.trim();
      if (name === "") {
        return setError("fullName", "Enter your full name.");
      }
      if (name.length < 2) {
        return setError("fullName", "Full name must have at least two characters.");
      }
      return setError("fullName", "");
    }

    function checkStudentNumber() {
      var value = fields.studentNumber.value.trim();
      if (value === "") {
        return setError("studentNumber", "Enter your student number.");
      }
      if (!isValidStudentNumber(value)) {
        return setError("studentNumber", "Enter a student number in the format 24-1234-123.");
      }
      return setError("studentNumber", "");
    }

    function checkEmail() {
      var value = fields.email.value.trim();
      if (value === "") {
        return setError("email", "Enter your email address.");
      }
      if (!isValidEmail(value)) {
        return setError("email", "Enter an email address like name@example.com.");
      }
      return setError("email", "");
    }

    function checkMobileNumber() {
      var value = fields.mobileNumber.value.trim();
      if (value === "") {
        return setError("mobileNumber", "Enter your mobile number.");
      }
      if (!isValidMobileNumber(value)) {
        return setError("mobileNumber", "Enter a mobile number as 09XXXXXXXXX or +639XXXXXXXXX, without spaces or hyphens.");
      }
      return setError("mobileNumber", "");
    }

    function checkPassword() {
      var value = fields.password.value;
      if (value === "") {
        return setError("password", "Enter a password.");
      }
      if (!isValidPassword(value)) {
        return setError("password", "Password needs " + getPasswordProblems(value).join(", ") + ".");
      }
      return setError("password", "");
    }

    function checkConfirmPassword() {
      var value = fields.confirmPassword.value;
      if (value === "") {
        return setError("confirmPassword", "Confirm your password.");
      }
      if (value !== fields.password.value) {
        return setError("confirmPassword", "Passwords do not match.");
      }
      return setError("confirmPassword", "");
    }

    function checkCourse() {
      var value = fields.course.value;
      if (value !== "BSIT" && value !== "BSCS") {
        return setError("course", "Select BSIT or BSCS as your course.");
      }
      return setError("course", "");
    }

    function checkTerms() {
      if (!fields.terms.checked) {
        return setError("terms", "You must agree to the terms to register.");
      }
      return setError("terms", "");
    }

    /* Live password feedback (text plus color class). */
    function updatePasswordFeedback() {
      var value = fields.password.value;
      if (value === "") {
        passwordFeedback.textContent = "";
        passwordFeedback.className = "feedback";
        return;
      }
      var problems = getPasswordProblems(value);
      if (problems.length === 0) {
        passwordFeedback.textContent = "Password meets all the rules.";
        passwordFeedback.className = "feedback ok";
      } else {
        passwordFeedback.textContent = "Password still needs: " + problems.join(", ") + ".";
        passwordFeedback.className = "feedback bad";
      }
    }

    function hideResults() {
      successMessage.textContent = "";
      successMessage.hidden = true;
      registrationSummary.hidden = true;
      $("summaryName").textContent = "";
      $("summaryStudentNumber").textContent = "";
      $("summaryEmail").textContent = "";
      $("summaryMobileNumber").textContent = "";
      $("summaryCourse").textContent = "";
    }

    function showResults() {
      $("summaryName").textContent = fields.fullName.value.trim();
      $("summaryStudentNumber").textContent = fields.studentNumber.value.trim();
      $("summaryEmail").textContent = fields.email.value.trim();
      $("summaryMobileNumber").textContent = fields.mobileNumber.value.trim();
      $("summaryCourse").textContent = fields.course.value;
      successMessage.textContent = "Registration details validated successfully!";
      successMessage.hidden = false;
      registrationSummary.hidden = false;
    }

    /* ----- Submit: check every field, then show results only if all pass ----- */
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Run every check (no short-circuiting) so all errors appear together.
      var results = [
        checkFullName(),
        checkStudentNumber(),
        checkEmail(),
        checkMobileNumber(),
        checkPassword(),
        checkConfirmPassword(),
        checkCourse(),
        checkTerms()
      ];
      var allValid = results.every(function (ok) { return ok; });

      if (allValid) {
        showResults();
      } else {
        hideResults();
        // Move keyboard focus to the first invalid field.
        for (var name in fields) {
          if (fields[name].getAttribute("aria-invalid") === "true") {
            fields[name].focus();
            break;
          }
        }
      }
    });

    /* ----- Blur: full name ----- */
    fields.fullName.addEventListener("blur", checkFullName);

    /* ----- Input: live password feedback ----- */
    fields.password.addEventListener("input", function () {
      updatePasswordFeedback();
      if (fields.password.getAttribute("aria-invalid") === "true") {
        checkPassword();
      }
      // Re-check the confirmation if the user has already typed or been flagged.
      if (fields.confirmPassword.value !== "" ||
          fields.confirmPassword.getAttribute("aria-invalid") === "true") {
        checkConfirmPassword();
      }
    });

    /* ----- Input: once a field was flagged, re-check it as the user corrects it ----- */
    var recheckOnInput = {
      fullName: checkFullName,
      studentNumber: checkStudentNumber,
      email: checkEmail,
      mobileNumber: checkMobileNumber,
      confirmPassword: checkConfirmPassword
    };
    Object.keys(recheckOnInput).forEach(function (name) {
      fields[name].addEventListener("input", function () {
        if (fields[name].getAttribute("aria-invalid") === "true") {
          recheckOnInput[name]();
        }
      });
    });

    /* ----- Change: course and terms ----- */
    fields.course.addEventListener("change", checkCourse);
    fields.terms.addEventListener("change", checkTerms);

    /* ----- Reset: clear every message and output ----- */
    form.addEventListener("reset", function () {
      Object.keys(errorBoxes).forEach(function (name) {
        errorBoxes[name].textContent = "";
        fields[name].setAttribute("aria-invalid", "false");
      });
      passwordFeedback.textContent = "";
      passwordFeedback.className = "feedback";
      hideResults();
      // The browser restores the controls' initial values right after this event.
    });
  })();
}

/* ---------- Export for the Node-based autograder ---------- */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isValidStudentNumber: isValidStudentNumber,
    isValidPassword: isValidPassword
  };
}