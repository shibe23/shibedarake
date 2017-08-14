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
      showModal: false,
      modalData: {
        img_url: ""
      }
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
                var arr = response.data.statuses;
                for(var i = 0, n = arr.length; i < n; i++){
                  this.posts.push(arr[i]);
                }
                this.search_metadata = response.data.search_metadata;
            })
            .catch((error) => { console.log(error); });
        },
      openModal: function(){
          this.showModal = true
      },
      closeModal: function(){
          this.showModal = false
      }
  },
  mounted() {
      this.getNewPosts ();
  } 
})