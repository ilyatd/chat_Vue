const store = new Vuex.Store({
    state: {
        users: [
            {
                name: 'Петр Петров',
                pass: 'img/petr-petrov.jpg',
                avatar: 'img/petr-petrov.jpg',
                contacts: [
                    {
                        isActive: '',
                        name: 'Я',
                        avatar: 'img/petr-petrov.jpg',
                        history: []
                    },
                    {
                        isActive: '',
                        name: 'Иван Иванов',
                        avatar: 'img/ivan-ivanov.jpg',
                        history: []
                    }
                ]
            },
            {
                name: 'Иван Иванов',
                pass: 'img/ivan-ivanov.jpg',
                avatar: 'img/ivan-ivanov.jpg',
                contacts: [
                    {
                        isActive: '',
                        name: 'Я',
                        avatar: 'img/ivan-ivanov.jpg',
                        history: []
                    },
                    {
                        isActive: '',
                        name: 'Петр Петров',
                        avatar: 'img/petr-petrov.jpg',
                        history: []
                    }
                ]
            },
        ],
        autorization: {
            status: false,
            userIndex: Number,
            errorLogin: false
        }
    },
    getters: {
        /**
         * функция возвращает индекс пользователя отличного от авторизованного
         * для заполнения второго окна чата
         * @param {Object} state 
         */
        otherUser(state){
            return state.users.findIndex((user, index) => {
                if (index !== state.autorization.userIndex) {
                    return true
                } else return false
            })
        }
    },
    mutations: {
        /**
         * авторизации пользователя 
         * меняет статус авторизации
         * принимает объект с полями name и pass
         * получает индекс авторизованного пользователя
         * @param {Object} state 
         * @param {Object} userData 
         */
        userLogin(state, userData){
            state.autorization.userIndex = state.users.findIndex( user => {
                if (userData.name === user.name && userData.pass === user.pass) {
                    state.autorization.status = true;
                    state.autorization.errorLogin = false;
                    return true
                } else return false
            });
            if (state.autorization.userIndex === -1){
                state.autorization.errorLogin = true;
            }
        },
        addHistory(state, message){
            let date = new Date();
            let dateOptions = {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            };
            let historySender = {
                messageId: Number,
                sender: 'Я',
                text: message.text,
                date: date.toLocaleString("ru", dateOptions)
            };
            let historyRecipient = {
                messageId: Number,
                sender: message.sender,
                text: message.text,
                date: date.toLocaleString("ru", dateOptions)
            };
            // пополнение истории сообщений отправителя
            for (let user of state.users) { 
                if (user.name === message.sender) {
                    for (let contact of user.contacts) {
                        if (contact.name === message.recipient) {
                            historySender.messageId = contact.history.length;
                            contact.history.push(historySender);
                        }
                    };
                }
            }
            // пополнение истории сообщений получателя
            for (let user of state.users) {
                if (user.name === message.recipient) {
                    for (let contact of user.contacts) {
                        if (contact.name === message.sender) {
                            historyRecipient.messageId = contact.history.length;
                            contact.history.push(historyRecipient);
                        }
                    };
                }
            }
        },
        /**
         * функция меняет активный контакт в списке контактов пользователя
         * при клике на него
         * принимает объект с полями:
         * user - имя пользователя, выбирающего активный контакт
         * contact - выбранный контакт
         * @param {Object} state 
         * @param {Object} activateUser 
         */
        changeActiveContact(state, activateUser) {
            // получение индекса текущего пользователя
            let indexUser = state.users.findIndex(user => {
                if (user.name === activateUser.user) {
                    return true
                } else false
            });
            // смена статуса активного пользователя
            state.users[indexUser].contacts.forEach(contact => {
                if (contact.name === activateUser.contact && contact.isActive !== 'active') {
                    contact.isActive = 'active';
                } else if (contact.name !== activateUser.contact && contact.isActive === 'active') {
                    contact.isActive = '';
                }
            });
        }
    }
});