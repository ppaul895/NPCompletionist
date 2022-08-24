package npc.domain;

import npc.data.GamePlatformRepository;
import npc.models.GamePlatform;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GamePlatformService {
    private final GamePlatformRepository repository;

    public GamePlatformService(GamePlatformRepository repository) {
        this.repository = repository;
    }

    public List<GamePlatform> findAll() {
        return repository.findAll();
    }

    public GamePlatform findById(int gamePlatformId) {
        return repository.findById(gamePlatformId);
    }

    public Result<GamePlatform> add(GamePlatform gamePlatform) {
        Result<GamePlatform> result = validate(gamePlatform);
        if (!result.isSuccess()) {
            return result;
        }
        if (gamePlatform.getGamePlatformId() != 0) {
            result.addMessage("GamePlatform ID cannot be set for `add` operation.", ResultType.INVALID);
            return result;
        }
        gamePlatform = repository.add(gamePlatform);
        result.setPayload(gamePlatform);
        return result;
    }

    private Result<GamePlatform> validate(GamePlatform gamePlatform) {
        Result<GamePlatform> result = new Result<>();
        if (gamePlatform == null) {
            result.addMessage("Game Platform cannot be null.", ResultType.INVALID);
            return result;
        }
        if (gamePlatform.getGameId() <= 0) {
            result.addMessage("Game ID is required.", ResultType.INVALID);
        }
        if (gamePlatform.getPlatformId() <= 0) {
            result.addMessage("Platform ID is required.", ResultType.INVALID);
        }
        for (GamePlatform gp : repository.findAll()) {
            if (gp.getGameId() == gamePlatform.getGameId() && gp.getPlatformId() == gamePlatform.getPlatformId()) {
                result.addMessage("Game Platform is a duplicate.", ResultType.INVALID);
                break;
            }
        }
        return result;
    }
}