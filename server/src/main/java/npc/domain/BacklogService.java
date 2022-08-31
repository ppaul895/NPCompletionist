package npc.domain;

import npc.data.BacklogRepository;
import npc.models.Backlog;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BacklogService {
    private final BacklogRepository repository;

    public BacklogService(BacklogRepository repository) {
        this.repository = repository;
    }

    public List<Backlog> findByUserId(int appUserId) {
        return repository.findByUserId(appUserId);
    }

    public Backlog findById(int backlogId) {
        return repository.findById(backlogId);
    }

    public Result<Backlog> add(Backlog backlog) {
        Result<Backlog> result = validate(backlog, false);
        if (!result.isSuccess()) {
            return result;
        }

        if (backlog.getBacklogId() != 0) {
            result.addMessage("Backlog ID cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        backlog = repository.add(backlog);
        result.setPayload(backlog);
        return result;
    }

    public Result<Backlog> update(Backlog backlog) {
        Result<Backlog> result = validate(backlog, true);
        if (!result.isSuccess()) {
            return result;
        }

        if (backlog.getBacklogId() <= 0) {
            result.addMessage("Backlog ID must be set for `update` operation.", ResultType.INVALID);
            return result;
        }

        if (!repository.update(backlog)) {
            String msg = String.format("Backlog ID: %s not found.", backlog.getBacklogId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public Result<Backlog> deleteById(int backlogId) {
        Result<Backlog> result = new Result<>();
        if (repository.deleteById(backlogId)) {
            return result;
        } else {
            result.addMessage("User ID: " + backlogId
                    + " not found.", ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<Backlog> validate(Backlog backlog, boolean forUpdate) {
        Result<Backlog> result = new Result<>();
        if (backlog == null) {
            result.addMessage("Backlog cannot be null.", ResultType.INVALID);
            return result;
        }

        if (backlog.getUserId() <= 0) {
            result.addMessage("User ID is required.", ResultType.INVALID);
        }

        if (backlog.getGameId() <= 0) {
            result.addMessage("Game ID is required.", ResultType.INVALID);
        }

        if (backlog.getDatetimeAdded() == null) {
            result.addMessage("Date Added is required.", ResultType.INVALID);
        }

        for (Backlog b : repository.findByUserId(backlog.getUserId())) {
            if (b.getGameId() == backlog.getGameId()) {
                if (forUpdate && (b.getBacklogId() == backlog.getBacklogId()))
                    continue;
                result.addMessage("Backlog game is a duplicate.", ResultType.INVALID);
                break;
            }
        }
        return result;
    }
}