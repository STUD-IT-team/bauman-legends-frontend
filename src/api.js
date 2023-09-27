import REST_API from "./REST_API.js"

export default class API extends REST_API {
    login = (email, password, clientBrowser, clientOS) => this.post('/api/user/auth/', {email, password, clientBrowser, clientOS});
    register = (name, group, tg, vk, email, phone, password, clientBrowser, clientOS) => this.post('/api/user/', {name, group, tg, vk, email, phone, password, clientBrowser, clientOS});
    logout = () => this.delete('/api/user/session/');
    myProfile = () => this.get('/api/user/');
}