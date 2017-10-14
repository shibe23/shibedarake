<template>
<div id="modal" class="modal is-active">
  <div class="modal-background" @click="close()"></div>
  <div class="modal-content">

    <div class="card" :style="{height: modalData.modalHeight}">
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
