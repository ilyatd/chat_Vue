Vue.component('history-comp', {
    props: ['history'],
    updated(){
        let parents = document.getElementsByClassName('chat__messages__history');
        for (let parent of parents) {
            let lastChild = parent.lastElementChild;
            if (lastChild) {
                lastChild.scrollIntoView();
            }
        };
    },
    template: `
        <div class="chat__messages__history">
            <message-comp v-for="message in history" :key="message.messageId" :message="message"></message-comp>
        </div>
    `
});

Vue.component('message-comp', {
    props: ['message'],
    computed: {
        addSelfClass() {
            if (this.message.sender === 'Я') {
                return 'chat__messages__history__message_self'
            } else return ''
        }
    },
    template: `
        <div class="chat__messages__history__message" :class="addSelfClass">
            <p class="chat__messages__history__message_sender">{{message.sender}}</p>
            <p class="chat__messages__history__message_text">{{message.text}}</p>
            <p class="chat__messages__history__message_date">{{message.date}}</p>
        </div>
    `
});