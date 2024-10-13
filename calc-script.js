let currentNumber = '';
let previousNumber = '';
let operator = '';
let shouldResetDisplay = false;

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentNumber = ''; 
        shouldResetDisplay = false; 
    }
    currentNumber += number; 
    updateDisplay(currentNumber); 
}

function setOperator(op) {
    if (currentNumber === '') return;
    if (operator !== '') calculateResult(); 
    operator = op;
    previousNumber = currentNumber;
    currentNumber = '';
}

function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    updateDisplay('');
}

function updateDisplay(value) {
    document.getElementById('display').value = value;
}

function calculateResult() {
    if (previousNumber === '' || currentNumber === '' || operator === '') return;

    let result;
    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    currentNumber = result.toString();
    operator = '';
    previousNumber = '';
    updateDisplay(currentNumber);
    shouldResetDisplay = true;
}

function appendDecimal() {
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
        updateDisplay(currentNumber);
    }
}

function backspace() {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay(currentNumber);
}

function calculateSquare() {
    if (currentNumber === '') return;
    currentNumber = (parseFloat(currentNumber) ** 2).toString();
    updateDisplay(currentNumber);
    shouldResetDisplay = true; 
}

function calculateSquareRoot() {
    if (currentNumber === '') return;
    currentNumber = Math.sqrt(parseFloat(currentNumber)).toString();
    updateDisplay(currentNumber);
    shouldResetDisplay = true; 
}

window.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        setOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === '.') {
        appendDecimal();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
