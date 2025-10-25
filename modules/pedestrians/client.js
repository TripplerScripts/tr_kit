function callback() {
    return exports.tr_lib.callback()
}

onNet('getPedScenario', (ped, scenario) => {
    try {
        TaskStartScenarioInPlace(ped, scenario.name, scenario.timeToLeave, scenario.playIntroClip);
    } catch (error) {
        console.error(`Failed to set scenario: ${error}`);
    }
});

function createSinglePed(model, coords, scenario, isAccessPublic, isControlPublic) {
    return callback().awaitServer('createSinglePed', null, model, coords, scenario, isAccessPublic, isControlPublic)
}

function createMultiplePeds(peds, defaultSettings) {
    return callback().awaitServer('createMultiplePeds', null, peds, defaultSettings)
}

function clearCreatedPed(entity) {
    return callback().awaitServer('clearCreatedPed', null, entity)
}

function clearCreatedPeds(entities) {
    return callback().awaitServer('clearCreatedPeds', null, entities)
}

exports('createSinglePed', createSinglePed)
exports('createMultiplePeds', createMultiplePeds)
exports('clearCreatedPed', clearCreatedPed)
exports('clearCreatedPeds', clearCreatedPeds)