package npc.data;

import npc.models.Backlog;
import npc.models.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BacklogRepository {
    List<Backlog> findAll();

    @Transactional
    Backlog findById(int backlogId);

    Backlog add(Backlog backlog);

    boolean update(Backlog backlog);

    @Transactional
    boolean deleteById(int backlogId);
}
