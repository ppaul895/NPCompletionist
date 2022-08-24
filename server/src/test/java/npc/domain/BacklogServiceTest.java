package npc.domain;

import npc.data.BacklogRepository;
import npc.models.Backlog;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class BacklogServiceTest {
    @Autowired
    BacklogService service;

    @MockBean
    BacklogRepository repository;

    @Test
    void shouldFind1() {
        Backlog expected = makeBacklogId();
        when(repository.findById(1)).thenReturn(expected);
        Backlog actual = service.findById(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddWhenInvalid() {
        Backlog backlog = makeBacklogId();
        Result<Backlog> result = service.add(backlog);
        assertEquals(ResultType.INVALID, result.getType());

        backlog.setBacklogId(0);
        backlog.setUserId(-5000);
        result = service.add(backlog);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddWhenValid() {
        Backlog expected = makeBacklogId();
        Backlog arg = makeBacklogId();
        arg.setBacklogId(0);

        when(repository.add(arg)).thenReturn(expected);
        Result<Backlog> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());

        assertEquals(expected, result.getPayload());
    }

    Backlog makeBacklogId() {
        Backlog backlog = new Backlog();
        backlog.setBacklogId(1);
        backlog.setUserId(1);
        backlog.setGameId(1);
        backlog.isCompleted();
        backlog.setDatetimeAdded(Timestamp.valueOf("2022-08-22 11:51:12"));
        return backlog;
    }
}
