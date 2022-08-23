package npc.data;

import npc.data.mappers.GameMapper;
import npc.models.Game;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Objects;

@Repository
public class GameJdbcTemplateRepository implements GameRepository {
    private final JdbcTemplate jdbcTemplate;

    public GameJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Game> findAll() {
        final String sql = "select id, title, release_date, developer, score, media_id, genre from game";
        return jdbcTemplate.query(sql, new GameMapper());
    }

    @Override
    public Game findById(int gameId) {
        final String sql = "select id, title, release_date, developer, score, media_id, genre from game "
                + "where id = ?;";

        return jdbcTemplate.query(sql, new GameMapper(), gameId)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    public Game add(Game game) {
        final String sql = "insert into game " +
                "(id, title, release_date, developer, score, media_id, genre) values (?,?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, game.getGameId());
            ps.setString(2, game.getTitle());
            ps.setDate(3, Date.valueOf(game.getReleaseDate()));
            ps.setString(4, game.getDeveloper());
            ps.setInt(5, game.getScore());
            ps.setInt(6, game.getMediaId());
            ps.setString(7, game.getGenre());

            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        game.setGameId(Objects.requireNonNull(keyHolder.getKey()).intValue());
        return game;
    }

    @Override
    public boolean deleteById(int gameId) {
        return jdbcTemplate.update("delete from game where id = ?;",
                gameId) > 0;
    }
}