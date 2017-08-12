<template>
<div v-masonry transition-duration="0s" item-selector=".item" fit-width="true">
    <div v-masonry-tile class="item masonry__tile" v-for="(post, index) in posts">
          <a @click="open(index)"><img class="tile__image" :src="post.media_url" alt="Image"></a>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import VueMasonryPlugin from 'vue-masonry';
Vue.use(VueMasonryPlugin);

export default {
    data: function(){
            return {
                posts: [],
                search_metadata: {}
            }
        },
    props: ['showModal'],
    methods: {
        tryAddOptions: function(meta){
            var options = {}
            console.log(meta);
            if (meta !== undefined){
                options = {
                    max_id: meta.max_id
                }
            }
                
            return options;
        },
        getNewPosts: function(meta){
            axios.post('/post', this.tryAddOptions(meta))
            .then((response) => {
                this.posts = response.data.statuses;
                this.meta = response.data.search_metadata;
            })
            .catch((error) => { console.log(error); });
        },
        open: function(index){
            this.$emit('open')
        }
    },
    mounted() {
        this.getNewPosts ();
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
    border-radius: 4px;
}    
</style>