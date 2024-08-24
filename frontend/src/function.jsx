import axios from 'axios';

export async function getAuthentication() {
    let response;
    response = await axios.post('http://127.0.0.1:5000/authentication', { message: 'get authentication' })
    return response
}

export async function checkRoomId(code) {
    console.log(code)
    let response;
    response = await axios.post('http://127.0.0.1:5000/join', { room_id: code })
    return response
}
