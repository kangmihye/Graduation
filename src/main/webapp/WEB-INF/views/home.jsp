<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
	<head>
		<title>Lens by HTML5 UP</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="/resources/assets/css/main.css?af" />
		<noscript>
			<link rel="stylesheet" href="/resources/assets/css/noscript.css" />
		</noscript>
		<script type="text/javascript" src="/resources/assets/js/jquery-3.6.0.js"></script>
	</head>
	<body class="is-preload-0 is-preload-1 is-preload-2">

		<!-- Main -->
			<div id="main">

				<!-- Header -->
					<header id="header">
						<h1>비회원 장바구니</h1>
						<c:choose>
							<c:when test="${empty sessionScope.loginPw}">
								<p>회원 가입 없이 장바구니에 물건을 담으세요 <a href="/user/loginForm">장바구니 생성</a></p>
							</c:when>
							<c:otherwise>
								<p>${sessionScope.loginNo}번 고객님 환영합니다! <br> <a href="/user/logout">로그아웃</a></p>
								
							</c:otherwise>
						</c:choose>
						<ul class="icons">
							<li><a href="/user/cartForm" class="icon solid fa-shopping-cart"><span class="label">Cart</span></a></li>
							<li><a href="/user/searchForm" class="icon solid fa-search"><span class="label">Search</span></a></li>
						</ul>
					</header>

				<!-- Thumbnail -->
					<section id="thumbnails">
						<article>
							<a class="thumbnail" id="i1" href="/resources/images/fulls/img01.jpg" data-position="left center"><img src="/resources/images/thumbs/img01.jpg" alt="" /></a>							
							<h2>음료수를 담으세요</h2>
							<p>원하는 음료수를 클릭하면 자동으로 음료수의 링크가 장바구니에 담깁니다.</p>							
						</article>
						<article>
							<a class="thumbnail" href="/resources/images/fulls/img2.jpg"><img src="/resources/images/thumbs/img2.jpg" alt="" /></a>
							<h2>음료수를 담으세요</h2>
							<p>원하는 음료수를 클릭하면 자동으로 음료수의 링크가 장바구니에 담깁니다.</p>
						</article>
						<article>
							<a class="thumbnail" href="/resources/images/fulls/img03.jpg" data-position="top center"><img src="/resources/images/thumbs/img03.jpg" alt="" /></a>
							<h2>음료수를 담으세요</h2>
							<p>원하는 음료수를 클릭하면 자동으로 음료수의 링크가 장바구니에 담깁니다.</p>
						</article>
						<article>
							<a class="thumbnail" href="/resources/images/fulls/img04.jpg"><img src="/resources/images/thumbs/img04.jpg" alt="" /></a>
							<h2>음료수를 담으세요</h2>
							<p>원하는 음료수를 클릭하면 자동으로 음료수의 링크가 장바구니에 담깁니다.</p>
						</article>
						<article>
							<a class="thumbnail" href="/resources/images/fulls/img05.jpg" data-position="top center"><img src="/resources/images/thumbs/img05.jpg" alt="" /></a>
							<h2>음료수를 담으세요</h2>
							<p>원하는 음료수를 클릭하면 자동으로 음료수의 링크가 장바구니에 담깁니다.</p>
						</article>
						<article>
							<a class="thumbnail" href="/resources/images/fulls/img06.jpg"><img src="/resources/images/thumbs/img06.jpg" alt="" /></a>
							<h2>음료수를 담으세요</h2>
							<p>원하는 음료수를 클릭하면 자동으로 음료수의 링크가 장바구니에 담깁니다.</p>
						</article>
						<article>
							<a class="thumbnail" href="/resources/images/fulls/img07.jpg"><img src="/resources/images/thumbs/img07.jpg" alt="" /></a>
							<h2>음료수를 담으세요</h2>
							<p>원하는 음료수를 클릭하면 자동으로 음료수의 링크가 장바구니에 담깁니다.</p>
						</article>
						<article>
							<a class="thumbnail" href="/resources/images/fulls/img08.jpg"><img src="/resources/images/thumbs/img08.jpg" alt="" /></a>
							<h2>음료수를 담으세요</h2>
							<p>원하는 음료수를 클릭하면 자동으로 음료수의 링크가 장바구니에 담깁니다.</p>
						</article>
						<article>
							<a class="thumbnail" href="/resources/images/fulls/img09.jpg"><img src="/resources/images/thumbs/img09.jpg" alt="" /></a>
							<h2>음료수를 담으세요</h2>
							<p>원하는 음료수를 클릭하면 자동으로 음료수의 링크가 장바구니에 담깁니다.</p>
						</article>
						<article>
							<a class="thumbnail" href="/resources/images/fulls/img10.jpg"><img src="/resources/images/thumbs/img10.jpg" alt="" /></a>
							<h2>음료수를 담으세요</h2>
							<p>원하는 음료수를 클릭하면 자동으로 음료수의 링크가 장바구니에 담깁니다.</p>
						</article>
						<article>
							<a class="thumbnail" href="/resources/images/fulls/img11.jpg"><img src="/resources/images/thumbs/img11.jpg" alt="" /></a>
							<h2>음료수를 담으세요</h2>
							<p>원하는 음료수를 클릭하면 자동으로 음료수의 링크가 장바구니에 담깁니다.</p>
						</article>
						<article>
							<a class="thumbnail" href="/resources/images/fulls/img12.jpg"><img src="/resources/images/thumbs/img12.jpg" alt="" /></a>
							<h2>음료수를 담으세요</h2>
							<p>원하는 음료수를 클릭하면 자동으로 음료수의 링크가 장바구니에 담깁니다.</p>
						</article>
					</section>

				<!-- Footer -->
					<footer id="footer">
						<ul class="copyright">
							<li>&copy; Untitled.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a>.</li>
						</ul>
					</footer>

			</div>

		<!-- Scripts -->
			<script src="/resources/assets/js/jquery-3.6.0.js"></script>
			<script src="/resources/assets/js/browser.min.js"></script>
			<script src="/resources/assets/js/breakpoints.min.js"></script>
			<script src="/resources/assets/js/main.js?ver=1"></script>
<!-- 			<script src="/resources/assets/js/button.js?ver=1"></script> -->

	</body>
</html>
