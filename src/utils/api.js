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
    changePassword = (oldPassword, newPassword) => this.put('/api/user/password/restore', {oldPassword, newPassword});
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
    getAdminUsersAnswers = () => ({
        data: {
            answers: [
                {
                    answerId: 'asdasdasd-asdasd-asdasd-asdasdas',
                    taskId: 'asdfasdfsadfsdf-asdaas-asdasd-asdasdasd',
                    taskTitle: "Сложная задача",
                    taskDescription: "Какой-тоовеееееееееееееееееееер длиииииииии иииииииииииииииии ннннннн ннннннннннннннннн ыыы ыыыыыыыыыыыыыы йййййй тееееееееееееееееееееееееееееее ккккккккк к ккккккккккккккккккккккккккк с ттттттттттттттт",
                    taskTypeId: 1,
                    taskTypeName: 'Онлайн-задача',
                    answerText: null,
                    answerImageBase64: 'https://sun1-20.userapi.com/s/v1/ig2/NXYHbPYzfljTdzqOUW0hNxqxsf_UvNiFhk8d61CulKOj0FpbF1H8xm59TMfRJwa-uJSbSw-hWtYNMQBli_CQYRm3.jpg?size=100x0&quality=96&crop=0,0,1132,1132&ava=1',
                    timeGotten: '2023-10-17T12:00:00.000Z',
                    additionalPoints: 2,
                    taskAnswerTypeId: 0,
                    isConfirmed: null,
                },
                {
                    answerId: 'asdasdasd-asdasd-asdasd-asdasdas',
                    taskId: 'asdfasdfsadfsdf-asdaas-asdasd-asdasdasd',
                    taskTitle: "Сложная задача",
                    taskDescription: "Какой-тоовеееееееееееееееееееер длиииииииии иииииииииииииииии ннннннн ннннннннннннннннн ыыы ыыыыыыыыыыыыыы йййййй тееееееееееееееееееееееееееееее ккккккккк к ккккккккккккккккккккккккккк с ттттттттттттттт",
                    taskTypeId: 1,
                    taskTypeName: 'Онлайн-задача',
                    answerText: null,
                    answerImageBase64: 'https://sun1-20.userapi.com/s/v1/ig2/NXYHbPYzfljTdzqOUW0hNxqxsf_UvNiFhk8d61CulKOj0FpbF1H8xm59TMfRJwa-uJSbSw-hWtYNMQBli_CQYRm3.jpg?size=100x0&quality=96&crop=0,0,1132,1132&ava=1',
                    timeGotten: '2023-10-17T12:00:00.000Z',
                    additionalPoints: 2,
                    taskAnswerTypeId: 0,
                    isConfirmed: true,
                },
                {
                    answerId: 'asdasdasd-asdasd-asdasd-asdasdas',
                    taskId: 'asdfasdfsadfsdf-asdaas-asdasd-asdasdasd',
                    taskTitle: "Ye rfrjt-nj yfpdfybt",
                    taskDescription: "Какой-тоовеееееееееееееееееееер длиииииииии иииииииииииииииии ннннннн ннннннннннннннннн ыыы ыыыыыыыыыыыыыы йййййй тееееееееееееееееееееееееееееее ккккккккк к ккккккккккккккккккккккккккк с ттттттттттттттт",
                    taskTypeId: 1,
                    taskTypeName: 'Онлайн-задача',
                    answerText: "Какой-тоовеееееееееееееееееееер",
                    answerImageBase64: null,
                    timeGotten: '2023-10-17T12:00:00.000Z',
                    additionalPoints: 2,
                    taskAnswerTypeId: 0,
                    isConfirmed: false,
                },
                {
                    answerId: 'asdasdasd-asdasd-asdasd-asdasdas',
                    taskId: 'asdfasdfsadfsdf-asdaas-asdasd-asdasdasd',
                    taskTitle: "Ye rfrjt-nj yfpdfybt",
                    taskDescription: "Какой-тоовеееееееееееееееееееер длиииииииии иииииииииииииииии ннннннн ннннннннннннннннн ыыы ыыыыыыыыыыыыыы йййййй тееееееееееееееееееееееееееееее ккккккккк к ккккккккккккккккккккккккккк с ттттттттттттттт",
                    taskTypeId: 1,
                    taskTypeName: 'Онлайн-задача',
                    answerText: "Какой-тоовеееееееееееееееееееер",
                    answerImageBase64: null,
                    timeGotten: '2023-10-17T12:00:00.000Z',
                    additionalPoints: 2,
                    taskAnswerTypeId: 0,
                    isConfirmed: false,
                },
                {
                    answerId: 'asdasdasd-asdasd-asdasd-asdasdas',
                    taskId: 'asdfasdfsadfsdf-asdaas-asdasd-asdasdasd',
                    taskTitle: "Ye rfrjt-nj yfpdfybt",
                    taskDescription: "Какой-тоовеееееееееееееееееееер длиииииииии иииииииииииииииии ннннннн ннннннннннннннннн ыыы ыыыыыыыыыыыыыы йййййй тееееееееееееееееееееееееееееее ккккккккк к ккккккккккккккккккккккккккк с ттттттттттттттт",
                    taskTypeId: 1,
                    taskTypeName: 'Онлайн-задача',
                    answerText: "Какой-тоовеееееееееееееееееееер",
                    answerImageBase64: null,
                    timeGotten: '2023-10-17T12:00:00.000Z',
                    additionalPoints: 2,
                    taskAnswerTypeId: 0,
                    isConfirmed: false,
                },
                {
                    answerId: 'asdasdasd-asdasd-asdasd-asdasdas',
                    taskId: 'asdfasdfsadfsdf-asdaas-asdasd-asdasdasd',
                    taskTitle: "Ye rfrjt-nj yfpdfybt",
                    taskDescription: "Какой-тоовеееееееееееееееееееер длиииииииии иииииииииииииииии ннннннн ннннннннннннннннн ыыы ыыыыыыыыыыыыыы йййййй тееееееееееееееееееееееееееееее ккккккккк к ккккккккккккккккккккккккккк с ттттттттттттттт",
                    taskTypeId: 1,
                    taskTypeName: 'Онлайн-задача',
                    answerText: "Какой-тоовеееееееееееееееееееер",
                    answerImageBase64: null,
                    timeGotten: '2023-10-17T12:00:00.000Z',
                    additionalPoints: 2,
                    taskAnswerTypeId: 0,
                    isConfirmed: false,
                },
                {
                    answerId: 'asdasdasd-asdasd-asdasd-asdasdas',
                    taskId: 'asdfasdfsadfsdf-asdaas-asdasd-asdasdasd',
                    taskTitle: "Ye rfrjt-nj yfpdfybt",
                    taskDescription: "Какой-тоовеееееееееееееееееееер длиииииииии иииииииииииииииии ннннннн ннннннннннннннннн ыыы ыыыыыыыыыыыыыы йййййй тееееееееееееееееееееееееееееее ккккккккк к ккккккккккккккккккккккккккк с ттттттттттттттт",
                    taskTypeId: 1,
                    taskTypeName: 'Онлайн-задача',
                    answerText: "Какой-тоовеееееееееееееееееееер",
                    answerImageBase64: null,
                    timeGotten: '2023-10-17T12:00:00.000Z',
                    additionalPoints: 2,
                    taskAnswerTypeId: 0,
                    isConfirmed: false,
                },
                {
                    answerId: 'asdasdasd-asdasd-asdasd-asdasdas',
                    taskId: 'asdfasdfsadfsdf-asdaas-asdasd-asdasdasd',
                    taskTitle: "Ye rfrjt-nj yfpdfybt",
                    taskDescription: "Какой-тоовеееееееееееееееееееер длиииииииии иииииииииииииииии ннннннн ннннннннннннннннн ыыы ыыыыыыыыыыыыыы йййййй тееееееееееееееееееееееееееееее ккккккккк к ккккккккккккккккккккккккккк с ттттттттттттттт",
                    taskTypeId: 1,
                    taskTypeName: 'Онлайн-задача',
                    answerText: "Какой-тоовеееееееееееееееееееер",
                    answerImageBase64: null,
                    timeGotten: '2023-10-17T12:00:00.000Z',
                    additionalPoints: 2,
                    taskAnswerTypeId: 0,
                    isConfirmed: false,
                },
                {
                    answerId: 'asdasdasd-asdasd-asdasd-asdasdas',
                    taskId: 'asdfasdfsadfsdf-asdaas-asdasd-asdasdasd',
                    taskTitle: "Ye rfrjt-nj yfpdfybt",
                    taskDescription: "Какой-тоовеееееееееееееееееееер длиииииииии иииииииииииииииии ннннннн ннннннннннннннннн ыыы ыыыыыыыыыыыыыы йййййй тееееееееееееееееееееееееееееее ккккккккк к ккккккккккккккккккккккккккк с ттттттттттттттт",
                    taskTypeId: 1,
                    taskTypeName: 'Онлайн-задача',
                    answerText: "Какой-тоовеееееееееееееееееееер",
                    answerImageBase64: null,
                    timeGotten: '2023-10-17T12:00:00.000Z',
                    additionalPoints: 2,
                    taskAnswerTypeId: 0,
                    isConfirmed: false,
                },
                {
                    answerId: 'asdasdasd-asdasd-asdasd-asdasdas',
                    taskId: 'asdfasdfsadfsdf-asdaas-asdasd-asdasdasd',
                    taskTitle: "Ye rfrjt-nj yfpdfybt",
                    taskDescription: "Какой-тоовеееееееееееееееееееер длиииииииии иииииииииииииииии ннннннн ннннннннннннннннн ыыы ыыыыыыыыыыыыыы йййййй тееееееееееееееееееееееееееееее ккккккккк к ккккккккккккккккккккккккккк с ттттттттттттттт",
                    taskTypeId: 1,
                    taskTypeName: 'Онлайн-задача',
                    answerText: "Какой-тоовеееееееееееееееееееер",
                    answerImageBase64: null,
                    timeGotten: '2023-10-17T12:00:00.000Z',
                    additionalPoints: 2,
                    taskAnswerTypeId: 0,
                    isConfirmed: false,
                },
                {
                    answerId: 'asdasdasd-asdasd-asdasd-asdasdas',
                    taskId: 'asdfasdfsadfsdf-asdaas-asdasd-asdasdasd',
                    taskTitle: "Ye rfrjt-nj yfpdfybt",
                    taskDescription: "Какой-тоовеееееееееееееееееееер длиииииииии иииииииииииииииии ннннннн ннннннннннннннннн ыыы ыыыыыыыыыыыыыы йййййй тееееееееееееееееееееееееееееее ккккккккк к ккккккккккккккккккккккккккк с ттттттттттттттт",
                    taskTypeId: 1,
                    taskTypeName: 'Онлайн-задача',
                    answerText: "Какой-тоовеееееееееееееееееееер",
                    answerImageBase64: null,
                    timeGotten: '2023-10-17T12:00:00.000Z',
                    additionalPoints: 2,
                    taskAnswerTypeId: 0,
                    isConfirmed: false,
                },
                {
                    answerId: 'asdasdasd-asdasd-asdasd-asdasdas',
                    taskId: 'asdfasdfsadfsdf-asdaas-asdasd-asdasdasd',
                    taskTitle: "Ye rfrjt-nj yfpdfybt",
                    taskDescription: "Какой-тоовеееееееееееееееееееер длиииииииии иииииииииииииииии ннннннн ннннннннннннннннн ыыы ыыыыыыыыыыыыыы йййййй тееееееееееееееееееееееееееееее ккккккккк к ккккккккккккккккккккккккккк с ттттттттттттттт",
                    taskTypeId: 1,
                    taskTypeName: 'Онлайн-задача',
                    answerText: "Какой-тоовеееееееееееееееееееер",
                    answerImageBase64: null,
                    timeGotten: '2023-10-17T12:00:00.000Z',
                    additionalPoints: 2,
                    taskAnswerTypeId: 0,
                    isConfirmed: false,
                }
            ]
        },
        ok: true,
        code: 200,
    }); //this.get('/api/admin/answers');
    adminSetAnswerConfirmation = (answerId, isConfirmed) => this.put('/api/admin/answer/confirmation', {answerId, isConfirmed});
    uploadImage = (base64) => this.post('/api/image/upload', {base64});
    getTaskTypes = () => this.get('/api/task/types');
}
