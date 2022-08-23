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
        assertEquals(13, platforms.size());
    }

    @Test
    void shouldFindById() {
        Platform xb1 = new Platform();
        xb1.setPlatformId(6);
        xb1.setName("Xbox One");

        Platform actual = repository.findById(6);
        assertEquals(xb1, actual);

        actual = repository.findById(20);
        assertNull(actual);
    }
}