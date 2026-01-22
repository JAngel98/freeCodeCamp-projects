const redColor = '#EE0000';
const greenColor = '#00AA00';

function validateForm() {
    const inputsObj = {
        'full-name': false,
        'email': false,
        'order-no': false,
        'product-code': false,
        'quantity': false,
        'complaints-group': false,
        'complaint-description': false,
        'solutions-group': false,
        'solution-description': false
    };

    for (const input in inputsObj) {
        const inputElm = document.getElementById(input);
        if (!inputElm) return null;

        if (input === 'full-name') {
            if (inputElm.value === '') {
                inputElm.style.borderColor = redColor;
                inputsObj[input] = false;
            } else {
                inputElm.style.borderColor = greenColor;
                inputsObj[input] = true;
            }
        }
        if (input === 'email') {
            if (!inputElm.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                inputElm.style.borderColor = redColor;
                inputsObj[input] = false;
            } else {
                inputElm.style.borderColor = greenColor;
                inputsObj[input] = true;
            }
        }
        if (input === 'order-no') {
            if (!inputElm.value.match(/^2024[0-9]{6}/)) {
                inputElm.style.borderColor = redColor;
                inputsObj[input] = false;
            } else {
                inputElm.style.borderColor = greenColor;
                inputsObj[input] = true;
            }
        }
        if (input === 'product-code') {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier
            if (!inputElm.value.match(/^2024[0-9]{6}/)) {
                inputElm.style.borderColor = redColor;
                inputsObj[input] = false;
            } else {
                inputElm.style.borderColor = greenColor;
                inputsObj[input] = true;
            }
        }
        //console.log(inputElm);

    }

    console.log(inputsObj);
    

    return inputsObj;
}

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
})