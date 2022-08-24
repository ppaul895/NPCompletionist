package npc.domain;

import npc.data.UserRepository;
import npc.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public User findById(int agentId) {
        return repository.findById(agentId);
    }

    public Result<User> add(User user) {
        Result<User> result = validate(user);
        if (!result.isSuccess()) {
            return result;
        }

        if (user.getUserId() != 0) {
            result.addMessage("User ID cannot be set for `add` operation.", ResultType.INVALID);
            return result;
        }

        user = repository.add(user);
        result.setPayload(user);
        return result;
    }

    private Result<User> validate(User user) {
        Result<User> result = new Result<>();
        if (user == null) {
            result.addMessage("User cannot be null.", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(user.getUserName())) {
            result.addMessage("Username is required.", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(user.getUserPassword())) {
            result.addMessage("Password is required.", ResultType.INVALID);
        }

        for (User u : repository.findAll()) {
            if (u.getUserName().equals(user.getUserName())) {
                result.addMessage("Username is already in use.", ResultType.INVALID);
                break;
            }
        }
        return result;
    }
}