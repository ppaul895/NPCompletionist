package npc.data;

import npc.data.mappers.BacklogMapper;
import npc.data.mappers.UserMapper;
import npc.models.Backlog;
import npc.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class UserJdbcTemplateRepository implements UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> findAll() {
        final String sql = "select id, username, password from user limit 1000;";
        return jdbcTemplate.query(sql, new UserMapper());
    }

    @Override
    @Transactional
    public User findById(int userId) {
        final String sql = "select id, username, password "
                + "from user "
                + "where id = ?;";

        User result = jdbcTemplate.query(sql, new UserMapper(), userId).stream()
                .findAny().orElse(null);

        return result;
    }

    @Override
    public User add(User user) {

        final String sql = "insert into user (id, username, password) "
                + " values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, user.getUserId());
            ps.setString(2, user.getUserName());
            ps.setString(3, user.getUserPassword());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setUserId(keyHolder.getKey().intValue());
        return user;
    }
}