// Custom Scripts
// Custom scripts

class Calculator{
    constructor(prevInput, mainInput){
        this.prevInput = prevInput;
        this.mainInput = mainInput;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, - 1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return ;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    } 

    currentOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.calc();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    

    calc(){
        let calculation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                calculation = prev + current;
                break;
            case '-':
                calculation = prev - current;
                break;
            case '*':
                calculation = prev * current;
                break;
            case '/':
                calculation = prev / current;
                break;
            default:
                return;   
        }
        this.currentOperand = calculation;
        this.operation = undefined;
        this.previousOperand = '';
 
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
          integerDisplay = '';
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0});
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`;
        } else {
          return integerDisplay;
        }
    }

    updateDisplay() {
        this.mainInput.innerText = 
            this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.prevInput.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.prevInput.innerText = '';
        }
    }

    divisionX(){
        const divisionNumber = this.currentOperand;
        this.currentOperand = (1 / divisionNumber);
    }

    oppositeX(){
        const oppositeNumber = this.currentOperand;
        this.currentOperand = (-1 * oppositeNumber);
    }
}




const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const clearAllBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const prevInput = document.querySelector('[data-prev]');
const mainInput = document.querySelector('[data-main]');
const equalBtn = document.querySelector('[data-equal]');
const divisionBtn = document.querySelector('[data-division]');
const oppositeBtn = document.querySelector('[data-opposite]');


const calculator = new Calculator(prevInput, mainInput);

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});


operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.currentOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalBtn.addEventListener('click', button => {
    calculator.calc();
    calculator.updateDisplay();
});

clearAllBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

divisionBtn.addEventListener('click', button => {
    calculator.divisionX();
    calculator.updateDisplay();
});

oppositeBtn.addEventListener('click', button => {
    calculator.oppositeX();
    calculator.updateDisplay();
});
