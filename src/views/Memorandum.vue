<template>
  <b-container>
    <b-row align-h="center">      
      <b-col sm="8">
        <div class="memorandum">
            <form-generator :getter="search.getter" :mutation="search.mutation" :schema="search.schema" @input="handleSearch()"></form-generator>
            <b-button variant="outline-primary" @click="last(7)">Últimos 7 días</b-button>
            <b-button variant="outline-primary" @click="last(30)">Último mes</b-button>    
            <hr>
            <form-generator :getter="model.getter" :mutation="model.mutation" :schema="model.schema" @input="handleModel()"></form-generator>
            <div v-for="mem in items" :key="mem._id">
                <div>{{mem._id}}</div>
                <div>{{mem.text}}</div>
                <div>{{mem.author}}</div>
                <div>{{mem.date}}</div>
            </div>    
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import dayjs from 'dayjs'
import Text from '../components/formify/Text'
import FormGenerator from '../components/formify/FormGenerator'
import DatePicker from '../components/formify/Date'
import apiMixin from '../mixins/apiMixin'

export default {
  name: 'Memorandum',
  props: {
    msg: String
  },
  mixins: [apiMixin],
  data: function(){
    return {
        name: 'memorandum',
        fields: ['text', 'author', 'date'],
        model: {
            getter: 'memorandum/getModel',
            mutation: 'memorandum/updateModel',
            schema: {
                text: {
                    component: Text,
                    rule: 'required',
                    name: 'texto'
                }
            }
        },
        search: {
            getter: 'memorandum/getSearch',
            mutation: 'memorandum/updateSearch',
            schema: {
                dateInit: {
                    component: DatePicker, 
                    placeholder: 'Fecha de inicio', 
                    name: 'fechaInicio'
                },
                dateEnd: {
                    component: DatePicker, 
                    placeholder: 'Fecha fin', 
                    name: 'fechaFin'
                }
            }   
        }
    }
  },
  methods: {
    handleModel(){
        const model = {...this.$store.getters['memorandum/item']}
        model.author = 'miguel'
        model.date = new Date()
        //model.tea_id = this.$route.params._id
        console.log(model)
        this.$store.dispatch('memorandum/post', model)
        this.$store.commit('memorandum/resetModel')
    },
    last(days){
        const dateInit = dayjs().subtract(days, 'day').format('YYYY-MM-DD')
        this.$router.replace({query: {dateInit}})
    }
  },
  components: {
    FormGenerator
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
