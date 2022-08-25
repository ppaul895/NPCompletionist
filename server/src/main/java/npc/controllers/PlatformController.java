package npc.controllers;

import npc.domain.PlatformService;
import npc.models.Platform;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/platform")
public class PlatformController {

    private final PlatformService service;

    public PlatformController(PlatformService service) {
        this.service = service;
    }

    @GetMapping
    public List<Platform> findAll() {
        return service.findAll();
    }

    @GetMapping("/{platformId}")
    public Platform findById(@PathVariable int platformId) {
        return service.findById(platformId);
    }

}