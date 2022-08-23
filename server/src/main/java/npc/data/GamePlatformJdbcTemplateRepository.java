package npc.data;

import npc.data.mappers.GamePlatformMapper;
import npc.models.GamePlatform;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Objects;

@Repository
public class GamePlatformJdbcTemplateRepository implements GamePlatformRepository {
    private final JdbcTemplate jdbcTemplate;

    public GamePlatformJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<GamePlatform> findAll() {
        final String sql = "select id, game_id, platform_id from game_platform";
        return jdbcTemplate.query(sql, new GamePlatformMapper());
    }

    @Override
    public GamePlatform findById(int gamePlatformId) {
        final String sql = "select id, game_id, platform_id from game_platform "
                + "where id = ?;";

        return jdbcTemplate.query(sql, new GamePlatformMapper(), gamePlatformId)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    public GamePlatform add(GamePlatform gamePlatform) {
        final String sql = "insert into game_platform (id, game_id, platform_id) values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, gamePlatform.getGamePlatformId());
            ps.setInt(2, gamePlatform.getGameId());
            ps.setInt(3, gamePlatform.getPlatformId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        gamePlatform.setGamePlatformId(Objects.requireNonNull(keyHolder.getKey()).intValue());
        return gamePlatform;
    }
}