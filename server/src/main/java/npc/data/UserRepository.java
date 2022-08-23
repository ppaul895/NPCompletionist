package npc.data;

import npc.models.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepository {
    List<User> findAll();

    @Transactional
    User findById(int user_Id);

    User add(User user);

    boolean update(User user);

    @Transactional
    boolean deleteById(int user_Id);
}