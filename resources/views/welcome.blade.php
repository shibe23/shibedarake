<?php
$result = \Twitter::get("search/tweets",
                    array(
                        "q" => "filter:images -RT #柴犬",
                        "count"=>"5",
                        'result_type' => 'recent',
                        "include_entities"=>true
                        ));

foreach ((array)$result->statuses as $value) {
    $value->created_at;      //ツイート時間
    $value->id;              //ツイートID
    $value->text;            //ツイートコメント

    try{

                $checkExists = isset($value->entities->media);
                var_dump($checkExists);
                
        foreach((array)$value->entities->media as $value_media){
            if($value_media->type == 'photo'){
                $value_media->id;          //画像ID
                $value_media->media_url;   //画像URL [media_url_https]httpsでも取得可能
                $value_media->expanded_url; //ツイート詳細URL
    
                echo($value_media->media_url);
                echo('<br>');
    
            }elseif($value_media->type == 'video'){
                $value_media->id;          //動画ID
                $value_media->expanded_url; //ツイート詳細URL
                $value_media->video_info->variants[0]->url; //mp4動画URL
            }
        }        
    }catch(Exception $e){
        echo '捕捉した例外: ',  $e->getMessage(), "\n";
    }

    echo($value->text);
    echo('<br>');
}

echo('<pre>');
print_r($result);
echo('</pre>');
?>

<!doctype html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @if (Auth::check())
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ url('/login') }}">Login</a>
                        <a href="{{ url('/register') }}">Register</a>
                    @endif
                </div>
            @endif

            <div class="content">
                <div class="title m-b-md">
                    Laravel
                </div>

                <div class="links">
                    <a href="https://laravel.com/docs">Documentation</a>
                    <a href="https://laracasts.com">Laracasts</a>
                    <a href="https://laravel-news.com">News</a>
                    <a href="https://forge.laravel.com">Forge</a>
                    <a href="https://github.com/laravel/laravel">GitHub</a>
                </div>
            </div>
        </div>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script>
            axios.get('/post')
                .then(function (response) {
                console.log(response);
                })
                .catch(function (error) {
                console.log(error);
                });
        </script>
    </body>
</html>
