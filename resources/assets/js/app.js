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

var vm = new Vue({
  el: '#app',
  data: {
      post_count: 30,
      posts: [],
      // ghost: [],
      // fire_h: [0],
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
      showModal: false,
      flg_getNetPosts: false
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
            var tmp_meta = meta;
            axios.post('/post', this.tryAddOptions(meta))
            .then((response) => {
                this.posts = this.posts.concat(response.data.statuses);
                this.search_metadata = response.data.search_metadata;
                // 未取得の内容であればフラグをOFF
                if (tmp_meta !== this.search_metadata) {
                    this.flg_getNetPosts = false;    
                }
            })
            .catch((error) => { console.log(error); });
        },
        handleScroll: function (e){
          var scrollTop = document.body.scrollTop;
          var offsetH = document.body.offsetHeight;

          if (scrollTop > offsetH / 2 && !this.flg_getNetPosts) {
            console.info('get new post start');
            this.flg_getNetPosts = true;
            this.getNewPosts(this.search_metadata.max_id);
            
            // n番目から30個分の配列のimage_urlをno_imageに書き換える
            // this.fire_h.push(scrollTop);
            // this.replaceImages();
          }    
        },
        // replaceImages: function(){
        //   for (var i=0; i<=this.post_count; i++){
        //     if(this.posts[i].media_url === "undefined"){ return };
        //     this.ghost.push(this.posts[i].media_url);
        //     this.posts[i].media_url = "http://via.placeholder.com/150x150/";
        //   }  
        // },
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
      window.addEventListener('scroll', this.handleScroll);

  }
})
