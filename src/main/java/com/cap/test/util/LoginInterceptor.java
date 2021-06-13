package com.cap.test.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.cap.test.vo.UserVO;

/**
 * 사용자 로그인 확인 인터셉터. HandlerInterceptorAdapter를 상속받아서 정의.
 */
public class LoginInterceptor extends HandlerInterceptorAdapter {
	private static final Logger logger = LoggerFactory.getLogger(LoginInterceptor.class);

	//콘트롤러의 메서드 실행 전에 처리(요청이 가기 전에)
	//로그인이 됐는지 안됐는지 확인하기
	@Override			//클라이언트->서버 요청정보 객체,스프링이 원래 가지고 있는 객체   응답 객체
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		logger.debug("LoginInterceptor 실행");
		
		//세션의 로그인 정보 읽기
		//DI를 받을 수 없음, 컨트롤러가 아직 실행이 되기 전의 상황이라
		HttpSession session = request.getSession();//그래서 요청에서 세션을 꺼내옴
		String loginVO = (String) session.getAttribute("loginPw");//로그인 값을 꺼내옴
		
		//로그인되지 않은 경우 로그인 페이지로 이동
		if (loginVO == null) {
			//request.getContextPath()로 루트 경로를 구하여 절대 경로로 처리
			response.sendRedirect(request.getContextPath() + "/user/loginForm");//재요청
			return false;//요청 	  http://localhost:8888
		}						//로컬주소 반환해줌
		//로그인 된 경우 요청한 경로로 진행
		return super.preHandle(request, response, handler);//true함(요청 통과)
	}

}