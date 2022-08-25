package npc.controllers;

import npc.domain.GamePlatformService;
import npc.domain.Result;
import npc.models.GamePlatform;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:3000"})
@RequestMapping("/api/gameplatform")
public class GamePlatformController {

    private final GamePlatformService service;

    public GamePlatformController(GamePlatformService service) {
        this.service = service;
    }

    @GetMapping
    public List<GamePlatform> findAll() {
        return service.findAll();
    }

    @GetMapping("/{gamePlatformId}")
    public ResponseEntity<GamePlatform> findById(@PathVariable int gamePlatformId) {
        GamePlatform gamePlatform = service.findById(gamePlatformId);
        if (gamePlatform == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(gamePlatform, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Object> add(@RequestBody GamePlatform gamePlatform) {
        Result<GamePlatform> result = service.add(gamePlatform);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
