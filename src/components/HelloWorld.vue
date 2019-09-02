<template>
  <div class="hello">
    <form-generator :getter="getter" :mutation="mutation" :schema="schema" @input="handle()"></form-generator>
  </div>
</template>

<script>

import StringInput from './formify/String'
import Text from './formify/Text'
import Check from './formify/Check'
import FormGenerator from './formify/FormGenerator'
import DatePicker from './formify/Date'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function(){
    return {
      getter: 'tea/getModel',
      mutation: 'tea/updateModel',
      schema: {
        str: {
          component: StringInput, 
          rule: 'required', 
          name: 'str', 
          placeholder: 'Introduce un email', 
          errorMsg: "Este campo es un email obligatorio"
        },
        text: {
          component: Text,
          placeholder: 'texto largo'
        },
        flag: {
          component: Check,
          placeholder: 'verdad o mentira?'
        },
        date: {
          component: DatePicker, 
          placeholder: 'Introduce la fecha de tu cumpleaños', 
          opts: {initialView: 'year'}, 
          name: 'fecha'
         }
      }
    }
  },
  methods: {
    handle(){
      const item = this.$store.getters['tea/item']
      console.log(item)
    }
  },
  components: {
    FormGenerator
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
