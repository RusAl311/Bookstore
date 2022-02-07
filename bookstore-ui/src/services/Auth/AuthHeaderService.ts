export default function authHeader() {
    const token: any = JSON.parse(localStorage.getItem('token') ?? 'null');

    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return { Authorization: 'Bearer ' + ' ' };
    }
}
