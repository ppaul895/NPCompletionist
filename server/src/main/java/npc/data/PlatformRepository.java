package npc.data;

import npc.models.Platform;

import java.util.List;

public interface PlatformRepository {
    List<Platform> findAll();

    Platform findById(int platformId);
}