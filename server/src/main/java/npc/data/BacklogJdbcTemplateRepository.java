package npc.data;

import npc.data.mappers.BacklogMapper;
import npc.models.Backlog;
import npc.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class BacklogJdbcTemplateRepository implements BacklogRepository {

    private final JdbcTemplate jdbcTemplate;

    public BacklogJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Backlog> findAll() {
        final String sql = "select id, user_id, game_id, isCompleted, datetime_added from backlog limit 1000;";
        return jdbcTemplate.query(sql, new BacklogMapper());
    }

    @Override
    @Transactional
    public Backlog findById(int backlogId) {
        final String sql = "select id, user_id, game_id, isCompleted, datetime_added"
                + "from backlog "
                + "where id = ?;";

        Backlog result = jdbcTemplate.query(sql, new BacklogMapper(), backlogId).stream()
                .findAny().orElse(null);

        return result;
    }

    @Override
    public Backlog add(Backlog backlog) {

        final String sql = "insert into backlog (id, user_id, game_id, isCompleted, datetime_added) "
                + " values (?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, backlog.getBacklogId());
            ps.setInt(2, backlog.getUserId());
            ps.setInt(3, backlog.getGameId());
            ps.setBoolean(4, backlog.isCompleted());
            ps.setTimestamp(5, backlog.getDatetimeAdded());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        backlog.setBacklogId(keyHolder.getKey().intValue());
        return backlog;
    }

    @Override
    public boolean update(Backlog backlog) {

        final String sql = "update backlog set "
                + "id = ?, "
                + "user_id = ?, "
                + "game_id = ?, "
                + "isCompleted = ?, "
                + "datetime_added = ? "
                + "where id = ?;";

        return jdbcTemplate.update(sql,
                backlog.getBacklogId(),
                backlog.getUserId(),
                backlog.getGameId(),
                backlog.getDatetimeAdded()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int backlogId) {
        jdbcTemplate.update("delete from backlog where game_id = ?;", backlogId);
        return jdbcTemplate.update("delete from backlog where game_id = ?;", backlogId) > 0;
    }
}
