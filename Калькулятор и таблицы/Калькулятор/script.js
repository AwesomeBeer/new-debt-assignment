let display = document.getElementById('display');
let current = '0';
let operator = '';
let previous = '';

function input(value) {
    if (current === '0' && value !== '.') {
        current = value;
    } else {
        current += value;
    }
    display.textContent = current;
}

function clearAll() {
    current = '0';
    operator = '';
    previous = '';
    display.textContent = current;
}

function clearLast() {
    if (current.length > 1) {
        current = current.slice(0, -1);
    } else {
        current = '0';
    }
    display.textContent = current;
}

function calculate() {
    try {
        current = String(eval(current));
        display.textContent = current;
    } catch (e) {
        display.textContent = 'Error';
        current = '0';
    }
}