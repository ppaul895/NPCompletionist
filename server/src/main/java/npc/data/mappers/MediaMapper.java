package npc.data.mappers;

import npc.models.Media;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MediaMapper implements RowMapper<Media> {

    @Override
    public Media mapRow(ResultSet resultSet, int i) throws SQLException {
        Media media = new Media();
        media.setMediaId(resultSet.getInt("id"));
        media.setImage_url(resultSet.getString("image_url"));
        media.setTrailer_url(resultSet.getString("trailer_url"));
        return media;
    }
}
