package npc.data.mappers;

import npc.models.Game;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GameMapper implements RowMapper<Game> {
    @Override
    public Game mapRow(ResultSet resultSet, int i) throws SQLException {
        Game game = new Game();
        game.setGameId(resultSet.getInt("id"));
        game.setTitle(resultSet.getString("title"));
        game.setReleaseDate(resultSet.getDate("release_date").toLocalDate());
        game.setDeveloper(resultSet.getString("developer"));
        game.setScore(resultSet.getInt("score"));
        game.setMediaId(resultSet.getInt("media_id"));
        game.setGenre(resultSet.getString("genre"));
        return game;
    }
}