<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content">
    <!-- Any other Bulma elements you want -->
  </div>
  <button @click="close()" class="modal-close is-large" aria-label="close"></button>
</div>
</template>

<script>
export default {
    data: function(){
            return {
                // showModal: false
            }
        },
    props: ['showModal'],
    methods: {
        close: function(){
            this.$emit('close')
        }
    }
}
</script>

<style lang="scss">

</style>