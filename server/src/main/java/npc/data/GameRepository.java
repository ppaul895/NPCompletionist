package npc.data;

import npc.models.Game;

import java.util.List;

public interface GameRepository {
    List<Game> findAll();

    Game findById(int gameId);

    Game add(Game game);

    boolean deleteById(int gameId);
}