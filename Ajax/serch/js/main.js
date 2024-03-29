
//ローカル変数宣言
var serchKey = '';											//検索キーワード
var file = ''												//ファイル種別
//*************************************************
//	メイン処理
//-------------------------------------------------
//<status>
//	create: 2019.10.18
//</status>
//<history>
//	検索条件に一致したXMLデータを一覧として画面に表示する
//</history>
//*************************************************
$(function(){
 $('#btSerch').on('click',function(){ 	
 	//初期化
 	$('#employeeVal').html('');			//社員一覧テーブルのtbody
	$('#ajaxStatus').html('');			//読込成功可否メッセージ
	$('#atencionMsg').html('');			//検索結果メッセージ
 	
 	//検索キーワードを取得して、ローカル変数に設定
 	serchKey = $('.division_list option:selected').val();
 	
 	//ファイルの種別を取得
 	file = $('.file_list option:selected').val();
 	
 	//検索キーワードの値により条件分岐
 	if(!serchKey){							//検索キーワードがブランクの場合
		//検索結果を赤文字で画面に表示
		$('#atencionMsg').text('検索に一致する結果はありませんでした。');
		$('#atencionMsg').css("color","red");

 	}else{										//検索キーワードがブランクでない場合		
		//Ajax通信を行う 引数：ファイル種別
		ajaxRun();
 	
 	}	//if文 End
 })		//検索ボタン処理 End
});

//*************************************************
//	Ajax通信実行処理
//-------------------------------------------------
//<status>
//	create: 2019.10.18
//</status>
//<history>
//	url: 読込対象のファイルの設置場所
//	type: [post] or [get]のどちらか。初期値はget。
//	dataType:取得対象のデータ種類(xml,jspnなど...)
//	timeout:タイムアウト時間設定。設定時間を過ぎるとエラーになる。
//	success:通信成功時に呼び出されるイベント
//</history>
//*************************************************
function ajaxRun(){
	if(file == 'xml'){
	
		$.ajax({
			url: 'xml/emploee.xml',
			type:'get',
			dataType:'xml',
			timeout:1000,
			success:getData
		});
		
	}else{
		$.ajax({
			url: 'json/emploee.json' ,
			type:'get',
			dataType: 'json', 
			timeout: 1000,
			success: getData
		});
	}
	
}

//*************************************************
//	データ取得処理処理
//-------------------------------------------------
//<status>
//	create: 2019.10.18
//</status>:
//<history>
//</history>
//*************************************************
function getData(data,status){
	if(status != 'success'){				//statusが正常でない場合(エラーの場合)
		//画面にメッセージ表示
		$('#ajaxStatus' ) . text('読み込み失敗' );
		
		//処理終了
		return;
		
	}else{							//statusが正常の場合
		
		
		//HTML作成メソッドを呼び出す
		if(file == "xml"){

			$(data).find('staff').each(createDispXml);
		}else{

			$(data.employeeList).each(createDispJson);
		}

		
		//読込成功時の文字を画面に出力
		$('#ajaxStatus').text('読み込み成功');

	}	//if文 End
}

//*************************************************
//	HTML作成処理処理(XML)
//-------------------------------------------------
//<status>
//	create: 2019.10.18
//</status>
//<history>
//	呼び出し元(getDataメソッド)で「each」を使用して呼び出しているので、1行分のみ記載する
//	ここで使用している「$(this)」は呼び出し元(getDataメソッド)の「staff」要素のこと
//</history>
//*************************************************
function createDispXml(){
	//検索キーワードの値により、所属部署にて条件分岐
	if(serchKey == $(this).find('department').text()){				//検索キーワードに対し、所属部署が一致した場合
		var html = '<tr>'
				 + '<td>' + $(this).find('id').text() + '</td>'
				 + '<td>' + $(this).find('status').text() + '</td>'
				 + '<td>' + $(this).find('name').text() + '</td>'
				 + '</tr>' ;
		//書き込み
		$('#employeeVal' ).append(html);

	}else{							//検索キーワードに対し、所属部署が一致しなかった場合
		//処理なし
	}
}
//*************************************************
//	HTML作成処理処理(JSON)
//-------------------------------------------------
//<status>
//	create:2019.10.18
//</status>
//<history>
//	呼び出し元(getDataメソッド)で「each」を使用して呼び出しているので、1行分のみ記載する
//	引数：eachカウント数,JsonData
//</history>
//*************************************************
function createDispJson(cnt,jData){
	//検索キーワードの値により、所属部署にて条件分岐
	if(serchKey ==  jData.department){									//検索キーワードに対し、所属部署が一致した場合
		var html = '<tr>'
				 + '<td>' + jData.id+'</td>'
				 + '<td>' + jData.status+'</td>'
				 + '<td>' + jData.name+'</td>'
				 + '</tr>';
		//書き込み
		$('#employeeVal' ).append(html);
			
	}else{	
		//検索キーワードに対し、所属部署が一致しなかった場合
		//処理なし
	}
}

