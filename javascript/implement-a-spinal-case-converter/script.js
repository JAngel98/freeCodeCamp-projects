function spinalCase(string) {
    const str1 = string.trim().replace(/[^a-zA-Z0-9]/g,"-");
    const str2 = str1.replace(/(?<=[a-z])([A-Z])/g, (match) => {
        return "-" + match.toLowerCase();
    });

    return str2.toLowerCase();
}

console.log(spinalCase("AllThe-small Things"));