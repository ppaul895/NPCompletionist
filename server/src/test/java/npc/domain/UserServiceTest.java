package npc.domain;

import npc.data.UserRepository;
import npc.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class UserServiceTest {
    @Autowired
    UserService service;

    @MockBean
    UserRepository repository;

    @Test
    void shouldFindAll() {
        List<User> expected = makeUserList();
        when(repository.findAll()).thenReturn(expected);
        List<User> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindById() {
        User expected = makeUserList().get(1);
        when(repository.findById(2)).thenReturn(expected);
        User actual = service.findById(2);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAdd() {
        // null
        Result<User> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getType());

        // null username
        User user = new User();
        user.setUserName(null);
        user.setUserPassword("$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa");
        result = service.add(user);
        assertEquals(ResultType.INVALID, result.getType());

        // null password
        user.setUserName("tester4");
        user.setUserPassword(null);
        result = service.add(user);
        assertEquals(ResultType.INVALID, result.getType());

        // duplicate username
        user.setUserName("tester2");
        user.setUserPassword("$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa");
        when(repository.findAll()).thenReturn(makeUserList());
        result = service.add(user);
        assertEquals(ResultType.INVALID, result.getType());

        // id already set
        user.setUserName("tester4");
        user.setUserId(4);
        result = service.add(user);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldAdd() {
        User expected = new User();
        expected.setUserId(4);
        expected.setUserName("tester4");
        expected.setUserPassword("$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa");

        User arg = new User();
        arg.setUserName("tester4");
        arg.setUserPassword("$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa");

        when(repository.add(arg)).thenReturn(expected);
        Result<User> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(expected, result.getPayload());
    }

    private List<User> makeUserList() {
        User u1 = new User();
        u1.setUserId(1);
        u1.setUserName("tester1");
        u1.setUserPassword("$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa");

        User u2 = new User();
        u2.setUserId(2);
        u2.setUserName("tester2");
        u2.setUserPassword("$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa");

        User u3 = new User();
        u3.setUserId(3);
        u3.setUserName("tester3");
        u3.setUserPassword("$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa");

        return Arrays.asList(u1, u2, u3);
    }
}