const manifest = {
    containerId: 1.5,
    // destination: "Monterey, California, USA",
    // weigdht: 831,
    // unit: "lb",
    // hazmat: false
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
    const validators = {
        containerId: value => Number.isInteger(value) && value > 0,
        destination: value => typeof value === "string" && value.trim() !== "",
        weight: value => typeof value === "number" && value > 0,
        unit: value => ["lb", "kg"].includes(value),
        hazmat: value => typeof value === "boolean"
    }

    let invalidProps = {};

    for (const prop in validators) {
        if (!(prop in manifest)) {
            invalidProps[prop] = "Missing";
            continue;
        }

        if (!validators[prop](manifest[prop])) {
            invalidProps[prop] = "Invalid";
        }
    }

    return invalidProps;
}

function processManifest(manifest) {
    const invalidProps = validateManifest(manifest);


    if (Object.keys(invalidProps).length > 0) {
        console.log(`Validation error: ${manifest.containerId}`);
        console.log(invalidProps);
        return;
    }

    console.log(`Validation success: ${manifest.containerId}`);
    console.log(`Total weight: ${normalizeUnits(manifest).weight} kg`);

}

processManifest(manifest);
