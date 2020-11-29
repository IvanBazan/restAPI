import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'

Vue.component('loader', {
    template: `
        <div style="display: flex; justify-content: center; align-items: center"> 
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    `})


new Vue({
    el: '#array-rendering',
    data() {
        return {
            loading: false,
            search: [],
            selected: '',
            indexList: [],
            data: [],
        };
    },
    computed: {
        indexList_f: function() {
            let filtered = this.indexList.filter(indexList => indexList.indexOf(this.search) !== -1)
            filtered = filtered.sort()
            return (filtered.length > 10) ? filtered.slice(0, 10) : filtered
        },
    },
    mounted() {
        this.getIndexList()
    },
    methods: {
        async getIndexList() {
            this.loading = true
            this.indexList = await request('http://127.0.0.1:8000/getIDList')
            this.loading = false
        },
        async getDataById(id) {
            let result = await request('http://127.0.0.1:8000/getData/' + id)
            this.data.push(result)
        },
        changeSearch(text) {
            this.selected = text
            this.data.pop()
            this.getDataById(text)
        }
    },
})


async function request(url, method = 'GET', data = null){
    try {
        const headers = {}
        let body
        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }
        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e) {
        console.warn('Error: ', e.message)
    }
}

// new Vue({
//     el: '#app',
//     data() {
//         return {
//             loading: false,
//             form: {
//                 name: '',
//                 value: ''
//             },
//             contacts: [{id: Date.now(), name: 'User', value: '9595959595', marked: false}]
//         }
//     },
//     computed: {
//         canCreate() {
//             return this.form.value.trim() && this.form.name.trim()
//         }
//     },
//     methods:{
//         createContact() {
//             const{...contact} = this.form
//             this.contacts.push({...contact, id: Date.now(), marked: false })
//             this.form.name = this.form.value = ''
//         },
//         markContact(id){
//             const contact = this.contacts.find(c => c.id === id)
//             contact.marked = true
//         },
//         removeContact(id){
//             console.log(this.contacts)
//             this.contacts = this.contacts.filter(c => c.id !== id)
//         }
//     }
// })