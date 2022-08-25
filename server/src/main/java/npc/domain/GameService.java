package npc.domain;

import npc.data.GameRepository;
import npc.models.Game;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {
    private final GameRepository repository;

    public GameService(GameRepository repository) {
        this.repository = repository;
    }

    public List<Game> findAll() {
        return repository.findAll();
    }

    public Game findById(int gameId) {
        return repository.findById(gameId);
    }

    public Result<Game> add(Game game) {
        Result<Game> result = validate(game);
        if (!result.isSuccess()) {
            return result;
        }
        if (game.getGameId() != 0) {
            result.addMessage("Game ID cannot be set for `add` operation.", ResultType.INVALID);
            return result;
        }
        game = repository.add(game);
        result.setPayload(game);
        return result;
    }

    private Result<Game> validate(Game game) {
        Result<Game> result = new Result<>();
        if (game == null) {
            result.addMessage("Game cannot be null.", ResultType.INVALID);
            return result;
        }
        if (Validations.isNullOrBlank(game.getTitle())) {
            result.addMessage("Title is required.", ResultType.INVALID);
        }
        if (game.getReleaseDate() == null) {
            result.addMessage("Release date is required.", ResultType.INVALID);
        }
        if (Validations.isNullOrBlank(game.getDeveloper())) {
            result.addMessage("Developer is required.", ResultType.INVALID);
        }
        if (game.getMediaId() <= 0) {
            result.addMessage("Media ID is required.", ResultType.INVALID);
        }
        if (Validations.isNullOrBlank(game.getGenre())) {
            result.addMessage("Genre is required.", ResultType.INVALID);
        }
        for (Game g : repository.findAll()) {
            if (g.getTitle().equals(game.getTitle()) && g.getReleaseDate().isEqual(game.getReleaseDate())) {
                result.addMessage("Game is a duplicate.", ResultType.INVALID);
                break;
            }
        }
        return result;
    }
}