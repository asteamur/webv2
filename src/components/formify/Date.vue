<template>
    <div>
        <datepicker v-model="x" v-bind="opts"></datepicker>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
 
export default {
    props: ['name', 'value', 'state', 'placeholder', 'getter', 'mutation', 'opts'],
    components: {
        Datepicker
    },
    computed: {
        x: {
            get(){
                return this.$store.getters[this.getter](this.name)
            },
            set(v){
                this.$store.commit(this.mutation, {name: this.name, value: v})
                this.$emit('input', v)
            }
        }
    }
}
</script>