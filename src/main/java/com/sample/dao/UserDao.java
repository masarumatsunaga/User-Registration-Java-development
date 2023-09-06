package com.sample.dao;

import java.util.List;

import com.sample.Users;

public interface UserDao {

	public List<Users> selectAll();

	public Users findPrimarykey(int id);

	public void insert(Users user);

	public void delete(int id);

	public void update(Users user);
}
