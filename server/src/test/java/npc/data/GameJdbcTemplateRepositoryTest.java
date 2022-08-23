package npc.data;

import npc.models.Game;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GameJdbcTemplateRepositoryTest {

    @Autowired
    GameJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Game> games = repository.findAll();
        assertNotNull(games);
        assertEquals(4, games.size());
    }

    @Test
    void shouldFindById() {
        Game game = new Game();
        game.setGameId(3);
        game.setTitle("Halo Infinite");
        game.setReleaseDate(LocalDate.of(2021, 12, 8));
        game.setDeveloper("343 Industries");
        game.setScore(87);
        game.setMediaId(3);
        game.setGenre("Action");

        Game actual = repository.findById(3);
        assertEquals(game, actual);

        actual = repository.findById(10);
        assertNull(actual);
    }

    @Test
    void shouldAdd() {
        Game game = new Game();
        game.setTitle("TestTitle");
        game.setReleaseDate(LocalDate.now());
        game.setDeveloper("TestDeveloper");
        game.setScore(90);
        game.setMediaId(5);
        game.setGenre("TestGenre");

        Game actual = repository.add(game);
        assertNotNull(actual);
        assertEquals(5, actual.getGameId());

        assertTrue(repository.deleteById(5));
    }
}