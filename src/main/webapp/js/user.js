const UsersModule = (() => {

	const BASE_URL = 'http://localhost:8080/UserJaxRS/';
	const URL = 'api/Users';
	// ヘッダーの設定
	const headers = new Headers();
	headers.set("Content-Type", "application/json");

	const handleError = async (res) => {
		switch (res.status) {
			case 200:
				window.location.href = "/";
				break;
			case 201:
				window.location.href = "/";
				break;
			case 400:
				// リクエストのパラメータ間違い
				alert('パラメータが違います');
				break;
			case 404:
				// 指定したリソースが見つからない
				alert('リソースが見つかりません');
				break;
			case 500:
				// サーバーの内部エラー
				alert('サーバでエラーが発生しています。');
				break;
			default:
				alert("何らかのエラーが発生しました。");
				break;
		}
	}

	return {
		// GET
		fetchAllUsers: async () => {
			const res = await fetch(URL);
			const users = await res.json();
			let body = "";
			console.log(users);
			for (let i = 0; i < users.length; i++) {
				const user = users[i];
				if (!user.delete_flag) {
					const createDate = UtilModule.formatDate(new Date(user.created_at));
					const updateDate = UtilModule.formatDate(new Date(user.updated_at));
					body = `<tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${createDate}</td>
                    <td>${updateDate}</td>
                    <td><a href="edit.html?id=${user.id}">編集</a></td>
                    <td><a href="?id=${user.id}" class="delete-btn">削除</a></td>
                  </tr>`;
					document.getElementById('userList').insertAdjacentHTML('beforeend', body);
				}
			}
		},
		// search
		searchUsers: async () => {
			// 検索窓の入力値を取得
			const query = UtilModule.stripper(document.getElementById('search').value)
			let body = ""
			// 数値(id)であるか、空白でないかをチェックする
			if (!isNaN(query) && !query == "") {
				const res = await fetch(URL + '/' + query)
				if (res.ok) {
					const user = await res.json()
					const createDate = UtilModule.formatDate(new Date(user.created_at));
					const updateDate = UtilModule.formatDate(new Date(user.updated_at));
					body += `<tr>
			                   	<td>${user.id}</td>
			                   	<td>${user.name}</td>
			                    <td>${createDate}</td>
			                    <td>${updateDate}</td>
			                    <td><a href="edit.html?id=${user.id}">編集</a></td>
			                    <td><a href="?id=${user.id}" class="delete-btn">削除</a></td>
                  			</tr>`
					document.getElementById('userList').innerHTML = body
				} else {
					return handleError(res)
				}
			// 検索窓に適切な値が入力されなかった場合、テーブルを空にする。
			} else {
				alert('入力されたID番号は見つかりませんでした。')
				document.getElementById('userList').innerHTML = body
				return UsersModule.fetchAllUsers()
			}
		},
		// POST
		createUser: async () => {
			const name = UtilModule.stripper(document.getElementById('username').value);
			const password = UtilModule.stripper(document.getElementById('password').value);
			if (!name == "" && !password == "") {
				// リクエストのbody
				const body = {
					name: name,
					password: password
				};
				const param = {
					method: 'POST',
					headers: headers,
					body: JSON.stringify(body)
				};
				const res = await fetch(URL, param);
				const data = await res.json();
				if (!res.ok) {
					console.log(data.description);
					return handleError(res)
				}
				return UsersModule.fetchAllUsers()
			} else {
				alert('名前とパスワードを両方入力してください')
			}
		},

		// update 既存の値をedit.htmlのinputタグに設定
		setExistingValue: async (id) => {
			const res = await fetch(URL + "/" + id);
			const resJson = await res.json();
			console.log(resJson);
			document.getElementById('number').innerHTML = 'ID : ' + resJson.id;
			document.getElementById('edit-name').value = resJson.name;
			document.getElementById('edit-pass').value = resJson.password
		},
		// update 更新処理
		saveUser: async (id) => {
			const name = UtilModule.stripper(document.getElementById("edit-name").value)
			const pass = UtilModule.stripper(document.getElementById("edit-pass").value)
			if (!name == "" && !pass == "") {
				// リクエストのbody
				const body = {
					name: name,
					password: pass
				};
				const param = {
					method: 'PUT',
					headers: headers,
					body: JSON.stringify(body)
				};
				const res = await fetch(URL + "/" + id, param);
				if (!res.ok) {
					console.log(data.description);
					return handleError(res)
				}
				return window.location.href = BASE_URL;
			} else {
				alert('名前とパスワードを両方入力してください')
			}
		},

		// delete
		deleteUser: async (id) => {
			const ret = window.confirm('このユーザーを削除しますか？')
			if (!ret) {
				return window.location.href = BASE_URL;
			} else {
				const res = await fetch(URL + "/" + id, {
					method: "DELETE",
					headers: headers
				})
				const data = res.json();
				if (!res.ok) {
					console.log(data.description);
					return handleError(res)
				}
				return window.location.href = BASE_URL;
			}
		}
	}
})()
