<template>
<div v-masonry transition-duration="0s" item-selector=".item" fit-width="true">
    <div v-masonry-tile class="item masonry__tile" v-for="(post, index) in posts">
          <a @click="open(index)"><img class="tile__image" :src="post.media_url" alt="Image"></a>
    </div>
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
        open: function(index){
            this.$emit('open', index)
        }
    }
}
</script>

<style lang="scss">
.masonry__tile{
    width: 33%;
    box-sizing: border-box;
    padding: 5px 10px;
    margin-bottom: 10px;
    background-color: #FFF;
    border-radius: 8px;
}
.card{
    padding-top: 8px;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 8px;
}
</style>