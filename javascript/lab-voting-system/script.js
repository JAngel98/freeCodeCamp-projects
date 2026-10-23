let poll = new Map();

function addOption(option) {
    let outputMsg = "";
    let optStr = option.toString().trim();

    if (optStr === "") {
        outputMsg = "Option cannot be empty.";
        return outputMsg;
    }

    if (!poll.has(optStr)) {
        poll.set(optStr, new Set());
        outputMsg = `Option "${optStr}" added to the poll.`;
    } else {
        outputMsg = `Option "${optStr}" already exists.`;
    }

    return outputMsg;
}

function vote(option, voterId) {
    let outputMsg = "";

    let optStr = option.toString().trim();

    if (!poll.has(optStr)) {
        outputMsg = `Option "${optStr}" does not exist.`;
        return outputMsg;
    }

    const selectedOpt = poll.get(option);
    const hasVoted = selectedOpt.has(voterId);

    if (hasVoted) {
        outputMsg = `Voter ${voterId} has already voted for "${option}".`;
    } else {
        selectedOpt.add(voterId);
        outputMsg = `Voter ${voterId} voted for "${option}".`;
    }

    return outputMsg;
}

function displayResults() {
    let outputMsg = "Poll Results:";

    poll.forEach((val, opt) => {
        outputMsg += `\n${opt}: ${val.size} votes`;
    });

    return outputMsg;
}

addOption("EDM");
addOption("EDM");
addOption("House");
addOption("Dubstep");
addOption("     ");

console.log(vote("Reggae", 980811));
console.log(vote("EDM", 980811));
console.log(vote("EDM", 980811));
console.log(vote("House", 991231));
console.log(vote("House", 711008));

console.log(displayResults());