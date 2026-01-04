const regexPattern = document.getElementById('pattern');
const stringToTest = document.getElementById('test-string');
const testButton = document.getElementById('test-btn');
const testResult = document.getElementById('result');
const caseInsensitiveFlag = document.getElementById('i');
const globalFlag = document.getElementById('g');

const matchedString = [];

function getFlags() {
    let flags = '';
    if (caseInsensitiveFlag.checked) flags += 'i';
    if (globalFlag.checked) flags += 'g';
    return flags;
}

function highlightMatched(match) {
    matchedString.push(match);

    return `<span class="highlight">${match}</span>`;
}

testButton.addEventListener("click", () => {
    const inputString = String(stringToTest.textContent);
    
    stringToTest.textContent = inputString // Clean highlighted content for new regexp match
    matchedString.splice(0);

    const regexp = new RegExp(`${regexPattern.value}`, getFlags());

    let highlightedString = inputString.replace(regexp, highlightMatched);
    
    stringToTest.innerHTML = highlightedString;
    testResult.textContent = matchedString.length > 0 ? matchedString.join(", ") : "no match";
})