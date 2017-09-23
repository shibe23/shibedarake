<template>
<div v-masonry transition-duration="0s" item-selector=".item" fit-width="true">
    <div v-masonry-tile class="item masonry__tile isShow" v-for="(post, index) in posts">
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
    props: ['showModal','posts', 'modalData', 'search_metadata', 'postCount'],
    methods: {
        open: function(index){
            this.$emit('open', index)
        }
    }
}
</script>
