package com.sample;

import java.util.Date;

public class Users {

	private int userid;
	private String name;
	private String password;
	private Date created_at;
	private Date updated_at;
	private Boolean delete_flag;

	public Users() {
		super();
	}

	public int getId() {
		return userid;
	}

	public void setId(int id) {
		this.userid = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public Date getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}

	public Boolean getDelete_flag() {
		return delete_flag;
	}

	public void setDelete_flag(Boolean delete_flag) {
		this.delete_flag = delete_flag;
	}

	@Override
	public String toString() {
		return "Users [id=" + userid + ", name=" + name + ", password=" + password + ", created_at=" + created_at
				+ ", updated_at=" + updated_at + ", delete_flag=" + delete_flag + "]";
	}

}
