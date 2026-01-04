function translatePigLatin(sentence) {
    // Check for consonant cluster
    const consonant = sentence.match(/^[^aeiou]+/i);
    if (consonant) {   
        return `${sentence.replace(consonant, "")}${consonant}ay`;
    }
    
    // Check for vowels
    const vowels = sentence.match(/^[aeiou]+/i)
    if (vowels) {   
        return `${sentence}way`;
    }
}

console.log(translatePigLatin("rhythm"));