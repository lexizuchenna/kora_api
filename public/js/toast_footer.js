var stringToHTML = function (str) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(str, 'text/html');
		return doc.body;
};

let errors = document.getElementsByClassName("errors");
if (errors) {
  for (let i = 0; i < errors.length; i++) {
    const err = `<div
    data-testid="feedback"
    class="feedback-reg danger"
    role="alert"
  >${errors[i].innerText}</div>`;
    document.getElementById("error-box").innerHTML = err;
  }
}

let success = document.getElementsByClassName("success");
if (success) {
  for (let i = 0; i < success.length; i++) {
    const succ = `<div
    data-testid="feedback"
    class="feedback-reg success"
    role="alert"
  >${success[i].innerText}</div>`;
    console.log(stringToHTML(succ));
    document.getElementById("success-box").append(stringToHTML(succ));
  }
}
