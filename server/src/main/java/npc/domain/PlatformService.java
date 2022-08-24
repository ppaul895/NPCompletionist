package npc.domain;

import npc.data.PlatformRepository;
import npc.models.Platform;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlatformService {
    private final PlatformRepository repository;

    public PlatformService(PlatformRepository repository) {
        this.repository = repository;
    }

    public List<Platform> findAll() {
        return repository.findAll();
    }

    public Platform findById(int platformId) {
        return repository.findById(platformId);
    }
}