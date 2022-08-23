package npc.data;

import npc.models.GamePlatform;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GamePlatformJdbcTemplateRepositoryTest {
    @Autowired
    GamePlatformJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<GamePlatform> gamePlatforms = repository.findAll();
        assertNotNull(gamePlatforms);
        assertEquals(16, gamePlatforms.size());
    }

    @Test
    void shouldFindById() {
        GamePlatform gamePlatform = new GamePlatform();
        gamePlatform.setGamePlatformId(8);
        gamePlatform.setGameId(2);
        gamePlatform.setPlatformId(4);

        GamePlatform actual = repository.findById(8);
        assertEquals(gamePlatform, actual);

        actual = repository.findById(25);
        assertNull(actual);
    }

    @Test
    void shouldAdd() {
        GamePlatform gamePlatform = new GamePlatform();
        gamePlatform.setGameId(4);
        gamePlatform.setPlatformId(3);

        GamePlatform actual = repository.add(gamePlatform);
        assertNotNull(actual);
        assertEquals(16, actual.getGamePlatformId());
    }
}