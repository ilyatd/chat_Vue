Vue.component('user-comp', {
    props: ['user',],
    data() {
        return {
            activeContact: Object,
            textMessage: '',
            inChat: false,
            showContacts: {},
            showMessages: {}
        }
    },
    methods: {
        sendMessage(){
            let message = {
                sender: this.user.name,
                recipient: this.activeContact.name,
                text: this.textMessage
            };
           store.commit('addHistory', message);
           this.textMessage = '';
        },
        clickInMessages() {
            this.showContacts = {
                "z-index": 2
            }
            this.showMessages = {
                "z-index": 1
            }
        },
        clickInContacts() {
            this.showContacts = {
                "z-index": 1
            }
            this.showMessages = {
                "z-index": 2
            }
        }
    },
    template: `
        <div class="chat">
            <contacts-comp :avatar="user.avatar" :contacts="user.contacts" :userActive="user.name" :style="showContacts"></contacts-comp>
            <div class="chat__messages" :style="showMessages">
                <h1 class="chat__messages_title" v-if="inChat"><i class="fas fa-arrow-left change-window" @click="clickInMessages"></i>  {{activeContact.name}}</h1>
                <history-comp :history="activeContact.history" v-if="inChat"></history-comp>
                <div class="chat__messages__type-box" v-if="inChat">
                    <input class="chat__messages__type-box_input" v-model="textMessage" @keyup.enter="sendMessage"></input>
                    <button class="chat__messages__type-box_submit" @click="sendMessage"><i class="fas fa-arrow-alt-circle-right"></i></button>
                </div>
            </div>
        </div>
    `
});