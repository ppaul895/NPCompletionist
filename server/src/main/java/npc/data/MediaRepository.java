package npc.data;

import npc.models.Media;

import java.util.List;

public interface MediaRepository {
    List<Media> findAll();
    Media findById(int mediaId);
    Media add(Media media);

}
