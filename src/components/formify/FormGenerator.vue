<template>
    <div>
        <ValidationObserver v-slot="{ valid }">
            <div v-for="key in keys" :key="key">
                <ValidationProvider :name="schema[key].name" :rules="schema[key].rule" v-slot="{ validate, errors }">                    
                    <b-form-group
                        :label="schema[key].placeholder"
                        :invalid-feedback="schema[key].errorMsg"
                        :state="state(errors)"
                    >
                        <component :getter="getter"
                                   @input="validate($event)"
                                   :mutation="mutation"
                                   :name="key" 
                                   :placeholder="schema[key].placeholder" 
                                   :is="schema[key].component" 
                                   :opts="schema[key].opts" 
                                   :state="state(errors)"></component>
                    </b-form-group>
                </ValidationProvider>
            </div>
            <b-button :disabled="!valid" @click="onSubmit">Submit</b-button>
        </ValidationObserver>
    </div>    
</template>

<script>
export default {
    props: ['schema', 'getter', 'mutation'],
    computed: {
        keys(){
            return Object.keys(this.schema)
        }
    },
    methods: {
        //handleInput(validate, v){
        //    validate(v)
        //},
        state(errors){
            return errors.length === 0? true: false
        },
        onSubmit(){
            this.$emit('input')
        }
    }
}
</script>

<style scoped>
    
</style>