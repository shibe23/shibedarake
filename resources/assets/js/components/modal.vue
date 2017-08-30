<template>
<div id="modal" class="modal is-active">
  <div class="modal-background" @click="close()"></div>
  <div class="modal-content">

    <div class="card">
      <div class="card-image">
        <figure class="image">
          <img :src="modalData.image_url">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ modalData.screen_name}}</p>
          </div>
        </div>
    
        <div class="content">
          {{ modalData.text}}
        </div>
        <div class="media-content">
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-reply"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-retweet"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-heart"></i></span>
              </a>
            </div>
          </nav>        </div>

      </div>
    </div>

  </div>
  <button @click="close()" class="modal-close is-large" aria-label="close"></button>
</div>
</template>

<script>
export default {
    data: function(){
            return {

            }
        },
    props: ['showModal','posts', 'modalData', 'search_metadata'],
    methods: {
        close: function(){
            this.$emit('close')
        }
    }
}
</script>

<style lang="scss">
.modal{
  position: absolute;
}
.modal-content{
  overflow: visible;
}
.modal.is-active{
  display: block;
  padding-top: 20px;
}
</style>