import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'

var myVue = new Vue({
    el: '#app',
    data() {
        return {
            form: {
                name: '',
                value: ''
            },
            contacts: [{id: Date.now(), name: 'User', value: '9595959595', marked: false}]
        }
    },
    computed: {
        canCreate() {
            return this.form.value.trim() && this.form.name.trim()
        }
    },
    methods:{
        createContact() {
            const{...contact} = this.form
            this.contacts.push({...contact, id: Date.now(), marked: false })
            this.form.name = this.form.value = ''
        },
        markContact(id){
            const contact = this.contacts.find(c => c.id === id)
            contact.marked = true
        },
        removeContact(id){
            console.log(this.contacts)
            this.contacts = this.contacts.filter(c => c.id !== id)
        }
    }
})
