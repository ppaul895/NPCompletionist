package npc.data.mappers;

import npc.models.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet resultSet, int i) throws SQLException {
        User user = new User();
        user.setUserId(resultSet.getInt("id"));
        user.setUserName(resultSet.getString("username"));
        user.setUserPassword(resultSet.getString("password"));
        return user;
    }
}