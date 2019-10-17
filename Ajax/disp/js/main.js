$(function() {
	$('#jquery-sample-button' ) . toggle(
		function() {
			//以下からAjax(非同期通信)の処理
			$.ajax({
				//URL指定
				url: 'file:///C:/work_fukawa/tool/Git/Git/test/Ajax/xml/sample.xml',
				//データタイプを指定。今回はxmlに指定されている文字を画面に出力するので「xml」
				dataType: 'xml',

				//通信成功時、実行
				success: function(data ) {
					$ (data ) . find('color' ) . each(function() {
						//xmlのエレメント名を指定して値を取得。
						//eachを使っているので、xmlに用意されている個数分実行する。
						var name = $ (this ) . find('name' ) . text();
						var colorName = $ (this ) . find('colorName' ) . text();
						var colorCode = $ (this ) . find('colorCode' ) . text();

						//htmlに表示するタグを作成。pタグ。
						var html = '<p style="color:' + colorName + ';">' + name + ':' + colorName + ':' + colorCode + '</p>';
						$('#jquery-sample-ajax' ) . append(html );
					} );

					//読込成功時の文字を画面に出力
					$('#jquery-sample-textStatus' ) . text('読み込み成功' );
				},
				//通信エラー時、実行
				//ローカルポリシーに引っかかったときはエラーのブロック内に入る。
				error: function(data ) {
					$('#jquery-sample-textStatus' ) . text('読み込み失敗' );
				}
			} );
		},

		//出力
		function() {
			
			$('#jquery-sample-ajax' ) . html('' );
			$('#jquery-sample-textStatus' ) . text('' );
		}
	);
} );
