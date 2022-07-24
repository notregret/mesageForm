<template>
  <div id="catalog">
    <MessageForm ref="MessageForm" v-show="showForm" :visible="showForm"/>
    <div v-show="!showForm">
        <h1>
            Реестр форм
        </h1>
        <b-button pill class="button3" @click="showOnAdd"><b-icon-plus></b-icon-plus></b-button>
        <b-button pill class="button3" @click="showOnEdit"><b-icon-pencil></b-icon-pencil></b-button>
        <b-table :items="items"
                :fields="fields"
                hover
                selectable
                select-mode="single"
                @row-clicked="rowClicked">

        </b-table>
    </div>
  </div>
</template>

<script>
import MessageForm from '../components/MessageForm.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    MessageForm
  },
  data () {
   return {
     rowIndex: null,
   showForm: false,
   items:[
   ],
   fields: ['id', 'name']
   }
   },
   watch: {

   },
  mounted() {
    this.renderCatalog();
  },
  methods: {
    rowClicked(item){
      this.rowIndex = item.id
    },
     renderCatalog(){
       this.items = [];
       const vm = this;
       vm.$wait.start('render');
       axios({
         method: "get",
         url: "http://localhost:5050/api/device/"
       }).then((resp) => {
         if (resp.status == 200) {
           resp.data.forms.forEach(x => {
             this.items.push(x)
           })
           this.$refs["MessageForm"].options = resp.data.channels;
           vm.$wait.end('render');
         }
       })
     },
     showOnEdit(){
       this.$refs["MessageForm"].renderForm(this.rowIndex);
       this.$refs["MessageForm"].isEdit = true;

     },
    showOnAdd(){
      this.showForm = !this.showForm;
      this.$refs['MessageForm'].isEdit = false;

    }
   }



}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
