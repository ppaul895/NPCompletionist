package npc.data.mappers;

import npc.models.Platform;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PlatformMapper implements RowMapper<Platform> {

    @Override
    public Platform mapRow(ResultSet resultSet, int i) throws SQLException {
        Platform platform = new Platform();
        platform.setPlatformId(resultSet.getInt("id"));
        platform.setName(resultSet.getString("name"));
        return platform;
    }
}