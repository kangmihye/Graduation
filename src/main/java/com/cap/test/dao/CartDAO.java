package com.cap.test.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cap.test.vo.CartVO;
import com.cap.test.vo.UserVO;

@Repository
public class CartDAO {

	@Autowired
	private SqlSession session;
	
	
	//비회원 가입
	public int pwInsert(String user_pw) {
		int cnt=0;
		try {
			CartMapper mapper=session.getMapper(CartMapper.class);
			cnt=mapper.pwInsert(user_pw);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return cnt;
	}
	
	 //로그인
    public UserVO userLogin(String user_pw) {
    	UserVO result=null;
    	try {
    		CartMapper mapper=session.getMapper(CartMapper.class);
    		result=mapper.userLogin(user_pw);
    	}catch (Exception e) {
    		e.printStackTrace();
    	}
    	return result;
    }
    
    
    
    //장바구니 링크 담기
  	public int cartInsert(CartVO cart) {
  		int cnt=0;
		try {
			CartMapper mapper=session.getMapper(CartMapper.class);
			cnt=mapper.cartInsert(cart);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return cnt;
  	}
  	
  	//장바구니 리스트 불러오기
  	public ArrayList<HashMap<Integer,Object>> cartSelectAll(int user_no){
  		ArrayList<HashMap<Integer,Object>> list = null;
  		try {
  			CartMapper mapper=session.getMapper(CartMapper.class);
  			list=mapper.cartSelectAll(user_no);
  		} catch (Exception e) {
  			e.printStackTrace();
  		}
  		return list;
  	}

  	//장바구니 삭제
  	public int cartDelete(CartVO cart) {
  		int cnt=0;
  		try {
  			CartMapper mapper=session.getMapper(CartMapper.class);
  			cnt=mapper.cartDelete(cart);
  		} catch (Exception e) {
  			e.printStackTrace();
  		}
  		return cnt;
  	}
  	
  	
}




	
