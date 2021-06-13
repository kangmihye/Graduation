package com.cap.test.service;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cap.test.dao.CartDAO;
import com.cap.test.vo.CartVO;
import com.cap.test.vo.UserVO;

@Service
public class CartService {

	private static final Logger logger = LoggerFactory.getLogger(CartService.class);

	@Autowired
	private CartDAO dao;
	
	@Autowired
	private HttpSession session;
	
	//비회원 가입
	public String pwInsert(String user_pw) {
		int cnt=dao.pwInsert(user_pw);
		String path="";
		
		if(cnt==0){
			logger.info("pw 등록 실패");
			path="redirect:/user/loginForm";
		}else {
			logger.info("pw 등록 성공");
			path="redirect:/";
		}
		return path;
	}
	
	//pw 중복검사
		public boolean idCheck(String user_pw) {
			UserVO result=dao.userLogin(user_pw);//유저 pw 값으로 db에서 조회한 결과
			logger.info("{}",result);
			
			boolean flag=false;
			
			if(result==null) {//pw가 존재 x 써도 됨
				flag=true;
			}
			return flag;
		}
	
	//로그인
	public String userLogin(UserVO user) {
		UserVO result=dao.userLogin(user.getUser_pw()); //id값으로 로그인에 맞는 결과 객체로 받음
		String path="";
		
		
		//pw값으로만 조회
		if(result != null) {//pw 맞으면
			if(result.getUser_pw().equals(user.getUser_pw())) {//비번 맞으면
				logger.info("로그인 성공");
				session.setAttribute("loginPw", result.getUser_pw());//세션에 pw값 넣음
				session.setAttribute("loginNo", result.getUser_no());
				path="redirect:/";
			}
		}else {
				logger.info("비밀번호 오류");
				path="redirect:/user/loginForm";
		}
		return path;
	}
	
	//로그아웃
	public void logout() {
		session.removeAttribute("loginPw");
		session.removeAttribute("loginNo");
	}
	
	
	
	//장바구니 링크 담기
  	public boolean cartInsert(CartVO cart) {
  		int user_no=(int)session.getAttribute("loginNo");
  		cart.setUser_no(user_no);
  		
  		int cnt=dao.cartInsert(cart);
  		boolean flag=false;
		
		if(cnt==0){
			logger.info("장바구니 등록 실패");
		}else {
			logger.info("장바구니 등록 성공");
			flag=true;
		}
		return flag;
  	}
  	
  	//장바구니 리스트 불러오기
  	public ArrayList<HashMap<Integer,Object>> cartSelectAll(){
  		int user_no=(int)session.getAttribute("loginNo");
  		ArrayList<HashMap<Integer,Object>> list=dao.cartSelectAll(user_no);
  		logger.info("장바구니 리스트 {}",list);
  		return list;
  	}
  	
  //장바구니 삭제
  	public void cartDelete(CartVO cart) {
  		int user_no=(int)session.getAttribute("loginNo");
  		cart.setUser_no(user_no);
  		
  		int cnt=dao.cartDelete(cart);
  		
  		if(cnt==0) {
			logger.info("장바구니 삭제 실패:{}",cart);
		}else {
			logger.info("장바구니 삭제 성공 :{}",cart);
			}
  	}
  	
  	
}
