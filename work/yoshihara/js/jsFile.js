var jsonData;
window.onload = function(){
	$.getJSON('../json/employee.json',function(data){
		jsonData=data;
		var pulldown = $('#dep_list')
		//部署名を出力
		console.log(Object.keys(data['departmentList']).length);
		for(var i=0; i<Object.keys(data['departmentList']).length; i++){
			console.log(data.departmentList[i]);
			$('<option value="'+data.departmentList[i]+'">'+data.departmentList[i]+'</option>').appendTo(pulldown);
		}
	})

	$('#searchButton').on('click',function(){
		var empTable=$('#empTable');
		var selectDep=$('#dep_list').val();
		var info=$('#info');
		var tRow;
		var emp;
		var hitcount=0;
		$(empTable).empty();
		for(var i=0; i<Object.keys(jsonData['employeeList']).length;i++){
			emp=jsonData.employeeList[i];
			console.log(emp.name);
			if(emp.department==selectDep){
				tRow='<tr><td>' + emp.id + '</td>'
					+ '<td id="empRow'+hitcount+'">' + emp.status + '</td>'
					+ '<td>' + emp.name + '</td></tr>';
				$(tRow).appendTo(empTable);
				
				hitcount++;
			}
		}
		console.log(hitcount);
		info.empty();
		if(hitcount>0){
			$('<span>'+hitcount+'件ヒットしました。</span>').appendTo(info);
		}else{
			var infoSpan = $('<span>検索結果がありません。</span>').appendTo(info);
			infoSpan.css('color','red');
		}
	});
};
