package npc.data;

import npc.models.Backlog;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class BacklogJdbcTemplateRepositoryTest {

    @Autowired
    BacklogJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindBacklog() {
        List<Backlog> backlogs = repository.findByUserId(1);
        assertNotNull(backlogs);
        assertTrue(backlogs.size() >= 3 && backlogs.size() <= 4);
    }

    @Test
    void shouldFindBacklogID() {
        Backlog backlog = repository.findById(1);
        assertEquals(1, backlog.getBacklogId());
    }

    @Test
    void shouldAddBacklog() {
        Backlog backlog = new Backlog();
        backlog.setUserId(2);
        backlog.setGameId(1);
        backlog.setCompleted(false);
        backlog.setDatetimeAdded(Timestamp.valueOf(LocalDateTime.now()));
        Backlog actual = repository.add(backlog);
        assertNotNull(actual);
        assertEquals(5, actual.getBacklogId());
    }

    @Test
    void shouldUpdateBacklog() {
        Backlog backlog = new Backlog();
        backlog.setBacklogId(3);
        backlog.setUserId(1);
        backlog.setGameId(3);
        backlog.setCompleted(true);
        backlog.setDatetimeAdded(Timestamp.valueOf("2022-08-22 11:51:12"));
        assertTrue(repository.update(backlog));
    }

    @Test
    void shouldDeleteBacklog() {
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(1000000));
    }
}
