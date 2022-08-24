package npc.domain;

import npc.data.BacklogRepository;
import npc.models.Backlog;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class BacklogServiceTest {
    @Autowired
    BacklogService service;

    @MockBean
    BacklogRepository repository;

    @Test
    void shouldFindAll() {
        List<Backlog> expected = makeBacklogList();
        when(repository.findAll()).thenReturn(expected);
        List<Backlog> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindById() {
        Backlog expected = makeBacklogList().get(1);
        when(repository.findById(2)).thenReturn(expected);
        Backlog actual = service.findById(2);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAdd() {
        // null
        Result<Backlog> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getType());

        // no userId
        Backlog backlog = new Backlog();
        backlog.setGameId(1);
        backlog.setCompleted(false);
        backlog.setDatetimeAdded(Timestamp.valueOf("2022-08-22 11:36:07"));
        result = service.add(backlog);
        assertEquals(ResultType.INVALID, result.getType());

        // no gameId
        backlog.setUserId(1);
        backlog.setGameId(0);
        result = service.add(backlog);
        assertEquals(ResultType.INVALID, result.getType());

        // no dateAdded
        backlog.setGameId(1);
        backlog.setDatetimeAdded(null);
        result = service.add(backlog);
        assertEquals(ResultType.INVALID, result.getType());

        // duplicate
        backlog.setDatetimeAdded(Timestamp.valueOf("2022-08-22 11:36:07"));
        when(repository.findAll()).thenReturn(makeBacklogList());
        result = service.add(backlog);
        assertEquals(ResultType.INVALID, result.getType());

        // id already set
        backlog.setGameId(2);
        backlog.setBacklogId(6);
        result = service.add(backlog);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldAdd() {
        Backlog expected = new Backlog();
        expected.setBacklogId(6);
        expected.setUserId(2);
        expected.setGameId(2);
        expected.setCompleted(false);
        expected.setDatetimeAdded(Timestamp.valueOf("2022-08-24 13:12:35"));

        Backlog arg = new Backlog();
        arg.setUserId(2);
        arg.setGameId(2);
        arg.setCompleted(false);
        arg.setDatetimeAdded(Timestamp.valueOf("2022-08-24 13:12:35"));

        when(repository.add(arg)).thenReturn(expected);
        Result<Backlog> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(expected, result.getPayload());
    }

    @Test
    void shouldNotUpdate() {
        // null
        Result<Backlog> result = service.update(null);
        assertEquals(ResultType.INVALID, result.getType());

        // no userId
        Backlog backlog = new Backlog();
        backlog.setGameId(1);
        backlog.setCompleted(true);
        backlog.setDatetimeAdded(Timestamp.valueOf("2022-08-22 11:36:07"));
        result = service.update(backlog);
        assertEquals(ResultType.INVALID, result.getType());

        // no gameId
        backlog.setUserId(1);
        backlog.setGameId(0);
        result = service.update(backlog);
        assertEquals(ResultType.INVALID, result.getType());

        // no dateAdded
        backlog.setGameId(1);
        backlog.setDatetimeAdded(null);
        result = service.update(backlog);
        assertEquals(ResultType.INVALID, result.getType());

        // duplicate
        backlog.setBacklogId(3);
        backlog.setUserId(1);
        backlog.setGameId(4);
        backlog.setDatetimeAdded(Timestamp.valueOf("2022-08-22 11:36:07"));
        when(repository.findAll()).thenReturn(makeBacklogList());
        result = service.update(backlog);
        assertEquals(ResultType.INVALID, result.getType());

        // id not set
        backlog.setBacklogId(0);
        backlog.setUserId(1);
        backlog.setGameId(3);
        backlog.setDatetimeAdded(Timestamp.valueOf("2022-08-22 11:51:12"));
        result = service.update(backlog);
        assertEquals(ResultType.INVALID, result.getType());

        // id not found
        backlog.setBacklogId(15);
        backlog.setGameId(2);
        when(repository.update(backlog)).thenReturn(false);
        result = service.update(backlog);
        assertEquals(ResultType.NOT_FOUND, result.getType());
    }

    @Test
    void shouldUpdate() {
        Backlog backlog = new Backlog();
        backlog.setBacklogId(3);
        backlog.setUserId(1);
        backlog.setGameId(3);
        backlog.setCompleted(true);
        backlog.setDatetimeAdded(Timestamp.valueOf("2022-08-22 11:51:12"));

        when(repository.findAll()).thenReturn(makeBacklogList());
        when(repository.update(backlog)).thenReturn(true);
        Result<Backlog> result = service.update(backlog);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotDelete() {
        when(repository.deleteById(15)).thenReturn(false);
        Result<Backlog> result = service.deleteById(15);
        assertEquals(ResultType.NOT_FOUND, result.getType());
    }

    @Test
    void shouldDelete() {
        when(repository.deleteById(4)).thenReturn(true);
        Result<Backlog> result =  service.deleteById(4);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    private List<Backlog> makeBacklogList() {
        Backlog b1 = new Backlog();
        b1.setBacklogId(1);
        b1.setUserId(1);
        b1.setGameId(1);
        b1.setCompleted(false);
        b1.setDatetimeAdded(Timestamp.valueOf("2022-08-22 11:36:07"));

        Backlog b2 = new Backlog();
        b2.setBacklogId(3);
        b2.setUserId(1);
        b2.setGameId(3);
        b2.setCompleted(false);
        b2.setDatetimeAdded(Timestamp.valueOf("2022-08-22 11:51:12"));

        Backlog b3 = new Backlog();
        b3.setBacklogId(4);
        b3.setUserId(1);
        b3.setGameId(4);
        b3.setCompleted(false);
        b3.setDatetimeAdded(Timestamp.valueOf("2022-08-22 11:58:45"));

        Backlog b4 = new Backlog();
        b4.setBacklogId(5);
        b4.setUserId(2);
        b4.setGameId(1);
        b4.setCompleted(false);
        b4.setDatetimeAdded(Timestamp.valueOf("2022-08-24 11:56:29"));

        return Arrays.asList(b1, b2, b3, b4);
    }
}
