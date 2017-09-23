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
      postCount: 30,
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
        checkHiddenPosts: function(e){
          var win_h = $(window).height();
          var scrollTop = $(window).scrollTop();

          // 一番上にある表示されているcardの座標を取得
          if($('.isShow').eq(0).length){
            var target = $('.isShow').eq(0).offset().top;
            var data = $('.isShow').eq(0).data('index');
          }

          if (scrollTop > (target + 500) && typeof target !== "undefined"){
            // 非表示処理
            while(scrollTop - (win_h / 2) > target){
              $('.isShow').eq(0).addClass('isHide');
              $('.isShow').eq(0).removeClass('isShow');
              target = $('.isShow').eq(0).offset().top;
            }
          }

          if (scrollTop < (target + 500) && typeof target !== "undefined"){
            // 表示処理
            var num = $('.isHide').length -1 ;
            $('.isHide').eq(num).addClass('isShow');
            $('.isHide').eq(num).removeClass('isHide');
            target = $('.isShow').eq(0).offset().top;
          }
          
          // 一番↓にある表示されているcardの座標を取得
          var target_end = $('.isShow').length

          if($('.isShow').last()){
            var target_b = $('.isShow').last().offset().top;
          }

          if (scrollTop > target_b - win_h && !this.flg_getNetPosts){
            this.flg_getNetPosts = true;
            this.getNewPosts(this.search_metadata.max_id);
          }
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
            this.modalData.modalPadTop = $(window).scrollTop() + 20;
        },
        closeModal: function(){
            this.showModal = false
        }
  },
  mounted() {
      this.getNewPosts ();
      window.addEventListener('scroll', this.checkHiddenPosts);
  }
})
