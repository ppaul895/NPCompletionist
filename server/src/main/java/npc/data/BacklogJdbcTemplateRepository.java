package npc.data;

import npc.models.Backlog;
import npc.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BacklogJdbcTemplateRepository implements BacklogRepository {

    private final JdbcTemplate jdbcTemplate;

    public BacklogJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Backlog> findAll() {
        return null;
    }

    @Override
    public User findById(int backlog_Id) {
        return null;
    }

    @Override
    public User add(Backlog backlog) {
        return null;
    }

    @Override
    public boolean update(Backlog backlog) {
        return false;
    }

    @Override
    public boolean deleteById(int backlog_Id) {
        return false;
    }
}
