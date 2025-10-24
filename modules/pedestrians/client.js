exports.tr_lib.callback().register('getPedScenario', (ped, scenario) => {
    try {
        TaskStartScenarioInPlace(ped, scenario.name, scenario.timeToLeave, scenario.playIntroClip);
        return [true, 'success'];
    } catch (error) {
        return [false, error.message];
    }
});