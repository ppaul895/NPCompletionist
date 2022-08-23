package npc.models;

import java.util.Objects;

public class GamePlatform {
    private int gamePlatformId;
    private int gameId;
    private int platformId;

    public int getGamePlatformId() {
        return gamePlatformId;
    }

    public void setGamePlatformId(int gamePlatformId) {
        this.gamePlatformId = gamePlatformId;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public int getPlatformId() {
        return platformId;
    }

    public void setPlatformId(int platformId) {
        this.platformId = platformId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(gamePlatformId, platformId, gameId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GamePlatform that = (GamePlatform) o;
        return gamePlatformId == that.gamePlatformId &&
                platformId == that.platformId &&
                gameId == that.gameId;
    }
}