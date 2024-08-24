import axios from 'axios';

export async function getAuthentication() {
    let response;
    response = await axios.post('http://localhost:5050/authentication', { message: 'get authentication' })
    return response
}