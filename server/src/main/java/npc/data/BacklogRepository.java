package npc.data;

import npc.models.Backlog;
import npc.models.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BacklogRepository {
    List<Backlog> findAll();

    @Transactional
    User findById(int backlog_Id);

    User add(Backlog backlog);

    boolean update(Backlog backlog);

    @Transactional
    boolean deleteById(int backlog_Id);
}
