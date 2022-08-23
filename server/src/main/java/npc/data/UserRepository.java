package npc.data;

import npc.models.User;

import java.util.List;

public interface UserRepository {
    List<User> findAll();

    User findById(int user_Id);

    User add(User user);
}