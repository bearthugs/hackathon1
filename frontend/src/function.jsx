import axios from 'axios';
import Cookies from "js-cookie";

export async function getAuthentication() {
    let response;
    response = await axios.post('http://127.0.0.1:5000/authentication', { message: 'get authentication' })
    return response
}

export async function checkRoomId(code) {
    let response;
    response = await axios.post('http://127.0.0.1:5000/join', { room_id: code })
    return response
}

export async function giveInfo(player, time, song, difficulty) {
    let response;
    const sessionid = Cookies.get('session_id');
    response = await axios.post('http://127.0.0.1:5000/create_room',
        {
            players: player,
            time: time,
            songs: song,
            difficulty: difficulty,
            sid: sessionid
        },
        {
            Credentials: 'include' // Include cookies in the request
        });
    return response;
}

export async function startGame() {
    let response;
    response = await axios.get('http://127.0.0.1:5000/start')
    return response
}
