package npc.domain;

import npc.data.BacklogRepository;
import npc.models.Backlog;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BacklogService {
    private final BacklogRepository repository;

    public BacklogService(BacklogRepository repository) {
        this.repository = repository;
    }

    public List<Backlog> findAll() {
        return repository.findAll();
    }

    public Backlog findById(int backlogId) {
        return repository.findById(backlogId);
    }

    public Result<Backlog> add(Backlog backlog) {
        Result<Backlog> result = validate(backlog);
        if (!result.isSuccess()) {
            return result;
        }

        if (backlog.getBacklogId() != 0) {
            result.addMessage("User ID cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        backlog = repository.add(backlog);
        result.setPayload(backlog);
        return result;
    }

    public Result<Backlog> update(Backlog backlog) {
        Result<Backlog> result = validate(backlog);
        if (!result.isSuccess()) {
            return result;
        }

        if (backlog.getBacklogId() <= 0) {
            result.addMessage("User ID must be set for `update` operation.", ResultType.INVALID);
            return result;
        }

        if (!repository.update(backlog)) {
            String msg = String.format("User ID: %s, not found.", backlog.getBacklogId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int agentId) {
        return repository.deleteById(agentId);
    }

    private Result<Backlog> validate(Backlog backlog) {
        Result<Backlog> result = new Result<>();
        if (backlog == null) {
            result.addMessage("Backlog cannot be null.", ResultType.INVALID);
            return result;
        }

        if (backlog.getUserId() <= 0) {
            result.addMessage("Username is required.", ResultType.INVALID);
        }

        if (backlog.getGameId() <= 0) {
            result.addMessage("Game is required.", ResultType.INVALID);
        }

        if (backlog.getDatetimeAdded() == null) {
            result.addMessage("Date Added is required.", ResultType.INVALID);
        }

        return result;
    }

}
