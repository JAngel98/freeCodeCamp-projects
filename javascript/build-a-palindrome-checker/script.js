const checkBtn = document.getElementById("check-btn");
const txtInput = document.getElementById("text-input");
const resultElm = document.getElementById("result");

checkBtn.addEventListener("click", () => {
    if (txtInput.value === "") {
        alert("Please input a value");
        return;
    }

    const filteredInput = txtInput.value.replace(/[^a-z0-9]/ig,"").toLowerCase();
    const reversedInput = filteredInput.split("").reverse().join("");
    
    if (filteredInput === reversedInput) {
        resultElm.textContent = `${txtInput.value} is a palindrome`;
    } else {
        resultElm.textContent = `${txtInput.value} is not a palindrome`;   
    }
})