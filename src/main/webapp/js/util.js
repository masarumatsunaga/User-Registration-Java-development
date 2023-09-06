const UtilModule = (() => {

	// 日付変換
	function formatDate(datetime) {
		let formatted_date = datetime.getFullYear() + "年" + (datetime.getMonth() + 1) + "月" +
			datetime.getDate() + "日" + "  " + ('0' + datetime.getHours()).slice(-2) + ":" + ('0' + datetime.getMinutes()).slice(-2) + ":" +
			('0' + datetime.getSeconds()).slice(-2);
		return formatted_date;
	}
	// 前後の空白削除
	function stripper(str) {
		let s = str.trim();
		return s;
	}

	return {
		formatDate,
		stripper
	}
})()