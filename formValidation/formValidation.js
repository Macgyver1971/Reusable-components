/*--- EDITABLE PART -------*/
/*---MAKE SURE TO PUT YOUR EACH INPUT INSIDE SEPARATE DIV -------*/
//SET requiredFill = "true" where condition applies
//Border when error
const borderStyleEmpty = `
                          border:1px solid red;
                          box-shadow:0 0 5px rgba(255,0,0,.3)
                         `;

//Border when no error
const borderStyleFilled = `
                          border:1px solid green;
                          box-shadow:0 0 5px rgba(0,255,0,.3)
                         `;

//Warning paragraph
const warningPara = true;
const warningParaStyle = `
                          font-size:70%;
                          color:red;
                          text-transform:uppercase;
                          padding:0;
                          margin:0
                          `;
const uniqueAttribute = "name";

const warningToDisplay = {
  //uniqueAttribute : What to display
  username: "Please type your username"
};

/*---------*/
/*-------------------------------------------------------------------------------*/

/*------- IGNORE THIS PART --------*/
let requiredInputs = [];
function findInputs() {
  const inputElems = document.querySelectorAll("input");
  inputElems.forEach(elem => {
    let required = elem.getAttribute("requiredFill");
    if (required == "true") {
      requiredInputs.push(elem);
    }
  });
}
findInputs();

requiredInputs.forEach(elem => {
  elem.addEventListener("keyup", () => {
    checkInputs(elem);
  });
});
const form = document.querySelector("form");
form.addEventListener("submit", event => {
  event.preventDefault();
  let count = 0;
  requiredInputs.forEach(elem => {
    checkInputs(elem);

    if (elem.value == "") {
      return;
    } else {
      count++;
    }
  });
  if (count == requiredInputs.length) {
    form.submit();
  }
});

function checkInputs(elem) {
  if (elem.value == "") {
    elem.style.cssText = borderStyleEmpty;
    if (warningPara) {
      let inputName = elem.getAttribute(uniqueAttribute || "name");
      let parent = elem.parentNode;
      let currP = document.getElementById(`${inputName}`);
      if (!currP) {
        let p = document.createElement("p");
        p.innerText = warningToDisplay[inputName] || `${inputName} required`;
        p.setAttribute("id", inputName);
        p.style.cssText = warningParaStyle;
        parent.appendChild(p);
      }
    }
  } else {
    elem.style.cssText = borderStyleFilled;
    if (warningPara) {
      let inputName = elem.getAttribute(uniqueAttribute || "name");
      let parent = elem.parentNode;
      let currP = document.getElementById(`${inputName}`);
      if (currP) {
        parent.removeChild(currP);
      }
    }
  }
}
