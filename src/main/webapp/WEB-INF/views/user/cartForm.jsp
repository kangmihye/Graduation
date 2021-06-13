<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>cart Form</title>
<style type="text/css">
 body,p,h1,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,table,th,td,form,fieldset,legend,input,textarea,button,select{margin:0;padding:0}
 body,input,textarea,select,button,table{font-family:'돋움',Dotum,AppleGothic,sans-serif;font-size:12px}
 
.tbl_type,.tbl_type th,.tbl_type td{border:0}
.tbl_type{width:100%;border-bottom:2px solid #dcdcdc;font-family:Tahoma;font-size:11px;text-align:center}
.tbl_type caption{display:none}
.tbl_type th{padding:7px 0 4px;border-top:2px solid #dcdcdc;background-color:#f5f7f9;color:#666;font-family:'돋움',dotum;font-size:12px;font-weight:bold}
.tbl_type td{padding:6px 0 4px;border-top:1px solid #e5e5e5;color:#4c4c4c}

h1{
	padding: 6px;
	color: #aaa;
	font-family: "Roboto", Helvetica, sans-serif;
	font-size: 50px;
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
    font-size:12px;
    font-family: "Roboto", Helvetica, sans-serif;
    font-weight: 400;
    line-height: 1.65;
    color: #aaa;
}

	a:hover {
			border-bottom-color: transparent;
			color: #00D3B7;
		}
		
.del{
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
	
	.del:hover{
			border-color: #00D3B7;
			color: #00D3B7;
		}

			.del:hover:active{
				background-color: rgba(0, 211, 183, 0.15);
			}
</style>
<script type="text/javascript">
function listDelete(cart_no){
	location.href="/user/delete?cart_no="+cart_no;
	
}
</script>
</head>
<body>

<div style="text-align: center;">
<a href="/" style="font-size:30px;">HOME</a>
<h1>Cart</h1>
<table border="1" class="tbl_type">
	<thead>
		<tr>
			<th>이미지</th>
			<th>상품이름</th>
			<th>링크</th>
			<th>삭제</th>
		</tr>
	</thead>
	<tbody>
	<c:forEach var="list" items="${cartList}">
		<tr>
			<td><img src="${list.PRODUCT_IMAGE}" width="200px" height="200px"></td>
			<td>${list.PRODUCT_NM}</td>
			<td><a href="${list.PRODUCT_LINK}">${list.PRODUCT_LINK}</a></td>
			<td>
				<input type="button" value="삭제" class="del" onclick="listDelete(${list.CART_NO})">
			</td>
		</tr>
	</c:forEach>
	</tbody>
</table>

</div>
</body>
</html>