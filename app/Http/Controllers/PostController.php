<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    public function fetch() {
        $q = "";
        $q .= "filter:images". " ";
        $q .= "#柴犬". " ";
        $q .= "-RT". " ";
        $q .= "-#lineスタンプ". " ";
        $q .= "-#スタンプ". " ";
        $q .= "-#犬グッズ". " ";

        $param['q'] = $q;
        $param['count'] = "30";
        $param['result_type'] = 'recent';
        $param['include_entities'] = true;

        if(isset($_POST['max_id'])) {
            // max_idがあればパラメータにセットする
            $param['max_id'] = $_POST['max_id'];
        }

        $statuses = [];

        $values = \Twitter::get("search/tweets", $param);

        foreach ((array)$values->statuses as $value) {
            $data = [];
            $data += array('id'=> count($statuses));
            // entities以外にmediaが存在している場合があるため、entities内にある場合のみに絞る
            $checkMediaExists = isset($value->entities->media);
            if($checkMediaExists) {
                foreach((array)$value->entities->media as $value_media){
                    if($value_media->type == 'photo'){
                        $data += array('media_url'=> $value_media->media_url);
                    }
                }
                $data += array('created_at'=> $value->created_at);
                $data += array('id_str'=> $value->id_str);
                $data += array('user_name'=> $value->user->name);
                $data += array('user_screen_name'=> $value->user->screen_name);
                $data += array('user_img'=> $value->user->profile_image_url);
                $data += array('text'=> $value->text);
                $data += array('source'=> "Twitter");

                array_push($statuses, $data);
            }
        }

        // next_resultsで続きを取得することができる
        $max_id = array('max_id'=>preg_replace('/.*?max_id=([\d]+)&.*/', '$1', $values->search_metadata->next_results));

        // JSON整形処理
        $result['statuses'] = $statuses;
        $result['search_metadata'] = $max_id;

        echo json_encode($result, true);
    }
}
