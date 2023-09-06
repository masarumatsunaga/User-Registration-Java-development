const indexModule = (() => {
	const path = window.location.pathname

	switch (path) {
		case '/UserJaxRS/':
			// 検索ボタンをクリックした時のイベントリスナー設定
			document.getElementById('search-btn').addEventListener('click', () => {
				return UsersModule.searchUsers()
			})

			// 編集完了ボタン押下時
			document.getElementById('save-btn').addEventListener('click', () => {
				return UsersModule.createUser()
			})

			document.getElementById('cancel-btn').addEventListener('click', () => {
				return window.location.href = './'
			})

			// 削除リンク押下時
			document.addEventListener('click', (e) => {
				if (e.target.className !== 'delete-btn') {
					return;
				}
				const targetHref = e.target.href;
				const uid = targetHref.split('?id=')[1];
				//const uid = targetHref.split('/')[4];
				return UsersModule.deleteUser(uid)
			}, false);

			// UsersモジュールのfetchAllUsersメソッドを呼び出す
			return UsersModule.fetchAllUsers()

		case '/UserJaxRS/edit.html':
			const uid = window.location.search.split('?id=')[1]

			document.getElementById('edit-btn').addEventListener('click', () => {
				return UsersModule.saveUser(uid)
			})
			document.getElementById('cancel-btn').addEventListener('click', () => {
				return window.location.href = './'
			})

			return UsersModule.setExistingValue(uid)

		default:
			break;
	}
})()