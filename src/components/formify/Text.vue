<template>
    <div>
        <b-form-textarea v-model="x"></b-form-textarea>
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