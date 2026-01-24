const formFields = {
    'full-name': document.getElementById('full-name'),
    'email': document.getElementById('email'),
    'order-no': document.getElementById('order-no'),
    'product-code': document.getElementById('product-code'),
    'quantity': document.getElementById('quantity'),
    'complaints-group': document.getElementById('complaints-group'),
    'complaint-description': document.getElementById('complaint-description'),
    'solutions-group': document.getElementById('solutions-group'),
    'solution-description': document.getElementById('solution-description')
};

function validateForm() {
    const checkBoxs = document.querySelectorAll('#complaints-group > div > input');
    const radioBtns = document.querySelectorAll('#solutions-group > input');
    const inputsObj = {
        'full-name': true,
        'email': true,
        'order-no': true,
        'product-code': true,
        'quantity': true,
        'complaints-group': true,
        'complaint-description': true,
        'solutions-group': true,
        'solution-description': true
    };

    for (const input in inputsObj) {
        const inputElm = document.getElementById(input);
        if (!inputElm) return null;

        if (input === 'full-name') {
            if (inputElm.value === '') inputsObj[input] = false;
        }
        if (input === 'email') {
            if (!inputElm.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) inputsObj[input] = false;
        }
        if (input === 'order-no') {
            if (!inputElm.value.match(/^2024[0-9]{6}/)) inputsObj[input] = false;
        }
        if (input === 'product-code') {
            if (!inputElm.value.match(/^[A-Z]{2}\d{2}-[A-Z]\d{3}-[A-Z]{2}\d$/i)) inputsObj[input] = false;
        }
        if (input === 'quantity') {
            if (Number(inputElm.value) < 1) inputsObj[input] = false;
        }
        if (input === 'complaints-group') {
            const isChecked = Array.from(checkBoxs).some(i => i.checked);

            if (!isChecked) inputsObj[input] = false;
        }
        if (input === 'complaint-description') {
            const otherCheck = Array.from(checkBoxs).filter(i => i.id === 'other-complaint')[0];

            if (otherCheck.checked && inputElm.value.length < 20) inputsObj[input] = false;
        }
        if (input === 'solutions-group') {
            const isChecked = Array.from(radioBtns).some(i => i.checked);

            if (!isChecked) inputsObj[input] = false;
        }
        if (input === 'solution-description') {
            const otherCheck = Array.from(radioBtns).filter(i => i.id === 'other-solution')[0];

            if (otherCheck.checked && inputElm.value.length < 20) inputsObj[input] = false;
        }
    }

    return inputsObj;
}

function isValid(obj) {
    let isValidForSubmit = Object.values(obj).every(key => key === true);

    return isValidForSubmit;
}

Object.keys(formFields).forEach((key) => {
    document.getElementById(key).addEventListener("change", () => {
        const isAValidInput = validateForm()[key];
        if (isAValidInput) {
            document.getElementById(key).style.borderColor = "green";
        } else {
            document.getElementById(key).style.borderColor = "red";
        }
    });
})


document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const validationObj = validateForm();

    if (!isValid(validationObj)) {
        Object.keys(validationObj).forEach((key) => {
            if (validationObj[key]) {
                document.getElementById(key).style.borderColor = "green";
            } else {
                document.getElementById(key).style.borderColor = "red";
            }
        })
    }
})