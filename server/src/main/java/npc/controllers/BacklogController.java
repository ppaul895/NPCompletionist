package npc.controllers;

import npc.domain.BacklogService;
import npc.domain.Result;
import npc.models.Backlog;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:3000"})
@RequestMapping("/api/backlog")
public class BacklogController {

    private final BacklogService service;

    public BacklogController(BacklogService service) {
        this.service = service;
    }

    @GetMapping("/user-backlog/{userId}")
    public List<Backlog> findByUserId(@PathVariable int userId) {
        return service.findByUserId(userId);
    }

    @GetMapping("/{backlogId}")
    public ResponseEntity<Backlog> findById(@PathVariable int backlogId) {
        Backlog backlog = service.findById(backlogId);
        if (backlog == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(backlog, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Backlog backlog) {
        Result<Backlog> result = service.add(backlog);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{backlogId}")
    public ResponseEntity<Object> update(@PathVariable int backlogId, @RequestBody Backlog backlog) {
        if (backlogId != backlog.getBacklogId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Backlog> result = service.update(backlog);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{backlogId}")
    public ResponseEntity<Object> deleteById(@PathVariable int backlogId) {
        Result<Backlog> result = service.deleteById(backlogId);
        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);

    }
}
