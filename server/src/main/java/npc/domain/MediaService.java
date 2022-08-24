package npc.domain;

import npc.data.MediaRepository;
import npc.models.Media;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MediaService {

    private final MediaRepository repository;

    public MediaService(MediaRepository repository) {
        this.repository = repository;
    }

    public List findAll() {
        return repository.findAll();
    }

    public Media findById(int mediaId) {
        return repository.findById(mediaId);
    }

    public Result<Media> add(Media media) {
        Result<Media> result = new Result<>();
        if (!result.isSuccess()) {
            return result;
        }

        if (media.getMediaId() > 0) {
            result.addMessage("Media ID already exists.", ResultType.INVALID);
            return result;
        }

        media = repository.add(media);
        result.setPayload(media);
        return result;
    }

}
