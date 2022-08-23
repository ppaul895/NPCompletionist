package npc.data;

import npc.data.mappers.PlatformMapper;
import npc.models.Platform;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PlatformJdbcTemplateRepository implements PlatformRepository {
    private final JdbcTemplate jdbcTemplate;

    public PlatformJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Platform> findAll() {
        final String sql = "select id, name from platform";
        return jdbcTemplate.query(sql, new PlatformMapper());
    }

    @Override
    public Platform findById(int platformId) {
        final String sql = "select id, name from platform "
                + "where id = ?;";

        return jdbcTemplate.query(sql, new PlatformMapper(), platformId)
                .stream()
                .findFirst().orElse(null);
    }
}