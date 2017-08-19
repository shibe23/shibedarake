<template>
<div class="modal is-active">
  <div class="modal-background" @click="close()"></div>
  <div class="modal-content">
    <figure class="image">
      <img :src="modalData.image_url">
    </figure>

    <div class="media-content">
      <div class="content">
        <p>
          <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
          <br>
          {{ modalData.text}}
        </p>
      </div>
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
      </nav>
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

</style>