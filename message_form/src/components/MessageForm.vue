<template>
  <div class="main_form" v-show="visible">
     <div class="container">
    <Multiselect v-model="mainChannels"
               :options="options"
               :multiple="true"
               :close-on-select="false"
               :clear-on-select="false"
               :preserve-search="true"
               placeholder="Pick some"
               label="name"
               track-by="name"
               :preselect-first="true"
               class="multiselect"/>
         <div class="buttons">
            <b-button pill class="add_button" @click="openModal"><b-icon-plus></b-icon-plus></b-button>
            <b-button pill class="edit_button" @click="openOnEdit"><b-icon-pencil></b-icon-pencil></b-button>
         </div>
         <div class="channels_forms">
           <b-button  v-for="(form, index) in channelsForms" :key="'forms' + index"  variant="light" @click="messageIndex = index">
             <h3>{{form.name}}</h3>
             <b-form-textarea
                 id="textareaButton"
                 :value="form.text"
                 disabled
                 rows="3"
             ></b-form-textarea>
             <div  v-for="(button, index) in form.buttonsArray" :key="'button_' + index">
               <b-button v-if="button.buttonStatus"  style="height: fit-content; display: flex; align-items: stretch; margin: 5px">
                 {{button.text}} <b-button size="sm"><b-icon-plus></b-icon-plus></b-button>
               </b-button>
               <a v-else :href="'http://' + button.text"><b-button style="height: fit-content; display: flex; align-items: stretch; margin: 5px">
                 ссылка <b-button size="sm"><b-icon-plus></b-icon-plus></b-button>
               </b-button></a>

             </div>
           </b-button>

         </div>
           <b-modal id="bv-modal-example"
                    @ok="createMessage"
                    @cancel="removeValues">
             <Multiselect v-model="selectedChannel"
               :options="selectedChannels"
               :close-on-select="false"
               :clear-on-select="false"
               :preserve-search="true"
               placeholder="Pick some"
               label="name"
               track-by="name"
               :preselect-first="true"
               class="multiselect"/>
                <b-form-textarea
                  id="textarea"
                  v-model="messageText"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                  ></b-form-textarea>
            <div>
            <b-form-checkbox v-model="checked" name="check-button" switch>
              <b>{{ statusModel }}</b>
            </b-form-checkbox>
             </div>
             <b-button pill class="button3" @click="openModalButton" ><b-icon-plus></b-icon-plus></b-button>
             <b-modal id="bv-modal-button"
                      center-footer
                      @ok="createButton">
               <b-form-checkbox v-model="buttonStatus" name="status-button" switch>
                 <b>{{buttonType}}</b>
               </b-form-checkbox>
               <b-form-textarea
                   id="textareaButton"
                   v-model="buttonText"
                   placeholder="Enter something..."
                   rows="3"
                   max-rows="6"
               ></b-form-textarea>
             </b-modal>
            <div class="keyboard_buttons">
              <div  v-for="(button, index) in buttonsArray" :key="'button_' + index">
                <b-button v-if="buttonStatus"  style="height: fit-content; display: flex; align-items: stretch; margin: 5px">
                {{button.text}} <b-button size="sm"><b-icon-plus></b-icon-plus></b-button>
                </b-button>
                <a v-else :href="'http://' + button.text" target="_blank"><b-button style="height: fit-content; display: flex; align-items: stretch; margin: 5px">
                  ссылка <b-button size="sm"><b-icon-plus></b-icon-plus></b-button>
                </b-button></a>
              </div>
            </div>
<!--            <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Закрыть</b-button>-->
           </b-modal>
      </div>
      <b-button @click="closeWindowWithSave">Сохранить</b-button>
      <b-button @click="$parent.showForm = !$parent.showForm">Отмена</b-button>
   </div>

</template>

<script>

import Multiselect from 'vue-multiselect'
import axios from "axios";
//import axios from 'axios'
export default {
  name: 'MessageForm',
  components:{
   Multiselect
  },
  props: {
    visible: Boolean,
    rowIndex: Number
  },
data () {
   return {
     buttonType: 'Быстрый ответ',
   mainChannels: [],
   selectedChannel: [],
   selectedChannels: [],
   options: [
      { name: 'Vk', key: 1},
      { name: 'SMS', key: 2},
      { name: 'Telegram', key: 3},
      { name: 'Whats App', key: 4}
   ],
   checked: true,
   statusModel: 'Keyboard',
   buttonStatus: true,
   buttonsArray: [
   ],
   buttonText: '',
   messageText: '',
   channelsForms: [],
   messageIndex: null,
   edit: false
   }
   },
   watch: {
     mainChannels: function (){
       this.selectedChannels = this.mainChannels;
     },
    checked: function () {
      if (this.statusModel === "Keyboard") {
        this.statusModel = "inline-Keyboard";
      } else {
        this.statusModel = "Keyboard";
      }

    },
     buttonStatus: function (){
       if (this.buttonType === "Быстрый ответ") {
         this.buttonType = "Кнопка ссылка";
       } else {
         this.buttonType = "Быстрый ответ";
       }
     }
   },
  mounted() {
    //this.renderForm()
  },
  methods: {
    renderForm(index){
      if (index == null) return
      axios({
        method: "get",
        url: `http://localhost:5050/api/device/${index}`,
      }).then((resp) => {
        if (resp.status == 200) {
          console.log(resp)

        }
      })
    },
     openOnEdit(){
       if (this.messageIndex === null) return
       this.messageText = this.channelsForms[this.messageIndex].text;
       this.buttonsArray = this.channelsForms[this.messageIndex].buttonsArray;
       this.selectedChannel = this.options.find(x => x.name === this.channelsForms[this.messageIndex].name);
       this.statusModel = this.channelsForms[this.messageIndex].keyBoardType;
       this.edit = true;
       this.$bvModal.show('bv-modal-example');
     },
     createMessage(){
       if (this.edit){
         this.channelsForms[this.messageIndex] = {'name': this.selectedChannel.name, 'text': this.messageText, 'buttonsArray': this.buttonsArray, 'keyBoardType': this.statusModel, buttonsType: this.buttonType};
       }else{
         this.channelsForms.push( {'name': this.selectedChannel.name, 'text': this.messageText, 'buttonsArray': this.buttonsArray, 'keyBoardType': this.statusModel, buttonsType: this.buttonType});
       }
         this.messageText = '';
         this.buttonsArray = [];
         this.selectedChannel = null;
         this.messageIndex = null;
     },
     removeValues(){
       this.messageText = '';
       this.buttonsArray = [];
       this.selectedChannel = null;
       this.messageIndex = null;
     },
     createButton(){
       this.buttonsArray.push({'text': this.buttonText, 'buttonStatus': this.buttonStatus});
       this.buttonText = '';
     },
      openModal() {
         this.$bvModal.show('bv-modal-example')
      },
      openModalButton() {
       this.$bvModal.show('bv-modal-button')
      },
      closeWindowWithSave(){
      const vm = this;
       let channelInfo = JSON.parse(JSON.stringify(this.channelsForms));
       channelInfo.forEach(x =>{
         x.buttonsArray = x.buttonsArray.map(y => y.text).join(',')
       })
        axios({
          method: "post",
          url: "http://localhost:5050/api/device/",
          data: {
            'name': 'TEst2',
            'channels': this.mainChannels.map(x => x.key).join(','),
            'info': channelInfo
          }
        }).then((resp) => {
          if (resp.status == 200) {
            console.log(resp)
            vm.$parent.showForm = !vm.$parent.showForm;
          }
        })
      }
   }



  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.keyboard_buttons{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.container{
display: flex;
flex-direction: column;
align-items: flex-start;
width: 70%;
height:600px;
border:1px solid;
margin:auto;
border-radius:5px;
}
.buttons{
   margin: 8px 0px 8px 5px;
}
.multiselect{
   margin-top: 8px;
}
.button1{
   margin-left: 4px;
}

.check1{
   margin-top: 10px;
}
.button3{
   margin-right: 320px;
}
.mt-3{
   margin-bottom: 12px;
}
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


