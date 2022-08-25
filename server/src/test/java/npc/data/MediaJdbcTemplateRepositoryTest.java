package npc.data;

import npc.models.Media;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MediaJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 4;
    @Autowired
    MediaJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Media> medias = repository.findAll();
        assertNotNull(medias);
        assertTrue(medias.size() > 0);
    }

    @Test
    void shouldFindById() {
        Media thisMedia = repository.findById(1);
        assertEquals(1, thisMedia.getMediaId());
        assertEquals("https://img.opencritic.com/game/12090/o/5BXKr5S1.jpg", thisMedia.getImage_url());
        assertEquals("https://youtube.com/watch?v=UhD0_MM4fnU", thisMedia.getTrailer_url());
    }

    @Test
    void shouldAdd() {
        Media media = makeMedia();
        Media actual = repository.add(media);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getMediaId());
    }

    private Media makeMedia() {
        Media media = new Media();
        media.setImage_url("https://img.opencritic.com/game/13509/o/KW0nVeXe.jpg");
        media.setTrailer_url("https://www.youtube.com/watch?v=xsPtUNB1z-Q");
        return media;
    }
}