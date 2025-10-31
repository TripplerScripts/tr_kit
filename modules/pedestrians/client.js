const lib = exports.tr_lib.require('@tr_lib/init')

onNet('getPedScenario', (ped, scenario) => {
    try {
        TaskStartScenarioInPlace(ped, scenario.name, scenario.timeToLeave, scenario.playIntroClip);
    } catch (error) {
        console.error(`Failed to set scenario: ${error}`);
    }
});

function createSinglePed(model, coords, scenario, isAccessPublic, isControlPublic) {
    return lib.callback.await('createSinglePed', null, model, coords, scenario, isAccessPublic, isControlPublic)
}

function createMultiplePeds(peds, defaultSettings) {
    return lib.callback.await('createMultiplePeds', null, peds, defaultSettings)
}

function clearCreatedPed(entity) {
    return lib.callback.await('clearCreatedPed', null, entity)
}

function clearCreatedPeds(entities) {
    return lib.callback.await('clearCreatedPeds', null, entities)
}

exports('createSinglePed', createSinglePed)
exports('createMultiplePeds', createMultiplePeds)
exports('clearCreatedPed', clearCreatedPed)
exports('clearCreatedPeds', clearCreatedPeds)