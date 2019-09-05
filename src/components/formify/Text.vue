<template>
    <div>
        <b-form-textarea v-model="x" v-bind="opts"></b-form-textarea>
    </div>
</template>

<script>
 
export default {
    props: ['name', 'value', 'state', 'placeholder', 'getter', 'mutation', 'opts', 'validate'],
    computed: {
        x: {
            get(){
                return this.$store.getters[this.getter](this.name)
            },
            set(v){
                this.$store.commit(this.mutation, {name: this.name, value: v})
                //this.$emit('input', v)
            }
        }
    },
    watch: {
        x(newVal){
            this.validate(newVal)
        }
    }
}
</script>