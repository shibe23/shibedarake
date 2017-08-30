window.$ = window.jQuery = require('jquery');
window.Laravel = { csrfToken: $('meta[name=csrf-token]').attr("content") };

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');
window.Vue = require('vue');
import axios from 'axios';
import VueMasonryPlugin from 'vue-masonry';
Vue.use(VueMasonryPlugin);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example', require('./components/Example.vue'));
Vue.component('cards', require('./components/cards.vue'));
Vue.component('modal', require('./components/modal.vue'));

new Vue({
  el: '#app',
  data: {
      posts: [],
      search_metadata: {},
      modalData: {
        screen_name: "",
        image_url: "",
        text: "",
        id_str: "",
        post_url: "",
        modalHeight: 0,
        modalPadTop: 20
      },
      showModal: false
  },
  methods: {
        tryAddOptions: function(meta){
            var options = {}
            if (meta !== undefined){
              // jsonではなくform dataとしてpostする
              var params = new URLSearchParams();
              params.append('max_id', meta);
              max_id: meta
            }
            return params;
        },
        getNewPosts: function(meta){
            axios.post('/post', this.tryAddOptions(meta))
            .then((response) => {
                this.posts = this.posts.concat(response.data.statuses);
                this.search_metadata = response.data.search_metadata;
            })
            .catch((error) => { console.log(error); });
        },
        openModal: function(index){
            var URL = "https://twitter.com/"
            this.modalData.image_url = this.posts[index].media_url;
            this.modalData.id_str = this.posts[index].id_str;
            this.modalData.screen_name = this.posts[index].user_screen_name;
            this.modalData.text = this.posts[index].text;
            this.modalData.post_url = URL + this.posts[index].user_screen_name + "/status/" + this.posts[index].id_str;
            this.showModal = true;
            this.modalData.modalHeight = document.body.clientHeight; 
            this.modalData.modalPadTop = document.body.scrollTop + 20;
            console.log(this.modalData.modalPadTop)
        },
        closeModal: function(){
            this.showModal = false
        }
  },
  mounted() {
      this.getNewPosts ();
  } 
})