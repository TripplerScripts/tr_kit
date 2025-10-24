function createSinglePed(model, coords, scenario, isAccessPublic, isControlPublic) {
    if (typeof model !== 'string') {
        print().debug(`wrong type on the first argument, expected string of hash received ${typeof model}`)
    }

    if (
        typeof coords !== 'object' ||
        coords == null ||
        coords.x == null || coords.y == null ||
        coords.z == null || coords.w == null
    ) {
        print().err(`wrong type or missing a value on the second argument, (type: ${typeof coords}, values: x:${coords?.x}, y:${coords?.y}, z:${coords?.z}, w:${coords?.w})`)
        return;
    }

    const ped = CreatePed(null, model || 'ig_talcc', coords.x, coords.y, coords.z, coords.w, !!isAccessPublic, !!isAccessPublic && !isControlPublic);
    if (typeof scenario === 'object' && scenario != null) {
        exports.tr_lib.callback().awaitClient('getPedScenario', 1, 1000, ped, scenario).then(([result, message]) => {
            if (message != null) {
                print().inf(`task request was ${message}, status ${result}`);
            }
        }).catch(error => {
            print().err('Failed to set scenario:', error);
        });
    }
    on('onResourceStop', (resourceName) => {
        if (GetCurrentResourceName() == resourceName) {
            clearCreatedPed(ped)
        }
    })
    return ped;
}

function createMultiplePeds(peds, defaultSettings) {
    if (!Array.isArray(peds) || peds.length === 0) {
        print().err('expected an array of peds, received data will not be processed')
        return [];
    }

    const created = [];
    for (let i = 0; i < peds.length; i++) {
        const ped = peds[i];
        if (!ped || typeof ped.model !== 'string') {
            ped.model = defaultSettings.model;
        }
        const coords = ped.coords;
        if (!coords || coords.x == null || coords.y == null || coords.z == null || coords.w == null) {
            print().debug(`unproper vector received for ped index number ${i} with x:${coords.x}, y:${coords.y}, z:${coords.z}, w:${coords.w}, processing to the next index`);
            continue;
        }

        if (typeof ped.scenario !== 'object') {
            ped.scenario = defaultSettings.scenario;
        }
        
        if (ped.isAccessPublic == null) {
            ped.isAccessPublic = defaultSettings.isAccessPublic;
        }
        
        if (ped.isControlPublic == null) {
            ped.isControlPublic = defaultSettings.isControlPublic;
        }

        const createdPed = createSinglePed(ped.model, coords, ped.scenario, ped.isAccessPublic, ped.isControlPublic);
        if (createdPed) created.push(createdPed);
    }

    return created;
}

function clearCreatedPed(entity) {
    if (typeof entity !== 'number') {
        print().debug(`received ${typeof entity} instead of a number, if you passed an array of number to delete multiple peds, please use clearCreatedPeds instead of clearCreatePeds`)
    }
    DeleteEntity(entity);
}

function clearCreatedPeds(entities) {
    if (typeof entities !== 'array') {
        print().debug(`received ${typeof entity} instead of a array, if you passed number to delete a single ped, please use clearCreatedPed instead of clearCreatePed`)
    }

    for (let i = 0; i < entities.length; i++) {
        DeleteEntity(entities[i]);
    }
}

exports('createSinglePed', createSinglePed)
exports('createMultiplePeds', createMultiplePeds)
exports('clearCreatedPed', clearCreatedPed)
exports('clearCreatedPeds', clearCreatedPeds)