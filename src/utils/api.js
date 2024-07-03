import REST_API from "./REST_API"

export default class API extends REST_API {
    login = (email, password, clientBrowser, clientOS) => this.post('/api/user/auth', {email, password, clientBrowser, clientOS});
    register = (name, group, telegram, vk, email, phone_number, password, clientBrowser, clientOS) => this.post('/api/user', {name, group, telegram, vk, email, phone_number, password, clientBrowser, clientOS});
    logout = () => this.delete('/api/user/session');
    getAllSessions = () => this.get('/api/sessions');
    logoutAnother = () => this.delete('/api/user/sessions/another');
    getUser = () => this.get('/api/user');
    getUserById = (id) => this.get(`/api/user`, {id});
    sendConfirmationLetter = (name, email) => this.post('/api/email/confirm', {name, email});
    confirmRegistrationByCode = (secretCode) => this.put('/api/user/email/confirm', {secretCode});
    changePassword = (oldPassword, newPassword) => this.put('/api/user/password', {oldPassword, newPassword});
    editProfile = (name, group, telegram, vk, email, phone_number) => this.put('/api/user', {name, group, telegram, vk, email, phone_number});
    sendRestorePasswordLetter = (secretCode, newPassword) => this.post('/api/user/password/restore', {secretCode, newPassword});
    restorePassword = (secretCode, newPassword) => this.put('/api/user/password', {secretCode, newPassword});
    authCode = (secretCode, clientBrowser, clientOS) => this.post('/api/user/auth/code', {secretCode, clientBrowser, clientOS});
    createTeam = (name) => this.post('/api/team', {name});
    editTeam = (name) => this.put('/api/team', {name});
    getTeam = () => this.get('/api/team');
    deleteTeam = () => this.delete('/api/team');
    addMember = (id) => this.post(`/api/team/invite`, {id});
    deleteMember = (id) => this.delete(`/api/team/member`, {id});
    setMemberRole = (id, roleId) => this.put(`/api/team/member`, {id, roleId});
    getTask = () => this.get('/api/task');
    takeTask = (taskTypeId) => this.post('/api/task/take', {taskTypeId});
    getHint = () => this.get('/api/task/hint');
    answerTask = (text, imageUrl) => this.post('/api/task/answer', {text, imageUrl});
    answerSecret = (answer) => this.post('/api/answer/secret_task', {answer});
    getAdminUsersAnswers = () => this.get('/api/admin/answers');
    adminSetAnswerConfirmation = (answerId, isConfirmed) => this.put('/api/admin/answer/confirmation', {answerId, isConfirmed});
    uploadImage = (base64) => this.post('/api/image/upload', {base64});
    getTaskTypes = () => this.get('/api/task/types');
}
