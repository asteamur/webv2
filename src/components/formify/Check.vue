<template>
    <div>
        <b-form-checkbox v-model="x"></b-form-checkbox>
    </div>
</template>

<script>
 
export default {
    props: ['name', 'value', 'state', 'placeholder', 'getter', 'mutation'],
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