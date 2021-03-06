package com.cap.test.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cap.test.service.CartService;
import com.cap.test.vo.CartVO;
import com.cap.test.vo.SearcingVO;


@RestController
public class CartRestController {

	private static final Logger logger = LoggerFactory.getLogger(CartRestController.class);

	@Autowired
	private CartService service;
	
	//회원 체크
	@RequestMapping(value="/user/idCheck",method=RequestMethod.POST)
	public boolean idCheck(String user_pw) {
		boolean flag=service.idCheck(user_pw);
		logger.info("입력된 pw 정보:{}",user_pw);
		return flag;
	}
	
	//장바구니 등록
	@RequestMapping(value={"/user/cartInsert","/cartInsert"},method=RequestMethod.POST)
	public boolean cartInsert(CartVO cart) {
		boolean flag=service.cartInsert(cart);
		logger.info("입력된 cart 정보:{}",cart);
		return flag;
	}
	
	
	//API
	@RequestMapping(value={"/user/searching","/searching"},method=RequestMethod.GET,produces="application/text;charset=utf8")
	public String searching(SearcingVO vo,int display) {
		 	String clientId = "ezWCgabUwRZd_3Jqo1DE"; //애플리케이션 클라이언트 아이디값"
	        String clientSecret = "rvxIU7sIIN"; //애플리케이션 클라이언트 시크릿값"
	        
	       // String jsonParse = ""; //JSON 형태로 변환된 문자열
	        vo.setDisplay(display);
	
	        String text = null;
	        try {
	            text = URLEncoder.encode(vo.getQuery(), "UTF-8");
	        } catch (UnsupportedEncodingException e) {
	            throw new RuntimeException("검색어 인코딩 실패",e);
	        }
	
	
	        String apiURL = "https://openapi.naver.com/v1/search/shop?query=" +text+"&display="+vo.getDisplay();    //12 json 결과
	
	
	        Map<String, String> requestHeaders = new HashMap<>();
	        requestHeaders.put("X-Naver-Client-Id", clientId);
	        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
	        String responseBody = get(apiURL,requestHeaders);
	
	
	        System.out.println(responseBody);
	        
	        return responseBody;
	    }
	
	
	    private static String get(String apiUrl, Map<String, String> requestHeaders){
	        HttpURLConnection con = connect(apiUrl);
	        try {
	            con.setRequestMethod("GET");
	            for(Map.Entry<String, String> header :requestHeaders.entrySet()) {
	                con.setRequestProperty(header.getKey(), header.getValue());
	            }
	
	
	            int responseCode = con.getResponseCode();
	            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
	                return readBody(con.getInputStream());
	            } else { // 에러 발생
	                return readBody(con.getErrorStream());
	            }
	        } catch (IOException e) {
	            throw new RuntimeException("API 요청과 응답 실패", e);
	        } finally {
	            con.disconnect();
	        }
	    }
	
	
	    private static HttpURLConnection connect(String apiUrl){
	        try {
	            URL url = new URL(apiUrl);
	            return (HttpURLConnection)url.openConnection();
	        } catch (MalformedURLException e) {
	            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
	        } catch (IOException e) {
	            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
	        }
	    }
	
	
	    private static String readBody(InputStream body){
	        InputStreamReader streamReader = new InputStreamReader(body);
	
	
	        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
	            StringBuilder responseBody = new StringBuilder();
	
	
	            String line;
	            while ((line = lineReader.readLine()) != null) {
	                responseBody.append(line);
	            }
	
	
	            return responseBody.toString();
	        } catch (IOException e) {
	            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
	        }
		 }
}
