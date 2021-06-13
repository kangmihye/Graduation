package com.cap.test.vo;

import lombok.Data;

@Data
public class CartVO {
	
	private int cart_no;
	private int user_no;
	private String product_link;
	private String product_nm;
	private String product_image;
}
