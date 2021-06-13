<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>loginForm</title>
<style type="text/css">

div{
	position:absolute;
	text-align: left;
	border:  solid 10px #00D3B7;
	padding : 15px;
	top : 17%;
	left: 8%;
}

p{
	color: #00D3B7;
	font-weight: bold;
}

#loginBtn,
#pwInsert
	{
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
	#loginBtn:hover,
	#pwInsert:hover {
			border-color: #00D3B7;
			color: #00D3B7;
		}

			#loginBtn:hover:active,
			pwInsert:hover:active {
				background-color: rgba(0, 211, 183, 0.15);
			}


</style>
<script type="text/javascript" src="/resources/assets/js/jquery-3.6.0.js"></script>
<script type="text/javascript">

function formCheck(){
	//로그인 무결성 체크
	var user_pw=$("#user_pw").val();
	
	if(user_pw==0 || user_pw.length==0){
		alert("비밀번호를 입력해 주세요");
		return false;
	}
	
	return true;
	}
	
$(function(){
	//비회원 가입
		$("#pwInsert").on("click",function(){
			var user_pw=$("#user_pw").val();

			if(user_pw==0 || user_pw.length==0){
				alert("비밀번호를 입력해 주세요");
				}else{$.ajax({
						url : "/user/idCheck",
						type : "post",
						data :{
							user_pw : user_pw
							},
						success : function(data){
							console.log(data);
							
							if(data){//pw 사용가능하면
								if(confirm("사용 가능한 패스워드 입니다. 사용하시겠습니까?")==true){
									location.href="/user/pwInsert?user_pw="+user_pw;
								}else{
									$("#user_pw").val("");
									}
							}else{
								alert("중복된 pw 입니다 다시 입력해주세요");
									$("#user_pw").val("");//입력한 pw 없애버리기
								}
							},
						error : function(e){
							console.log(e);
						}
					});
				}
			});
		
});

</script>
</head>
<body>
	<div>
	<p>
		저희 홈페이지는 회원가입 없이 이미지만을 클릭하여 <br> 장바구니에 물건을 담을 수 있는 홈페이지입니다

	</p>
	
		<form action="/user/login" method="post" onsubmit="return formCheck();">
			<input type="password" name="user_pw" id="user_pw">
			<input type="submit" id="loginBtn" value="로그인">
			<input type="button" id="pwInsert" value="새로 가입">
		</form>
	</div>
</body>
</html>