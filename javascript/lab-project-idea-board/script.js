const projectStatus = {
    "PENDING": {
        "description": "Pending Execution"
    },
    "SUCCESS": {
        "description": "Executed Successfully"
    },
    "FAILURE": {
        "description": "Execution Failed"
    }
};

class ProjectIdea {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.status = projectStatus.PENDING;
    }

    updateProjectStatus(newStatus) {
        this.status = newStatus;
    }
}

class ProjectIdeaBoard {
    constructor(title) {
        this.title = title;
        this.ideas = [];
    }

    pin(objProjectIdea) {
        this.ideas.push(objProjectIdea);
    }

    unpin(objProjectIdea) {     
        const index = this.ideas.indexOf(objProjectIdea);
        this.ideas.splice(index, 1)
    }

    count() {
        return this.ideas.length;
    }

    formatToString() {
        let outputMsg = `${this.title} has ${this.count()} idea(s)\n`;
        
        this.ideas.forEach(idea => {
            outputMsg += `${idea.title} (${idea.status.description}) - ${idea.description}\n`;  
        });

        return outputMsg;
    }
}

const project1 = new ProjectIdea("Smart Window Locks", "An automation project allowing users to lock, unlock windows automatically based on weather conditions.")
const project2 = new ProjectIdea("Home Invasion Detector", "A project focused on detects suspicious people inside a home property and active the system alarm.")
const project3 = new ProjectIdea("Black Eyes Peas", "I gotta feeling, lets do it, lets live it up. Here we go, feel the show, Party Rock.")

const projectBoard = new ProjectIdeaBoard("Any topics admitted");
const emptyBoard = new ProjectIdeaBoard("Empty Board");

projectBoard.pin(project1);
projectBoard.pin(project2);
projectBoard.pin(project3);
console.log(projectBoard);
projectBoard.unpin(project2);
console.log(projectBoard);
project3.updateProjectStatus(projectStatus.SUCCESS)
console.log(project3);


console.log(projectBoard.formatToString());
console.log(emptyBoard.formatToString());



