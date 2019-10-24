
//ローカル変数宣言
var serchKey = "";			//検索キーワード

//*************************************************
//	メイン処理
//-------------------------------------------------
//<status>
//	create:M.Fukawa 2019.10.18
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
 	var file = $('.file_list option:selected').val();
 	
 	//検索キーワードの値により条件分岐
 	if(serchKey == ""){							//検索キーワードがブランクの場合
		//検索結果を赤文字で画面に表示
		$('#atencionMsg').text('検索に一致する結果はありませんでした。');
		$('#atencionMsg').css("color","red");

 	}else{										//検索キーワードがブランクでない場合
		//メッセージが表示されているかもしれないので、非表示にする
		//$('#atencionMsg').hide();
		
		//Ajax通信を行う
		ajaxRun(file);
 	
 	}	//if文 End
 })		//検索ボタン処理 End
});

//*************************************************
//	Ajax通信実行処理
//-------------------------------------------------
//<status>
//	create:M.Fukawa 2019.10.18
//</status>
//<history>
//	url: 読込対象のXMLファイルの設置場所
//	type: [post] or [get]のどちらか。初期値はget。
//	dataType:XMLドキュメント
//	timeout:タイムアウト時間設定。設定時間を過ぎるとエラーになる。
//	success:通信成功時に呼び出されるイベント
//</history>
//*************************************************
function ajaxRun(file){
	//url成形
	var urlLink = file + '/emploee.' + file
	
	$.ajax({
		url: urlLink,
		type:'get',
		dataType:'xml',
		timeout:1000,
		success:getXmlData
	});
}

//*************************************************
//	XMLデータ取得処理処理
//-------------------------------------------------
//<status>
//	create:M.Fukawa 2019.10.18
//</status>
//<history>
//</history>
//*************************************************
function getXmlData(xml,status){
	if(status != 'success'){				//statusが正常でない場合(エラーの場合)
		//画面にメッセージ表示
		$('#ajaxStatus' ) . text('読み込み失敗' );
		
		//処理終了
		return;
		
	}else{								//statusが正常の場合
		//HTML作成メソッドを呼び出す
		$(xml).find('staff').each(createDisp);
		
		//読込成功時の文字を画面に出力
		$('#ajaxStatus').text('読み込み成功');

	}	//if文 End
}

//*************************************************
//	HTML作成処理処理
//-------------------------------------------------
//<status>
//	create:M.Fukawa 2019.10.18
//</status>
//<history>
//	呼び出し元(getXmlDataメソッド)で「each」を使用して呼び出しているので、1行分のみ記載する
//	ここで使用している「$(this)」は呼び出し元(getXmlDataメソッド)の「staff」要素のこと
//</history>
//*************************************************
function createDisp(){
	//xmlに定義されている要素を変数に格納
	var empId = $(this).find('id').text();						//社員番号
	var empName = $(this).find('name').text();					//社員名
	var empStatus = $(this).find('status').text();				//役職
	var empDepart = $(this).find('department').text();			//所属部署

	//検索キーワードの値により、所属部署にて条件分岐
	if(serchKey == empDepart){									//検索キーワードに対し、所属部署が一致した場合
		var html = '<tr>'
				 + '<td>' + empId+'</td>'
				 + '<td>' + empStatus+'</td>'
				 + '<td>' + empName+'</td>'
				 + '</tr>';
		
		//書き込み
		$('#employeeVal' ).append(html);
		
	}else{														//検索キーワードに対し、所属部署が一致しなかった場合
		//処理なし
	}
}
