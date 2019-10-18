
//検索ボタン処理
$(function () {
//$("#btSerch").click(function(){
$("#btSerch").on( "click", function(){
	//初期化
	$("#employeeVal").html("");
	$('#employeeVal' ) .html("");
	
	
	//検索項目の値を取得
	//検索ワードを取得
	var target = $('.division_list option:selected').val();
	
	//検索ワードがブランクの場合は処理終了。それ以外はAjax通信を行う	
	if(target == ""){
		//社員一覧テーブルを非表示
		//$('.employeeTable').hide();
		
		//検索結果を赤文字で画面に表示
		$('#atencionMsg').text('検索に一致する結果はありませんでした。');
		$('#atencionMsg').css("color","red")
		
	}else{
		//メッセージが表示されているかもしれないので、非表示
		$('#atencionMsg').hide();

		//以下からAjax(非同期通信)の処理
		$.ajax({
			
			//URL指定
			url: 'xml/emploee.xml',
			//データタイプを指定。今回はxmlに指定されている文字を画面に出力するので「xml」
			dataType: 'xml',
			//通信成功時、実行
			success: function(xml) {
			
				$(xml).find('staff').each(function() {
					//xmlのエレメント名を指定して値を取得。
					//eachを使っているので、xmlに用意されている個数分実行する。
					var empId = $(this).find('id').text();						//社員番号
					var empName = $(this).find('name').text();					//社員名
					var empStatus = $(this).find('status').text();				//役職
					var empDepart = $(this).find('department').text();			//所属部署
				
					//役職ごとに表示する為、所属部署を判定
					if(target == empDepart){
						//htmlに表示するタグを作成。TABLEのbody部作成
						var html = '<tr>'+
									'<td>' + empId+'</td>'+
									'<td>' + empStatus+'</td>'+
									'<td>' + empName+'</td>'+
									'</tr>';
						$('#employeeVal' ).append(html);
					}else{
						//処理なし。
					}
				} );	//each処理End

				//読込成功時の文字を画面に出力
				$('#ajaxStatus' ) . text('読み込み成功' );
			},	//success処理End
			
			//通信エラー時、実行
			//ローカルポリシーに引っかかったときはエラーのブロック内に入る。
			error: function(data ) {
				$('#ajaxStatus' ) . text('読み込み失敗' );
			}	//.error処理End
			
		});	//Ajax処理End
	
	}	//if文処理 End
	});
});
