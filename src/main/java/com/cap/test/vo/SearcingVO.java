package com.cap.test.vo;

import lombok.Data;

@Data
public class SearcingVO {
	private String query;//검색어
	
	private int display; //검색된 검색 결과의 개수
	private String title; //제목
	private String link;//링크
	private String image;//썸네일이미지
	private int lprice;//최저가
	private int hprice;//최고가
	private String mallName;//판매하는 쇼핑몰 상호
	private String category1;//상품 카테고리 분류
	private String category2;
	private String category3;
	private String category4;
	private String brand;//상품 브랜드
	private String maker;//제조사
}
