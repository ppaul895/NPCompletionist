package npc.models;

import java.sql.Timestamp;
import java.util.Objects;

public class Backlog {
    private int backlogId;
    private int userId;
    private int gameId;
    private boolean isCompleted;
    private Timestamp datetimeAdded;

    public int getBacklogId() {
        return backlogId;
    }

    public void setBacklogId(int backlogId) {
        this.backlogId = backlogId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public Timestamp getDatetimeAdded() {
        return datetimeAdded;
    }

    public void setDatetimeAdded(Timestamp datetimeAdded) {
        this.datetimeAdded = datetimeAdded;
    }

    @Override
    public int hashCode() {
        return Objects.hash(backlogId, gameId, userId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Backlog that = (Backlog) o;
        return backlogId == that.backlogId &&
                gameId == that.gameId &&
                userId == that.userId;
    }
}
