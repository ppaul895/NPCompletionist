package npc.data;

import npc.models.Media;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MediaJdbcTemplateRepositoryTest {

    @Autowired
    MediaJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

//    @Test
//    void findAll() {
//        List<Media> medias = repository.findAll();
//        assertNotNull(medias);
//    }

//    @Test
//    void findById() {
//    }
//
//    @Test
//    void add() {
//    }

}
