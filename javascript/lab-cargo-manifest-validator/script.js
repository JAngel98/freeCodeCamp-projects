const manifest = {
  containerId: 1.5,
  destination: "Monterey, California, USA",
  weight: 831,
  unit: "lb",
  hazmat: false
}

function normalizeUnits(manifest) {
    const normalizedObj = structuredClone(manifest);

    if (normalizedObj.unit === "lb") {
        normalizedObj.weight *= 0.45;
        normalizedObj.unit = "kg";
    }

    return normalizedObj;
}

console.log("originalObj", manifest);
console.log("normalizedObj", normalizeUnits(manifest));

function validateManifest(manifest) {
    const validatedObj = structuredClone(manifest);
    const props = ["containerId", "destination", "weight", "unit", "hazmat"];
    let invalidProps = {};

    props.forEach(p => {
        if (!validatedObj.hasOwnProperty(p)) {
            invalidProps[p] = "Missing";
        } else if (p === "containerId") {   //Validar containerId
            if (validatedObj[p] <= 0 || isNaN(validatedObj[p]) || !Number.isInteger(validatedObj[p]))
                invalidProps[p] = "Invalid";

        } else if (p === "destination") {   //Validar destination
            if (typeof (validatedObj[p]) !== "string" || validatedObj[p].trim() === "")
                invalidProps[p] = "Invalid";

        } else if (p === "weight") {   //Validar weight
            if (validatedObj[p] <= 0 || isNaN(validatedObj[p]))
                invalidProps[p] = "Invalid";

        } else if (p === "unit") {   //Validar unit
            if (validatedObj[p] !== "lb" && validatedObj[p] !== "kg")
                invalidProps[p] = "Invalid";

        } else if (p === "hazmat") {   //Validar hazmat
            if (typeof (validatedObj[p]) !== "boolean")
                invalidProps[p] = "Invalid";
        }
    })

    return invalidProps;
}

function processManifest(manifest) {
    const isValid = Object.keys(validateManifest(manifest)).length === 0;

    if (isValid) {
        console.log(`Validation success: ${manifest.containerId}`);
        console.log(`Total weight: ${normalizeUnits(manifest).weight} kg`);
    } else {
        console.log(`Validation error: ${manifest.containerId}`);
        console.log(validateManifest(manifest));
        
    }

    // return isValid;
}

// console.log(validateManifest(manifest));
// console.log(processManifest(manifest));
processManifest(manifest);
