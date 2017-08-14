<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content">
    <figure class="image">
      <img :src="image_url">
    </figure>
  </div>
  <button @click="close()" class="modal-close is-large" aria-label="close"></button>
</div>
</template>

<script>
export default {
    data: function(){
            return {
                modalData: {
                    image_url: "",
                    author: ""
                }
            }
        },
    props: ['showModal','posts','search_metadata'],
    methods: {
        close: function(){
            this.$emit('close')
        }
    }
}
</script>

<style lang="scss">

</style>