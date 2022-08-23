package npc.data;

import npc.models.GamePlatform;

import java.util.List;

public interface GamePlatformRepository {
    List<GamePlatform> findAll();

    GamePlatform findById(int gamePlatformId);

    GamePlatform add(GamePlatform gamePlatform);
}