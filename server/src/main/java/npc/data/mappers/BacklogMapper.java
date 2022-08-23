package npc.data.mappers;

import npc.models.Backlog;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BacklogMapper implements RowMapper<Backlog> {
    @Override
    public Backlog mapRow(ResultSet resultSet, int i) throws SQLException {
        Backlog backlog = new Backlog();
        backlog.setBacklogId(resultSet.getInt("id"));
        backlog.setUserId(resultSet.getInt("user_id"));
        backlog.setGameId(resultSet.getInt("game_id"));
        backlog.setCompleted(resultSet.getBoolean("isCompleted"));
        backlog.setDatetimeAdded(resultSet.getTimestamp("datetime_added"));

        return backlog;
    }
}
