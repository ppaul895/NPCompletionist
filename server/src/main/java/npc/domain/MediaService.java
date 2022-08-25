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

    public List<Media> findAll() {
        return repository.findAll();
    }

    public Media findById(int mediaId) {
        return repository.findById(mediaId);
    }

    public Result<Media> add(Media media) {
        Result<Media> result = validate(media);
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

    private Result<Media> validate(Media media) {
        Result<Media> result = new Result<>();
        List<Media> all = repository.findAll();
        for (Media m : all) {
            if ((m.getImage_url() != null && media.getImage_url() != null) &&
                    (m.getTrailer_url() != null && media.getTrailer_url() != null)) {
                if (m.getImage_url().equals(media.getImage_url()) &&
                        m.getTrailer_url().equals(media.getTrailer_url())) {
                    result.addMessage("Cannot duplicate image & trailer.", ResultType.INVALID);
                    break;
                }
            }
        }
        return result;
    }
}