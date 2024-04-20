const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.result span');
const equals = document.querySelector('.equals');
const negative = document.querySelector('.negative');
const signs = document.querySelectorAll('.sign');

let firstValue = "";
let secondValue = "";
let sign = "";
let resultValue = 0;

numbers.forEach(number => {
    number.addEventListener('click', (e) => addToFirstValue(e.target.textContent));
});

signs.forEach(signs => {
    signs.addEventListener('click', (e) => {sign = e.target.textContent; updateResult()});
});

equals.addEventListener('click', updateResult);
negative.addEventListener('click', negateResult);

function addToFirstValue(value) {
    firstValue = firstValue.concat(value);
    updateResult();
}

function updateResult() {
    if (firstValue !== "" && sign !== "") addToSecondValue(secondValue);
    calculateResult();
    displayResult();
}

function addToSecondValue(value) {
    secondValue = secondValue.concat(value);
}

function calculateResult() {
    if (sign === "+") {resultValue = +firstValue + +secondValue}
    if (sign === "-") {resultValue = +firstValue - +secondValue}
    if (sign === "x") {resultValue = +firstValue * +secondValue}
    if (sign === "/") {resultValue = +firstValue / +secondValue}
}

function displayResult() {
    result.textContent = resultValue;
    firstValue = resultValue.toString();
    secondValue = "";
}

function negateResult() {
    resultValue = -resultValue;
    displayResult();
}
