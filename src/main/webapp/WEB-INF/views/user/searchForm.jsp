<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>search Form</title>
<style type="text/css">
 body,p,h1,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,table,th,td,form,fieldset,legend,input,textarea,button,select{margin:0;padding:0}
        body,input,textarea,select,button,table{font-family:'돋움',Dotum,AppleGothic,sans-serif;font-size:12px}
        img,fieldset{border:0}
        ul,ol{list-style:none}
        em,address{font-style:normal}
        
        span{font-size: 20px;
        	 font-weight: bold;}
/*         a{text-decoration:none} */
/*         a:hover,a:active,a:focus{text-decoration:underline} */
        .search {margin: 10px;}
        .result{ margin: 20px;}
        .srch{width:100%;padding:5px 0; margin: 0px 10px;}
        .srch legend{overflow:hidden;visibility:hidden;position:absolute;top:0;left:0;width:1px;height:1px;font-size:0;line-height:0}
        .srch{color:#c4c4c4;text-align:left}
        .srch select,.srch input{margin:-1px 0 1px;font-size:12px;color:#373737;vertical-align:middle}
        .srch .keyword{margin-left:1px;padding:2px 3px 5px;border:1px solid #b5b5b5;font-size:12px;line-height:15px}
        .tbl_type,.tbl_type th,.tbl_type td{border:0}
        .tbl_type{width:100%;border-bottom:2px solid #dcdcdc;font-family:Tahoma;font-size:11px;text-align:center}
        .tbl_type caption{display:none}
        .tbl_type th{padding:7px 0 4px;border-top:2px solid #dcdcdc;background-color:#f5f7f9;color:#666;font-family:'돋움',dotum;font-size:12px;font-weight:bold}
        .tbl_type td{padding:6px 0 4px;border-top:1px solid #e5e5e5;color:#4c4c4c}
        
        .icon{
         background : url("resources/images/icon.png") no-repeat; 
		 border: none;
		 width: 35px;
	     height: 35px;
	     cursor: pointer;
	     }
        
        .icon:hover {
		 background : url("resources/images/icon.png") no-repeat; 
		 border: none;
		 width: 35px;
	     height: 35px;
	     cursor: pointer;
		}

	#search,
	.cart{
		-moz-appearance: none;
		-webkit-appearance: none;
		-ms-appearance: none;
		appearance: none;
		-moz-transition: background-color 0.25s ease-in-out, border-color 0.25s ease-in-out, color 0.25s ease-in-out;
		-webkit-transition: background-color 0.25s ease-in-out, border-color 0.25s ease-in-out, color 0.25s ease-in-out;
		-ms-transition: background-color 0.25s ease-in-out, border-color 0.25s ease-in-out, color 0.25s ease-in-out;
		transition: background-color 0.25s ease-in-out, border-color 0.25s ease-in-out, color 0.25s ease-in-out;
		background-color: transparent;
		border-radius: 4px;
		border: solid 1px #ccc;
		color: #555;
		cursor: pointer;
		display: inline-block;
		line-height: 1;
		padding: 6px;
		text-align: center;
		text-decoration: none;
		white-space: nowrap;
	}
	#search:hover,
	.cart:hover {
			border-color: #00D3B7;
			color: #00D3B7;
		}

			#search:hover:active,
			.cart:hover:active {
				background-color: rgba(0, 211, 183, 0.15);
			}

a {
    -moz-transition: color 0.25s ease, border-bottom-color 0.25s ease;
    -webkit-transition: color 0.25s ease, border-bottom-color 0.25s ease;
    -ms-transition: color 0.25s ease, border-bottom-color 0.25s ease;
    transition: color 0.25s ease, border-bottom-color 0.25s ease;
    border-bottom: dotted 1px;
    text-decoration: none;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    cursor: pointer;
        
    font-family: "Roboto", Helvetica, sans-serif;
    font-weight: 400;
    line-height: 1.65;
    font-size: 30px;
    color: #aaa;
}

	a:hover {
			border-bottom-color: transparent;
			color: #00D3B7;
		}
</style>
<script type="text/javascript" src="/resources/assets/js/jquery-3.6.0.js"></script>
<script type="text/javascript">	
$(function(){

	//검색가능
	$("#search").on("click",function(){
		var query= $("#query").val();
		searching(query);
		});

	function searching(query){
	
		$.ajax({
			url :'/user/searching',
			type : 'get',
			data :{
					query:query,
					display:12
					},
			success : function(data){
				var jsonObject = JSON.parse(data);
				console.log(jsonObject);

				
				var context='<tr>';
				$.each(jsonObject.items, function(index,item){
					context +="<td><ul>";
					context +="<li><a href=\""+item.link+"\"></li>";
					context +="<li><img alt=검색사진 src="+item.image+" width=\"200px\" height=\"200px\"></li></a>";
					context +="<li>"+item.title+"</li>";
					context +="<li><span>"+item.lprice+"</span>원</li>";
					context +="<li>"+item.mallName+"</li>";
					context +="<li>"+item.brand+"</li>";
					context +="<li><br><input type=\"button\" value=\"장바구니\" class=\"cart\"></li>"
					//context +="<br>"+item.category1+item.category2+item.category3+item.category4+"</br>";
					context +="</ul></td>";
					console.log(context);
						if((index+1) %4 ==0){
							context+="</tr>";
							context+="<tr>";
							}
					});
				
				context += '</tr>';
					$("#list").html(context);

					$("#query").val("");
					cartInsert();
					
				},
			error : function(e){
				console.log(e);	
			}
			});
		}

	//장바구니에 링크 등록!!
	function cartInsert(){
		$(".cart").on("click",function(){
			var product_link=$(this).closest("td").find("li").children().attr("href");
			var product_image=$(this).closest("td").find("li").eq(1).children().children().attr("src");
			var product_nm=$(this).closest("td").find("li").eq(2).html();

// 			console.log(product_nm);
// 			alert(product_nm);
// 			console.log(product_image);
// 			alert(product_image);
			//console.log($(this).closest("td").find("li").children().attr("href"));
			//alert(product_image);

		 	$.ajax({
				url : "/user/cartInsert",
				type : "post",
				data : {
					product_link : product_link,
					product_image:product_image,
					product_nm:product_nm
					},
				dataType :"json",
				success : function(data){
					alert("장바구니에 담겼습니다");
					console.log(data);
					},
				error : function(e){
					console.log(e);
					}
				});
			}); 
		}

});	
</script>
</head>
<body>
<div class="search">
		<div style="text-align: center;">
		<a href="/">HOME</a>
		</div>
       
        <fieldset class="srch" style="text-align: center;">
                <legend>검색영역</legend>
					<input type="text" id="query" accesskey="s" title="검색어" class="keyword">
					<input type="button" id="search" value="검색">        
		</fieldset>
			 
	<table border="1" summary="검색 결과" class="tbl_type">
	<caption>검색 결과</caption>
		<colgroup>
                <col width="10%">
                <col width="20%">
                <col width="15%">
                <col width="15%">
                <col width="15%">
                <col width="10%">
                <col width="15%">
        </colgroup>
        <thead>
                <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
<!--                 <th scope="col">브랜드</th> -->
<!--                 <th scope="col">최저가</th> -->
<!--                 <th scope="col">카테고리</th> -->
                </tr>
        </thead>
        <tbody id="list">
         </tbody>
    </table>    
	</div>
</body>
</html>