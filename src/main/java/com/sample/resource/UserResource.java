package com.sample.resource;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sample.Users;
import com.sample.dao.UserDao;
import com.sample.exec.Executor;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("Users")
public class UserResource {

	// 全件取得
	@GET
	@Produces("application/json")
	public List<Users> selectAll() {
		try (SqlSession session = Executor.initquery().openSession()) {
			UserDao dao = session.getMapper(UserDao.class);

			System.out.println("userGet");
			List<Users> list = dao.selectAll();
			session.commit();
			return list;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// 1件検索
	@GET
	@Path("{id}")
	@Produces("application/json")
	public Users select(@PathParam("id") int id) {
		try (SqlSession session = Executor.initquery().openSession()) {
			UserDao dao = session.getMapper(UserDao.class);
			Users user = dao.findPrimarykey(id);
			session.commit();
			System.out.println("searchGet : " + user);
			if (user != null) {
				return user;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// 追加
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Response insert(JsonNode node) {
		Users user = new Users();
		try (SqlSession session = Executor.initquery().openSession()) {
			UserDao dao = session.getMapper(UserDao.class);
			System.out.println(node);
			System.out.println("userPost");
			user.setName(node.get("name").textValue());
			user.setPassword(node.get("password").textValue());
			user.setCreated_at(new Date());
			user.setUpdated_at(new Date());
			user.setDelete_flag(false);
			dao.insert(user);
			session.commit();
			ObjectMapper mapper = new ObjectMapper();
			String json = mapper.writeValueAsString(user);
			System.out.println(json);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(201, "新規作成しました").build();
		//return Response.ok(user, MediaType.APPLICATION_JSON).build();
	}

	@DELETE
	@Path("{id}")
	@Consumes("application/json")
	public Response delete(@PathParam("id") int id) {

		try (SqlSession session = Executor.initquery().openSession();) {
			UserDao dao = session.getMapper(UserDao.class);
			dao.delete(id);
			session.commit();
			System.out.println("Deleted!");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

	@PUT
	@Path("{id}")
	@Produces("application/json")
	public Response put(@PathParam("id") int id, JsonNode node) {

		try (SqlSession session = Executor.initquery().openSession();) {
			UserDao dao = session.getMapper(UserDao.class);
			Users oldUser = dao.findPrimarykey(id);
			System.out.println(oldUser);
			System.out.println(node);
			oldUser.setName(node.get("name").textValue());
			oldUser.setPassword(node.get("password").textValue());
			oldUser.setUpdated_at(new Date());
			dao.update(oldUser);
			session.commit();
			System.out.println("Put!");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.ok().build();
	}

}
