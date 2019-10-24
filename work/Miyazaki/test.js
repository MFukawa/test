jQuery(function(){
	//XMLデータ読み込み
	$.ajax({
		//XMLファイル指定
		url:'test.xml',
		type:'get',
		dataType:'xml',
		timeout: 1000,
		error:function(){
			alert("xmlファイルの読み込みに失敗");
		},
		success: function(xml){
			$(xml).find("dish").each(function(){
				$("tbody").append('<tr><td id="genre">'+
					$(this).find('genre').text()+
					'</td>'+
					'<td id ="type">'+
					$(this).find('type').text()+
					'</td>'+
					'<td id="menu">'+
					$(this).find('menu').text()+
					'</td>'+
					'<td id="price">'+
					$(this).find('price').text()+
					'</td></tr>');
			});
		}
	});
});
