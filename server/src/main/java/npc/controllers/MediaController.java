package npc.controllers;

import npc.domain.MediaService;
import npc.domain.Result;
import npc.models.Media;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/media")
public class MediaController {

    private final MediaService service;

    public MediaController(MediaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Media> findAll() {
        return service.findAll();
    }

    @GetMapping("/{mediaId}")
    public Media findById(@PathVariable int mediaId) {
        return service.findById(mediaId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Media media) {
        Result<Media> result = service.add(media);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

}
