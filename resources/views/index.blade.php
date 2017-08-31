<!doctype html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Shibadake</title>
        <!--<link href="/css/sanitize.css" rel="stylesheet" type="text/css">-->
        <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css" rel="stylesheet" type="text/css">
        <!--<link href="/css/app.css" rel="stylesheet" type="text/css">-->
        <style type="text/css">
          body{background-color: #efefef;}
          .wrapper{
            padding:0.5%;
          }
          .container > .title{
            font-family: 'Pacifico', cursive;
            font-size: 70px;
            font-weight: normal;
          }
        </style>
        <!--<link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">-->
    </head>
    <body>
    <section class="hero is-primary is-medium">
     <div class="hero-head">
        <header class="nav">
          <div class="container">
            <div class="nav-left">
              <a class="nav-item">
                <img src="images/bulma-type-white.png" alt="Logo">
              </a>
            </div>
            <span class="nav-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <div class="nav-right nav-menu">
              <a class="nav-item is-active">
                Home
              </a>
              <a class="nav-item">
                Examples
              </a>
              <a class="nav-item">
                Documentation
              </a>
              <span class="nav-item">
                <a class="button is-primary is-inverted">
                  <span class="icon">
                    <i class="fa fa-github"></i>
                  </span>
                  <span>Download</span>
                </a>
              </span>
            </div>
          </div>
        </header>
      </div>


      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Shibadarake
          </h1>
          <h2 class="subtitle">
            That is how to find the earliest Shiba Inu.
          </h2>
        </div>
      </div>
    </section>
      <div class="wrapper" id="app">
        <cards @open="openModal" :modal-data="modalData" :posts="posts" :show-modal="showModal"></cards>
        <!--<div class="masonry" v-masonry transition-duration="0.3s" item-selector=".masonry__tile">-->
        <!--  <div class="masonry__tile" v-for="(post, index) in posts">-->
        <!--      <a @click="open(index)"><img class="tile__image" :src="post.media_url" alt="Image"></a>-->
        <!--  </div>            -->
        <modal :modal-data="modalData" :show-modal="showModal" :posts="posts" v-if="showModal" @close="closeModal" :style="{ 'height': $data.modalData.modalHeight + 'px', 'padding-top': $data.modalData.modalPadTop + 'px' }"></modal>
        <button @click="getNewPosts($data.search_metadata.max_id)">next</button>
      </div>

        <!--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>-->
        <!--<script src="https://unpkg.com/vue@2.1.6/dist/vue.js"></script>-->
        <script async defer src="https://cdnjs.cloudflare.com/ajax/libs/masonry/4.0.0/masonry.pkgd.min.js"></script>
        <script src="/js/app.js"></script>
    </body>
</html>
