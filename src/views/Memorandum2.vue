<template>
    <div>
        <view-generator :name="name" :fields="fields" :model="model" :search="search" :orderOptions="orderOptions">
            <template v-slot:postSearch>
                <div>
                    <b-button class="mt-3 mr-3" variant="outline-primary" @click="last(7)">Últimos 7 días</b-button>
                    <b-button class="mt-3" variant="outline-primary" @click="last(30)">Último mes</b-button>
                </div>
            </template>
            <template v-slot:preList>
                <div>
                    Escribe una nueva entrada en el memorandum:
                    <form-generator :getter="model.getter" :mutation="model.mutation" :schema="model.schema" @input="handleModel()"></form-generator>
                </div>
            </template>
            <template v-slot:displayItem="{item}">
                <b-card class="mt-2">
                    <div class="author">{{item.author}}</div>
                    <div class="date">{{item.date | myDate}}</div>
                    <div class="text">
                        {{item.text}}
                    </div>
                    <b-button @click="edit(item._id)">editar</b-button>
                </b-card>
            </template>
        </view-generator>
    </div>   
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/es'
dayjs.locale('es')
import ViewGenerator from './ViewGenerator'
import FormGenerator from '../components/formify/FormGenerator'
import DatePicker from '../components/formify/Date'
import Text from '../components/formify/Text'
export default {
    components: {
        ViewGenerator,
        FormGenerator
    },
    filters: {
        myDate(date){
            return dayjs(date).format('ddd DD-MM-YYYY HH:mm')
        }
    },
    data: function(){
    return {
        name: 'memorandum',
        fields: ['text', 'author', 'date'],
        orderOptions: [
            {
                value: '-date', text: 'Fecha descendente'
            },
            {
                value: '+date', text: 'Fecha ascendente'
            },
        ],
        model: {
            getter: 'memorandum/getModel',
            mutation: 'memorandum/updateModel',
            schema: {
                date: {
                    component: DatePicker,
                    name: 'fecha'
                },
                text: {
                    component: Text,
                    errorMsg: 'El campo es obligatorio',
                    rule: 'required',
                    name: 'texto',
                    opts: {rows: "7"}, 
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
    edit(_id){
        this.$store.commit('memorandum/editItem', _id)
    },
    async handleModel(){
        const model = {...this.$store.getters['memorandum/item']}
        model.author = 'miguel'
        //model.date = model.date || new Date()
        //model.tea_id = this.$route.params._id
        if(!model._id){
            await this.$store.dispatch('memorandum/post', model)
        }else{
            await this.$store.dispatch('memorandum/patch', {_id: model._id, body: model})
        }
        this.$store.commit('memorandum/resetModel')
    },
    last(days){
        const dateInit = dayjs().subtract(days, 'day').format('YYYY-MM-DD')
        // eslint-disable-next-line
        this.$router.push({query: {dateInit}}).catch(err => {})
    }
  }
}
</script>

<style scoped lang="scss">

.author{
  //float: right;
  font-size: 14px;
  font-weight: 400;
}

.date{
    margin-top: 2px;
    font-size: 12px;
    font-weight: 400;
}

.text{
    margin-top: 10px;
    font-size: 12pt;
}
</style>