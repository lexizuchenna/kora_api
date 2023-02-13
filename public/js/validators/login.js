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

const password = document.querySelector('input[type="password"]');
const email = document.querySelector('input[type="email"]');
const submitBtn = document.querySelector(".btn-submit");

const errorColor = "2px solid #b20600";
const successColor = "2px solid rgb(72, 206, 176)";

let error = [];

window.addEventListener("load", () => {
  error.push(1);
  error.push(2);
});

email.addEventListener("input", () => {
  if (email !== "") {
    if (checkEmail(email.value) === true) {
      email.style.border = successColor;
      if (error.find((i) => i === 1)) {
        const newError = error.filter((x) => x !== 1);
        error = newError;
      }
    } else {
      if (!error.find((i) => i === 1)) {
        error.push(1);
      }
      email.style.border = errorColor;
    }
  } else {
    if (!error.find((i) => i === 1)) {
      error.push(1);
    }
    email.style.border = errorColor;
  }
  if (error.length === 0) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});

password.addEventListener("input", () => {
  if (password.value !== "") {
    password.style.border = successColor;
    if (error.find((i) => i === 2)) {
      const newError = error.filter((x) => x !== 2);
      error = newError;
    }
  } else {
    if (!error.find((i) => i === 2)) {
      error.push(2);
    }
    console.log(error);
    password.style.border = errorColor;
  }

  if (error.length === 0) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});
