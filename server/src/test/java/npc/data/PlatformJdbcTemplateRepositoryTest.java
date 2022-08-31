package npc.data;

import npc.models.Platform;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class PlatformJdbcTemplateRepositoryTest {

    @Autowired
    PlatformJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Platform> platforms = repository.findAll();
        assertNotNull(platforms);
        assertEquals(14, platforms.size());
    }

    @Test
    void shouldFindById() {
        Platform mac = new Platform();
        mac.setPlatformId(6);
        mac.setName("Apple Macintosh");

        Platform actual = repository.findById(6);
        assertEquals(mac, actual);

        actual = repository.findById(20);
        assertNull(actual);
    }
}