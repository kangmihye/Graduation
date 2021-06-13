/**
 * 
 */


$(function(){
	
	button();
	
	function button(){
		$("#1").append("<div id=\"img1\" style=\"position: relative; top: 200px; left: 360px;\"></div>");
		$("#img1").append("<button class=\"searching\" value=\"버드와이저\"> 되냐 !!</button>");
	
		
		$("#2").append("<div id=\"img2\" style=\"position: relative; top: 300px; left: 400px;\"></div>");
		$("#img2").append("<button class=\"searching\" value=\"아침에주스\"> 젭알? </button>");
			
			
			
		$(".searching").on("click",function(){
		var query=$(this).val();
		if(confirm(query+"를 장바구니에 담으시겠습니까?")==true){
			searching(query);
			alert(query+"를 장바구니에 담았습니다");
			}
		}); 
	}	

	function searching(query){
		
		$.ajax({
			url :'/searching',
			type : 'get',
			data :{
					query:query,
					display:1
					},
			success : function(data){
				var jsonObject = JSON.parse(data);
				console.log(jsonObject);

				var product_link="";
				var product_image="";
				var product_nm="";
					$.each(jsonObject.items,function(index,item){
						product_link=item.link;
						product_image=item.image;
						product_nm=item.title;
						});
					

					
					//장바구니 등록
					$.ajax({
						url : "/cartInsert",
						type : "post",
						data : {
							product_link : product_link,
							product_image:product_image,
							product_nm:product_nm
							},
						dataType :"json",
						success : function(data){
							console.log(data);
							},
						error : function(e){
							console.log(e);
							}
						});
				},
				
			error : function(e){
				console.log(e);	
				}
			});
		}
	});
