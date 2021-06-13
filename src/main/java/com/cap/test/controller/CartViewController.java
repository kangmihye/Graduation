package com.cap.test.controller;

import java.util.ArrayList;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cap.test.service.CartService;
import com.cap.test.vo.CartVO;
import com.cap.test.vo.UserVO;

@Controller
public class CartViewController {

	private static final Logger logger = LoggerFactory.getLogger(CartViewController.class);

	@Autowired
	private CartService service;

	
	//비회원 pw 등록0
	@RequestMapping(value="/user/pwInsert",method=RequestMethod.GET)
	public String login(String user_pw){
		logger.info("입력한 패스워드 : {}",user_pw);
		String path=service.pwInsert(user_pw);
		return path;
				}
	

	//로그인 폼 이동
	@RequestMapping(value="/user/loginForm",method=RequestMethod.GET)
	public String loginForm() {
		logger.info("로그인 폼 이동");
		return "user/loginForm";
	}
	
	
	//로그인
	@RequestMapping(value="/user/login",method=RequestMethod.POST)
	public String login(UserVO user) {
		logger.info("입력된 로그인 정보:{}",user);
		String path=service.userLogin(user);
		return path;
	}
	
	//로그아웃
	@RequestMapping(value="/user/logout",method=RequestMethod.GET)
	public String logout(UserVO user) {
		service.logout();
		logger.info("로그아웃");
		return "redirect:/";
	}
	
	//검색 폼 이동
	@RequestMapping(value="/user/searchForm",method=RequestMethod.GET)
	public String searchForm() {
		logger.info("검색 폼 이동");
		return "user/searchForm";
	}
	
	//장바구니 폼 이동 & 장바구니 리스트 불러오기
	@RequestMapping(value="/user/cartForm",method=RequestMethod.GET)
	public String cartForm(Model model) {
		logger.info("검색 폼 이동");
		
		ArrayList<HashMap<Integer,Object>> list=service.cartSelectAll();
		model.addAttribute("cartList",list);
		return "user/cartForm";
	}
	
	//장바구니 삭제
	@RequestMapping(value="/user/delete",method=RequestMethod.GET)
	public String cartDelete(CartVO cart){
		logger.info("장바구니 삭제 :{}",cart);
		service.cartDelete(cart);
		return "redirect:/user/cartForm";
	}
	
	
}
