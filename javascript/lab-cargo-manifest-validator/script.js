const manifest = { containerId: 0, destination: 405, weight: -84, unit: "pounds", hazmat: "no" }
function normalizeUnits(manifest) {
    const normalizedObj = structuredClone(manifest);

    if (normalizedObj.unit === "lb") {
        normalizedObj.weight *= 0.45;
        normalizedObj.unit = "kg";
    }

    return normalizedObj;
}

console.log(normalizeUnits(manifest));

function validateManifest(manifest) {
    const validatedObj = structuredClone(manifest);
    const props = ["containerId", "destination", "weight", "unit", "hazmat"];
    let invalidProps = {};
    //let validProps = [];

    props.forEach(p => {
        if (!validatedObj.hasOwnProperty(p)) {
            invalidProps[p] = "Missing";
        } else if (p === "containerId") {   //Validar containerId
            if (validatedObj[p] <= 0 || isNaN(validatedObj[p]))
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

console.log(validateManifest(manifest));