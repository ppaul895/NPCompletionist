package npc.data;

import npc.data.mappers.GameMapper;
import npc.data.mappers.PlatformMapper;
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
        List<Game> allGames = jdbcTemplate.query(sql, new GameMapper());
        for (Game g : allGames) {
            addPlatforms(g);
        }
        return allGames;
    }

    @Override
    public Game findById(int gameId) {
        final String sql = "select id, title, release_date, developer, score, media_id, genre from game "
                + "where id = ?;";

        Game game = jdbcTemplate.query(sql, new GameMapper(), gameId)
                .stream()
                .findFirst().orElse(null);

        if (game != null) {
            addPlatforms(game);
        }

        return game;
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

    private void addPlatforms(Game game) {
        final String sql = "select p.id, p.name " +
                "from platform p " +
                "inner join game_platform gp on gp.platform_id = p.id " +
                "inner join game g on g.id = gp.game_id " +
                "where g.id = ?;";

        var platforms = jdbcTemplate.query(sql, new PlatformMapper(), game.getGameId());
        game.setPlatforms(platforms);
    }
}