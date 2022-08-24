package npc.domain;

import npc.data.GamePlatformRepository;
import npc.models.GamePlatform;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class GamePlatformServiceTest {

    @Autowired
    GamePlatformService service;

    @MockBean
    GamePlatformRepository repository;

    @Test
    void shouldFindAll() {
        List<GamePlatform> expected = makeGamePlatformList();
        when(repository.findAll()).thenReturn(expected);
        List<GamePlatform> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindById() {
        GamePlatform expected = makeGamePlatformList().get(1);
        when(repository.findById(2)).thenReturn(expected);
        GamePlatform actual = service.findById(2);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAdd() {
        // null
        Result<GamePlatform> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getType());

        // gameId not set
        GamePlatform gamePlatform = new GamePlatform();
        gamePlatform.setPlatformId(2);
        result = service.add(gamePlatform);
        assertEquals(ResultType.INVALID, result.getType());

        // platformId not set
        gamePlatform.setGameId(2);
        gamePlatform.setPlatformId(0);
        result = service.add(gamePlatform);
        assertEquals(ResultType.INVALID, result.getType());

        // duplicate
        gamePlatform.setGameId(1);
        gamePlatform.setPlatformId(6);
        when(repository.findAll()).thenReturn(makeGamePlatformList());
        result = service.add(gamePlatform);
        assertEquals(ResultType.INVALID, result.getType());

        // id already set
        gamePlatform.setGamePlatformId(6);
        gamePlatform.setGameId(2);
        gamePlatform.setPlatformId(2);
        result = service.add(gamePlatform);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldAdd() {
        GamePlatform expected = new GamePlatform();
        expected.setGamePlatformId(6);
        expected.setGameId(2);
        expected.setPlatformId(2);

        GamePlatform arg = new GamePlatform();
        arg.setGameId(2);
        arg.setPlatformId(2);

        when(repository.add(arg)).thenReturn(expected);
        Result<GamePlatform> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(expected, result.getPayload());
    }

    private List<GamePlatform> makeGamePlatformList() {
        GamePlatform gp1 = new GamePlatform();
        gp1.setGamePlatformId(1);
        gp1.setGameId(1);
        gp1.setPlatformId(4);

        GamePlatform gp2 = new GamePlatform();
        gp2.setGamePlatformId(2);
        gp2.setGameId(1);
        gp2.setPlatformId(1);

        GamePlatform gp3 = new GamePlatform();
        gp3.setGamePlatformId(3);
        gp3.setGameId(1);
        gp3.setPlatformId(2);

        GamePlatform gp4 = new GamePlatform();
        gp4.setGamePlatformId(4);
        gp4.setGameId(1);
        gp4.setPlatformId(6);

        GamePlatform gp5 = new GamePlatform();
        gp5.setGamePlatformId(5);
        gp5.setGameId(1);
        gp5.setPlatformId(7);

        return Arrays.asList(gp1, gp2, gp3, gp4, gp5);
    }
}