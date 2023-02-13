const checkEmail = (email) => {
  let at = email.indexOf("@");

  if (email.match(/[!#/\$%^&*()+,|<>;]/, "i")) {
    return "Not a valid email address";
  }

  if (at === -1) {
    return "Not a valid email address";
  }

  let domain = email.substr(email.indexOf("@") + 1);

  let com = domain.indexOf(".");
  if (com === -1) {
    return "Not a valid email address";
  }

  let topLevelDomain = domain.substring(domain.indexOf(".") + 1);

  if (!domain || !topLevelDomain || topLevelDomain.length < 3) {
    return "Not a valid email address";
  }

  return true;
};

let previousPhone = "";
function phoneFormat(field) {
  const specialCharCount = (field.value.match(/\D/g) || []).length;
  let cursorPosition = field.selectionStart;

  let input = field.value.replace(/\D/g, "");
  const size = input.length;
  if (input.substring(0, 1) == 1) {
    if (size === 0) {
      input = ``;
    } else if (size < 2) {
      input = `+${input} `;
    } else if (size < 4) {
      input = `+${input.substring(0, 1)} (${input.substring(1)}`;
    } else if (size < 8) {
      input = `+${input.substring(0, 1)} (${input.substring(
        1,
        4
      )}) ${input.substring(4)}`;
    }
    // else if (size<16) {input=`+${input.substring(0,1)} (${input.substring(1,4)}) ${input.substring(4,7)}-${input.substring(7,11)}`}
    // else if (size<15) {input=`+${input.substring(0,1)} (${input.substring(1,4)}) ${input.substring(4,7)}-${input.substring(7,11)}`}
  } else {
    if (size > 9 && size < 18) {
      input = `${input.substring(0, 3)}-${input.substring(
        3,
        6
      )}-${input.substring(6, 9)}-${input.substring(9, 14)}`;
    } else if (size > 7 && size < 11) {
      input = `${input.substring(0, 3)}-${input.substring(
        3,
        6
      )}-${input.substring(6)}`;
    } else if (size > 3 && size < 8) {
      input = `${input.substring(0, 3)}-${input.substring(3)}`;
    }
  }

  if (input !== previousPhone) {
    previousPhone = input;
    const specialCharDiff =
      (input.match(/\D/g) || []).length - specialCharCount;
    cursorPosition += specialCharDiff;

    field.value = input;
    field.selectionStart = cursorPosition;
    field.selectionEnd = cursorPosition;

    return input.replace(/[-]/g, "");
  }
}

const inputs = document.querySelectorAll('input[type="text"]');
const btns = document.querySelectorAll(".btn-submit");
const submitBtn = document.querySelector(".btn-submit");
const tandc = document.querySelector('input[name="tandc"]');
const requiredInput = document.querySelectorAll('input[required="true"]');

const passLength = document.querySelectorAll("#pass_length span");
const passCaps = document.querySelectorAll("#pass_caps span");
const passSmall = document.querySelectorAll("#pass_small span");
const passSpecial = document.querySelectorAll("#pass_special span");
const passNumber = document.querySelectorAll("#pass_number span");
const passConfirm = document.querySelectorAll("#pass_confirm span");

const changeColor = (nodeList, color) => {
  nodeList.forEach((span) => (span.style.color = color));
};

const [primaryColor, secondaryColor, linkColor, greyColor, whiteColor] = [
  "#ff5f00",
  "#00092c",
  "#b20600",
  "#eeeeee",
  "#ffffff",
];

const errorColor = "2px solid " + linkColor;
const successColor = "2px solid rgb(72, 206, 176)";

let error = [];
let password;
let confirmPassword;

window.addEventListener("load", () => {
  requiredInput.forEach((input, index) => {
    error.push(index + 1);
  });
});

requiredInput.forEach((input, index, all) => {
  input.addEventListener("focusout", (e) => {
    if (input.value === "") {
      input.style.border = errorColor;
    }
  });

  input.addEventListener("input", () => {
    let nInput = input.name;
    if (input.value !== "") {
      if (nInput === "email") {
        if (checkEmail(input.value) === true) {
          input.style.border = successColor;
          if (error.find((i) => i === index + 1)) {
            const newError = error.filter((x) => x !== index + 1);
            error = newError;
          }
        } else {
          if (!error.find((i) => i === index + 1)) {
            error.push(index + 1);
          }
          input.style.border = errorColor;
        }
      } else if (nInput === "password") {
        password = input.value;
        if (input.value.length < 8) {
          changeColor(passLength, "red");
        } else {
          changeColor(passLength, "green");
        }

        if (input.value.match(/[A-Z]/, "i")) {
          changeColor(passCaps, "green");
        } else {
          changeColor(passCaps, "red");
        }
        if (input.value.match(/[a-z]/, "i")) {
          changeColor(passSmall, "green");
        } else {
          changeColor(passSmall, "red");
        }
        if (input.value.match(/[!@|<>;@#$%^&*();,+]/, "i")) {
          changeColor(passSpecial, "green");
        } else {
          changeColor(passSpecial, "red");
        }
        if (input.value.match(/[0-9]/, "i")) {
          changeColor(passNumber, "green");
        } else {
          changeColor(passNumber, "red");
        }

        if (input.value === confirmPassword) {
          changeColor(passConfirm, "green");
        } else {
          changeColor(passConfirm, "red");
        }

        if (
          input.value.length < 8 ||
          !input.value.match(/[A-Z]/, "i") ||
          !input.value.match(/[a-z]/, "i") ||
          !input.value.match(/[!@|<>;@#$%^&*();,+]/, "i") ||
          !input.value.match(/[0-9]/, "i")
        ) {
          if (!error.find((i) => i === index + 1)) {
            error.push(index + 1);
          }
        } else {
          if (error.find((i) => i === index + 1)) {
            const newError = error.filter((x) => x !== index + 1);
            error = newError;
          }
        }

        if (!error.find((i) => i === index + 1)) {
          input.style.border = successColor;
        }
        if (error.find((i) => i === index + 1)) {
          input.style.border = errorColor;
        }
      } else if (nInput === "confirm_password") {
        confirmPassword = input.value;
        if (input.value !== password) {
          changeColor(passConfirm, "red");
          if (!error.find((i) => i === index + 1)) {
            error.push(index + 1);
          }
        } else {
          changeColor(passConfirm, "green");
          if (error.find((i) => i === index + 1)) {
            const newError = error.filter((x) => x !== index + 1);
            error = newError;
          }
        }
      } else if (nInput === "username") {
        if (input.value.match(/[!@#/\$%^&*()_+-.,]/, "i")) {
          if (!error.find((i) => i === index + 1)) {
            error.push(index + 1);
          }
          input.style.border = errorColor;
        } else {
          if (error.find((i) => i === index + 1)) {
            const newError = error.filter((x) => x !== index + 1);
            error = newError;
          }
          input.style.border = successColor;
        }
      } else if (nInput === "first_name") {
        if (input.value.match(/[!@#/\$%^&*()_+-.,]/, "i")) {
          if (!error.find((i) => i === index + 1)) {
            error.push(index + 1);
          }
          input.style.border = errorColor;
        } else {
          if (error.find((i) => i === index + 1)) {
            const newError = error.filter((x) => x !== index + 1);
            error = newError;
          }
          input.style.border = successColor;
        }
      } else if (nInput === "last_name") {
        if (input.value.match(/[!@/\#$%^&*()_+-.,]/, "i")) {
          input.style.border = errorColor;
          if (!error.find((i) => i === index + 1)) {
            error.push(index + 1);
          }
          input.style.border = errorColor;
        } else {
          if (error.find((i) => i === index + 1)) {
            const newError = error.filter((x) => x !== index + 1);
            error = newError;
          }
          input.style.border = successColor;
        }
      } else if (nInput === "phone_number") {
        const numbers = phoneFormat(input)
        console.log(numbers.length)
        if (numbers.length < 13) {
          input.style.border = errorColor;
          if (!error.find((i) => i === index + 1)) {
            error.push(index + 1);
          }
        } else {
          if (error.find((i) => i === index + 1)) {
            const newError = error.filter((x) => x !== index + 1);
            error = newError;
          }
          input.style.border = successColor;
        }
      }
    }
    if (input.value === "" && nInput === "password") {
      changeColor(passLength, "red");
      changeColor(passCaps, "red");
      changeColor(passSmall, "red");
      changeColor(passSpecial, "red");
      changeColor(passNumber, "red");
      if (!error.find((i) => i === index)) {
        error.push(index);
      }
    }

    if (error.length === 0 && tandc.checked === true) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  });
});

tandc.addEventListener("click", () => {
  console.log(error, tandc.checked)
  if (error.length === 0 && tandc.checked === true) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});
