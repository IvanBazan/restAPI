import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'

Vue.component('loader', {
    template: `
        <div style="display: flex; justify-content: center; align-items: center"> 
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    `
})


new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
            search: '',
            selected: '',
            indexList: [],
            data: [],
        };
    },
    computed: {
        indexList_f: function() {
            let filtered = this.indexList.filter(indexList => indexList.toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
            filtered = filtered.sort()
            const filteredLength = filtered.length
            return {shortList:(filteredLength > 10) ? filtered.slice(0, 10) : filtered, filteredLength: filteredLength}
        }
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
        selectId(id) {
            this.selected = id
            this.data.pop()
            this.getDataById(id)
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