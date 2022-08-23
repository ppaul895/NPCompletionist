package npc.data;

import npc.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class UserJdbcTemplateRepositoryTest {

    @Autowired
    UserJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindUsers() {
        List<User> users = repository.findAll();
        assertNotNull(users);
        assertTrue(users.size() > 0);
    }

    @Test
    void shouldFindTester() {
        User tester1 = repository.findById(1);
        assertEquals("tester1", tester1.getUserName());
    }

    @Test
    void shouldAddUser() {
        User user = new User();
        user.setUserName("tester4");
        user.setUserPassword("$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa");
        User actual = repository.add(user);
        assertNotNull(actual);
        assertEquals(4, actual.getUserId());
    }
}