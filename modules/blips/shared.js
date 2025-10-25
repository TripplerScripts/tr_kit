function createBlip(coords, icon) {
    coords = JSON.parse(coords)
    const blipHandle = AddBlipForCoord(coords.x, coords.y, coords.z);
    SetBlipSprite(blipHandle, icon);
    return blipHandle
}

exports('createBlip', createBlip)