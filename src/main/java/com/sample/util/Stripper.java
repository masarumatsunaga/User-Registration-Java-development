package com.sample.util;

import java.util.ArrayList;
import java.util.List;

public class Stripper {
	//空白削除
	public static String strip(String str) {
		List<String> list = new ArrayList<>();
		String array[] = str.split("(?!^)");
		for (String s : array) {
			String repstr = s.replaceAll("　", " ").replaceAll("\\s{2,}", " ").trim();
			list.add(repstr);
		}
		String convertStr = String.join("", list);
		if (convertStr.isEmpty()) {
			convertStr = null;
		}
		return convertStr;
	}
}
