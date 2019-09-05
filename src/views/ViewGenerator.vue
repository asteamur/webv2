<template>
  <b-container>
    <b-row align-h="center">      
      <b-col sm="8">
        <div>
            <b-card>
                <b-button v-b-toggle.collapse-search variant="primary">Filtros de búsqueda</b-button>
                <b-collapse id="collapse-search" class="mt-2">
                    <form-generator :getter="search.getter" :mutation="search.mutation" :schema="search.schema" @input="handleSearch()"></form-generator>
                </b-collapse>
                <slot name="postSearch"></slot>
            </b-card>
            <hr>
            <slot name="preList"></slot>
            <div>
                Criterio de ordenación
                <b-form-select v-model="order" :options="orderOptions"></b-form-select>
            </div>
            <div v-for="item in items" :key="item._id">
                <slot name="displayItem" v-bind:item="item"></slot>
            </div>    
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FormGenerator from '../components/formify/FormGenerator'
import apiMixin from '../mixins/apiMixin'

export default {
  name: 'ViewGenerator',
  props: {
    search: Object,
    name: String,
    fields: Array,
    orderOptions: Array
  },
  data(){
      return {
          order: null
      }
  },
  mixins: [apiMixin],
  components: {
    FormGenerator
  },
  watch: {
      order(newVal){
          this.$router.replace({query: {...this.$route.query, page: 1, sort: newVal}})//.catch(err => {})
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
