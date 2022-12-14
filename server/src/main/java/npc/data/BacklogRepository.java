package npc.data;

import npc.models.Backlog;

import java.util.List;

public interface BacklogRepository {
    List<Backlog> findByUserId(int appUserId);

    Backlog findById(int backlogId);

    Backlog add(Backlog backlog);

    boolean update(Backlog backlog);

    boolean deleteById(int backlogId);
}
