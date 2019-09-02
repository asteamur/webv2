<template>
    <div>
        <b-form-input :placeholder="placeholder" v-model="x" :state="state"></b-form-input>
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