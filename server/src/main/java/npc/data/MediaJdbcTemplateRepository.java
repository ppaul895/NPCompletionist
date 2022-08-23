package npc.data;

import npc.data.mappers.MediaMapper;
import npc.models.Media;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
//@Profile("jdbc-template")
public class MediaJdbcTemplateRepository implements MediaRepository {

    private final JdbcTemplate jdbcTemplate;

    public MediaJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Media> findAll() {
        final String sql = "select id, image_url, trailer_url "
                + "from media;";
        return jdbcTemplate.query(sql, new MediaMapper());
    }


    @Override
    public Media findById(int mediaId) {

        final String sql = "select id, image_url, trailer_url "
                + "from media "
                + "where id = ?;";

        return jdbcTemplate.query(sql, new MediaMapper(), mediaId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public Media add(Media media) {

        final String sql = "insert into media (image_url, trailer_url)"
                + "values (?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, media.getImage_url());
            ps.setString(2, media.getTrailer_url());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        media.setMediaId(keyHolder.getKey().intValue());
        return media;
    }


}
