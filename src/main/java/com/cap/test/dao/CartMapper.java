package com.cap.test.dao;

import java.util.ArrayList;
import java.util.HashMap;

import com.cap.test.vo.CartVO;
import com.cap.test.vo.UserVO;

public interface CartMapper {
	
	//비회원 가입
	public int pwInsert(String user_pw);
	
	//로그인
	public UserVO userLogin(String user_pw);
	
	
	
	//장바구니 링크 담기
	public int cartInsert(CartVO cart);
	
	//장바구니 리스트 불러오기
	public ArrayList<HashMap<Integer,Object>> cartSelectAll(int user_no);
	
	//장바구니 삭제
	public int cartDelete(CartVO cart);
}
