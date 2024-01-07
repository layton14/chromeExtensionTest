
let display = document.getElementById("calcDisplay");
let formulaDisplay = document.getElementById("formulaDisplay");
let displayingResult = false;
const operationsArr = ["C", "+/-", "%", "/", "x", "*", "-", "+", "=", "."];
const displayLimit = 11;

function addCalcButtonEvent() {
    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", (event) => {
            updateDisplay(event.target);
        })
    });
}

function updateDisplay(val) {

    if (displayingResult == true) {
        display.innerText = "0";
        formulaDisplay.innerText = "_";
        displayingResult = false;
    }

    const currentDisplay = display.innerText;
    if (validInput(val) == true) {
        switch(val.innerText) {
            case "C":
                display.innerText = "0";
                formulaDisplay.innerText = "_";
                displayingResult = false;
                break;
            case "=":
                formulaDisplay.innerText = display.innerText;
                display.innerText = eval(currentDisplay);
                displayingResult = true;
                break;
            case "+/-":
                if (currentDisplay.charAt(0) === "-") {
                    display.innerText = currentDisplay.substring(1);
                } else {
                    display.innerText = "-" + currentDisplay;
                }
                break;
            case "x":
                display.innerText += "*";
                break;
            default:
                if (currentDisplay === "0") {
                    display.innerText = val.innerText;
                } else {
                    display.innerText += val.innerText;
                }
                break;
        }
    }
}

function validInput(val) {

    const currentCharIsOp = val.className == "operation";
    const lastCharIsOp = operationsArr.includes(display.innerText.slice(-1));
    const decimalInDisplay = display.innerText.includes(".");

    if (val.innerText === "C") {
        return true;
    } else if (display.innerText.length > displayLimit) {
        return false;
    } else if(currentCharIsOp == true && lastCharIsOp == true) {
        return false;
    } else if (decimalInDisplay == true && val.innerText === ".") {
        return false;
    } else {
        return true;
    }
}

addCalcButtonEvent();
