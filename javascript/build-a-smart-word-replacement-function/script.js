function myReplace(sentence, rplcWrd, newWrd) {
    const isUpperCase = /^[A-Z]/.test(rplcWrd);
    let newWrdFormatted = newWrd;
    
    const firstCharCase = isUpperCase ? newWrd[0].toUpperCase() : newWrd[0].toLowerCase();
    newWrdFormatted = firstCharCase + newWrd.slice(1);

    return sentence.replace(rplcWrd, newWrdFormatted);
}

console.log(myReplace("I think we should look Up there", "Up", "down"));

