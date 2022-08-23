package npc.data;

import npc.models.Backlog;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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
    void shouldFindAgencies() {
        List<Backlog> agencies = repository.findAll();
        assertNotNull(agencies);
        assertTrue(agencies.size() > 0);
    }

    @Test
    void shouldFindBacklog() {
        Backlog backlog = repository.findById(1);
        assertEquals("1", backlog.getBacklogId());
    }

    @Test
    void shouldAddAgency() {
        Backlog backlog = new Backlog();
        backlog.setUserId(1);
        backlog.setGameId(1);
        Backlog actual = repository.add(backlog);
        assertNotNull(actual);
        assertEquals(4, actual.getBacklogId());
    }

    @Test
    void shouldUpdateAgency() {

        Backlog backlog = new Backlog();
        backlog.setBacklogId(3);
        backlog.setUserId(3);
        backlog.setGameId(3);
        backlog.setCompleted(true);
//        backlog.getDatetimeAdded();

        assertTrue(repository.update(backlog));
    }

    @Test
    void shouldDeleteAgency() {
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(2));
    }
}
