Vue.component('contacts-comp', {
    props: ['userActive' ,'avatar', 'contacts'],
    template: `
        <div class="chat__contacts">
            <div class="chat__contacts__self">
                <img :src="avatar" width="30" height="30" alt="avatar"></img>
            </div>
            <div class="chat__contacts_box">
                <contact-comp v-for="contact in contacts" :key="contact.name" :contact="contact" :userActive="userActive"></contact-comp>
            </div>
        </div>
    `
});

Vue.component('contact-comp', {
    props: ['userActive' ,'contact'],
    methods: {
        changeActiveContact() {
            let activateUser = {
                user: this.userActive,
                contact: this.contact.name
            };
            store.commit('changeActiveContact', activateUser);
            this.$parent.$parent.activeContact = this.contact;
            this.$parent.$parent.inChat = true;
            this.$parent.$parent.clickInContacts();
        }
    },
    template: `
        <div class="chat__contacts__contact" :class="contact.isActive" @click="changeActiveContact">
            <img class="chat__contacts__contact_avatar" :src="contact.avatar" width="20" height="20" alt="avatar">
            <p class="chat__contacts__contact_name">{{contact.name}}</p>
        </div>
    `
});