package npc.data.mappers;

import npc.models.GamePlatform;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GamePlatformMapper implements RowMapper<GamePlatform> {

    @Override
    public GamePlatform mapRow(ResultSet resultSet, int i) throws SQLException {
        GamePlatform gamePlatform = new GamePlatform();
        gamePlatform.setGamePlatformId(resultSet.getInt("id"));
        gamePlatform.setGameId(resultSet.getInt("game_id"));
        gamePlatform.setPlatformId(resultSet.getInt("platform_id"));
        return gamePlatform;
    }
}