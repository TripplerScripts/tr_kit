fx_version 'cerulean'
game 'gta5'
dependencies {
    'tr_lib',
}

author 'Trippler'
version '0.0.1'

shared_scripts {
    'utils/print.js',
}
server_scripts {
    'modules/pedestrians/server.js',
}
client_scripts {
    'modules/pedestrians/client.js'
}