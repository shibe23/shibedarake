<!doctype html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Shibadarake</title>
        <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css" rel="stylesheet" type="text/css">
        <link href="/css/app.css" rel="stylesheet" type="text/css">
    </head>
    <body>
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">
              Shibadarake
            </h1>
            <h2 class="subtitle">
              The Best way to find your favorite Shiba-inu.
            </h2>
          </div>
        </div>
      </section>
      <div class="wrapper" id="app">
        <cards @open="openModal" :modal-data="modalData" :posts="posts" :show-modal="showModal" :post-count="postCount"></cards>
        <modal :modal-data="modalData" :show-modal="showModal" :posts="posts" v-if="showModal" @close="closeModal" :style="{ 'height': $data.modalData.modalHeight + 'px', 'padding-top': $data.modalData.modalPadTop + 'px' }"></modal>
      </div>
      <script async defer src="https://cdnjs.cloudflare.com/ajax/libs/masonry/4.0.0/masonry.pkgd.min.js"></script>
      <script src="/js/app.js"></script>
    </body>
</html>
