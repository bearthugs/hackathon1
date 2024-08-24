import axios from 'axios';

export async function getAuthentication() {
    let response;
    response = await axios.post('http://127.0.0.1:5000/authentication', { message: 'get authentication' })
    return response
}

export async function giveInfo(player, time, song, difficulty) {
    let response;
    response = await axios.post('http://127.0.0.1:5000/create_room', { players: player, time: time, songs: song, difficulty: difficulty })
    return response
}