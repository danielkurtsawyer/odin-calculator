const MAX_DISPLAY_TEXT_LENGTH = 10;
let num1, num2, operator, lastPressed;

const display = document.querySelector('.displayText');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalsButton = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');

numbers.forEach(num => num.addEventListener('click', processNumber));
operators.forEach(operator => operator.addEventListener('click', processOperator));
clearButton.addEventListener('click', clearDisplay);
equalsButton.addEventListener('click', processEquals);
decimal.addEventListener('click', processDecimal);

function processNumber(e){
    // if an operator is undefined but we have a num1 value, then we are starting a new series of operations and must clear the display and the saved variables
    if(operator === undefined && num1 !== undefined) clearDisplay();
    // if either equals or operator was last pressed, we can rewrite the display
    if(num1 && (lastPressed === 'operator' || lastPressed === 'equals')) display.textContent = '';

    const num = Number(e.target.textContent);
    // if the display is only a 0, remove it so we don't have unneccessary leading zeros 
    if(display.textContent === '0') display.textContent = '';
    if(display.textContent.length < MAX_DISPLAY_TEXT_LENGTH) display.textContent += num;

    lastPressed = 'number';
}

function processOperator(e){
    const op = e.target.textContent;
    console.log(op);

    if(num1 === undefined) {
        num1 = Number(display.textContent);
    } else{
        processEquals();
    }

    operator = op;
    lastPressed = 'operator'
}

function processDecimal(e){
    // if an operator is undefined but we have a num1 value, then we are starting a new series of operations and must clear the display and the saved variables
    if(operator === undefined && num1 !== undefined) clearDisplay();
    // if either equals or operator was last pressed, we can rewrite the display
    if(num1 && (lastPressed === 'operator' || lastPressed === 'equals')) display.textContent = '0';

    if(!display.textContent.includes('.')){
        display.textContent += '.';
    }
    lastPressed = 'decimal';
}

function processEquals(e){
    if(operator){
        num2 = Number(display.textContent);
        display.textContent = operate(operator, num1, num2);
        num1 = Number(display.textContent);
        num2 = undefined;
        operator = undefined;
        lastPressed = 'equals'
    }
}

function clearDisplay(e){
    display.textContent = '0';
    num1 = num2 = operator = lastPressed = undefined;
}

function operate(operator, num1, num2){
    let result; 
    switch(operator){
        case '/':
            if(num2 === 0){
                alert('Cannot divide by zero');
                return 0;
            }
            result = num1 / num2;
            console.log(result);
            let wholeNumLength = Math.round(result).toString().length;
            console.log(wholeNumLength);
            let decimals = MAX_DISPLAY_TEXT_LENGTH - wholeNumLength;
            console.log(decimals);
            if(wholeNumLength < MAX_DISPLAY_TEXT_LENGTH){
                result = Math.round(result * (10**decimals)) / (10**decimals);
            }
            break;
        case 'x':
            result = num1 * num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '+':
            result = num1 + num2;
            break;
    }
    return result;

}