package npc.domain;

import npc.data.GameRepository;
import npc.models.Game;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GameServiceTest {

    @Autowired
    GameService service;

    @MockBean
    GameRepository repository;

    @Test
    void shouldFindAll() {
        List<Game> expected = makeGameList();
        when(repository.findAll()).thenReturn(expected);
        List<Game> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindById() {
        Game expected =  makeGameList().get(1);
        when(repository.findById(2)).thenReturn(expected);
        Game actual = service.findById(2);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAdd() {
        // null
        Result<Game> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getType());

        // no title, release date, developer, media id, genre
        Game game = new Game();
        result = service.add(game);
        assertEquals(ResultType.INVALID, result.getType());

        // duplicate
        game.setTitle("Stray");
        game.setReleaseDate(LocalDate.of(2022, 7, 19));
        game.setDeveloper("Test Developer");
        game.setScore(60);
        game.setMediaId(2);
        game.setGenre("Strategy");
        when(repository.findAll()).thenReturn(makeGameList());
        result = service.add(game);
        assertEquals(ResultType.INVALID, result.getType());

        // id already set
        game.setTitle("Test Name");
        game.setGameId(5);
        result = service.add(game);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldAdd() {
        Game expected = new Game();
        expected.setGameId(5);
        expected.setTitle("TestTitle");
        expected.setReleaseDate(LocalDate.now());
        expected.setDeveloper("TestDeveloper");
        expected.setScore(90);
        expected.setMediaId(5);
        expected.setGenre("TestGenre");

        Game arg = new Game();
        arg.setTitle("TestTitle");
        arg.setReleaseDate(LocalDate.now());
        arg.setDeveloper("TestDeveloper");
        arg.setScore(90);
        arg.setMediaId(5);
        arg.setGenre("TestGenre");

        when(repository.add(arg)).thenReturn(expected);
        Result<Game> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(expected, result.getPayload());
    }

    private List<Game> makeGameList() {
        Game g1 = new Game();
        g1.setGameId(1);
        g1.setTitle("Elden Ring");
        g1.setReleaseDate(LocalDate.of(2022, 2, 25));
        g1.setDeveloper("FromSoftware Inc.");
        g1.setScore(95);
        g1.setMediaId(1);
        g1.setGenre("Action");

        Game g2 = new Game();
        g2.setGameId(2);
        g2.setTitle("Stray");
        g2.setReleaseDate(LocalDate.of(2022, 7, 19));
        g2.setDeveloper("BlueTwelve Studios");
        g2.setScore(84);
        g2.setMediaId(2);
        g2.setGenre("Adventure");

        Game g3 = new Game();
        g3.setGameId(3);
        g3.setTitle("Halo Infinite");
        g3.setReleaseDate(LocalDate.of(2021, 12, 8));
        g3.setDeveloper("343 Industries");
        g3.setScore(87);
        g3.setMediaId(3);
        g3.setGenre("Action");

        Game g4 = new Game();
        g4.setGameId(4);
        g4.setTitle("Cult of the Lamb");
        g4.setReleaseDate(LocalDate.of(2022, 8, 11));
        g4.setDeveloper("Massive Monster");
        g4.setScore(85);
        g4.setMediaId(4);
        g4.setGenre("Action");

        return Arrays.asList(g1, g2, g3, g4);
    }
}