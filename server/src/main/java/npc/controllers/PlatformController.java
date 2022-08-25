package npc.controllers;

import npc.domain.PlatformService;
import npc.models.Platform;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Platform> findById(@PathVariable int platformId) {
        Platform platform = service.findById(platformId);
        if (platform == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(platform, HttpStatus.OK);
    }
}