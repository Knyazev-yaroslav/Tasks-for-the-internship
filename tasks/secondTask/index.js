var formElement = document.forms["formElement"];

for (const element of formElement.elements) {
  element.onfocus = function (evt) {
    var activeElement = formElement.querySelector(".focused");
    if (activeElement) {
      activeElement.classList.remove("focused");
    }
    evt.target.classList.add("focused");
  };
  element.onblur = function (evt) {
    var activeElement = formElement.querySelector(".focused");
    if (activeElement) {
      activeElement.classList.remove("focused");
    }
  };
}
