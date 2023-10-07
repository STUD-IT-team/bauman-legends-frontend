import REST_API from "./REST_API"

export default class API extends REST_API {
    login = (email, password, clientBrowser, clientOS) => this.post('/api/user/auth', {email, password, clientBrowser, clientOS});
    register = (name, group, tg, vk, email, phone, password, clientBrowser, clientOS) => this.post('/api/user', {name, group, tg, vk, email, phone, password, clientBrowser, clientOS});
    logout = () => this.delete('/api/user/session');
    getAllSessions = () => this.get('/api/sessions');
    logoutAnother = () => this.delete('/api/user/sessions/another');
    getUser = () => ({
        data: {
            id: 1,
            name: "Тяпкин Сергей Серегевич",
            group: "РК2-11М",
            tg: "tyapkin_s",
            vk: "tyapkin_s",
            email: "tyapkin2002@mail.ru",
            phone: "89160932860",
        },
        code: 200,
        ok: true,
    })//this.get('/api/user');
    getUserById = (id) => this.get(`/api/user/${id}`);
    sendConfirmationLetter = (name, email) => this.post('/api/email/confirm', {name, email});
    confirmRegistrationByCode = (secretCode) => this.put('api/user/email/confirm', {secretCode});
    changePassword = (oldPassword, newPassword) => this.put('api/user/password/restore', {oldPassword, newPassword});
    editProfile = (name, group, tg, vk, email, phone) => this.put('api', {name, group, tg, vk, email, phone});
    sendRestorePasswordLetter = (secretCode, newPassword) => this.post('api/user/password/restore', {secretCode, newPassword});
    restorePassword = (secretCode, newPassword) => this.put('api/user/password', {secretCode, newPassword});
    authCode = (secretCode, clientBrowser, clientOS) => this.post('api/user/auth/code', {secretCode, clientBrowser, clientOS});
    createTeam = (name) => this.post('api/team', {name});
    editTeam = (name) => this.put('api/team', {name});
    getTeam = () => ({
        data: {

        },
        code: 200,
        ok: true,
    })// this.get('/api/team');
    deleteTeam = () => this.delete('/api/team');
    addMember = (id) => this.post(`/api/team/join/${id}`);
    deleteMember = (id) => this.delete(`/api/team/join/${id}`);
    setMemberRole = (userId, roleId) => this.put(`/api/team/member/${userId}`, {roleId});
    getTask = () => this.get('/api/task');
    takeTask = (taskTypeId) => this.post('/api/task/take', {taskTypeId});
    getHint = () => this.get('/api/task/hint');
    answerTask = (answer) => this.post('/api/task/answer', {answer});
    answerSecret = (answer) => this.post('/api/answer/secret_task', {answer});
    getAdminData = () => this.get('/api/admin');
}
