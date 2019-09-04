export default {
    created(){
        //this.$store.dispatch('tea/fetchOne', this.$route.params._id)
        const query = {...this.$route.query, fields: this.fields}
        this.$store.dispatch(this.name + '/fetch', {tea_id: this.$route.params._id, ...query})
    },
    watch: {
        '$route'(to){
            const query = {...to.query, fields: this.fields}
            this.$store.dispatch(this.name + '/fetch', {tea_id: this.$route.params._id, ...query})
        }
    },
    computed: {
        items(){
            return this.$store.getters[this.name + '/items']
        }
    },
    methods: {
        handleSearch(){
            const query = this.$store.getters[this.name + '/search']
            this.$router.replace({query})
        }
    }
}