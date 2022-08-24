package npc.domain;

import npc.data.UserRepository;
import npc.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class UserServiceTest {
    @Autowired
    UserService service;

    @MockBean
    UserRepository repository;

    @Test
    void shouldFind1() {
        User expected = makeUserId();
        when(repository.findById(1)).thenReturn(expected);
        User actual = service.findById(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddWhenInvalid() {
        User user = makeUserId();
        Result<User> result = service.add(user);
        assertEquals(ResultType.INVALID, result.getType());

        user.setUserId(0);
        user.setUserName(null);
        result = service.add(user);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddWhenValid() {
        User expected = makeUserId();
        User arg = makeUserId();
        arg.setUserId(0);

        when(repository.add(arg)).thenReturn(expected);
        Result<User> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());

        assertEquals(expected, result.getPayload());
    }

    User makeUserId() {
        User user = new User();
        user.setUserId(1);
        user.setUserName("Username1");
        user.setUserPassword("Password");
        return user;
    }
}