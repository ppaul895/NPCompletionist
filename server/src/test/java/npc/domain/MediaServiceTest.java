package npc.domain;

import npc.data.MediaRepository;
import npc.models.Media;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class MediaServiceTest {

    @Autowired
    MediaService service;

    @MockBean
    MediaRepository repository;

    @Test
    void shouldFindAll() {
        List<Media> expected = makeMediaList();
        when(repository.findAll()).thenReturn(expected);
        List<Media> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindById() {
        Media expected = makeMediaList().get(1);
        when(repository.findById(2)).thenReturn(expected);
        Media actual = service.findById(2);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAdd() {
        // if ID already exists
        Media media = makeMedia();
        media.setMediaId(1);
        Result<Media> actual = service.add(media);
        assertEquals(ResultType.INVALID, actual.getType());

        // duplicate
        Media duplicateMedia = new Media();
        duplicateMedia.setMediaId(6);
        duplicateMedia.setImage_url("https://img.opencritic.com/game/12090/o/5BXKr5S1.jpg");
        duplicateMedia.setTrailer_url("https://youtube.com/watch?v=UhD0_MM4fnU");
        Result<Media> result = service.add(duplicateMedia);
        assertEquals(ResultType.INVALID, result.getType());

    }

    @Test
    void shouldAdd() {
        Media expected = makeMedia();
        Media arg = new Media();
        arg.setImage_url("https://img.opencritic.com/game/13509/o/KW0nVeXe.jpg");
        arg.setTrailer_url("https://www.youtube.com/watch?v=xsPtUNB1z-Q");

        when(repository.add(arg)).thenReturn(expected);
        Result<Media> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(expected, result.getPayload());

        // null image
        Media arg2 = new Media();
        arg2.setImage_url("");
        arg2.setTrailer_url("https://www.youtube.com/watch?v=xsPtUNB1z-Q");

        when(repository.add(arg2)).thenReturn(expected);
        Result<Media> result2 = service.add(arg2);
        assertEquals(ResultType.SUCCESS, result2.getType());
        assertEquals(expected, result2.getPayload());

        // null trailer
        Media arg3 = new Media();
        arg3.setImage_url("https://img.opencritic.com/game/13509/o/KW0nVeXe.jpg");
        arg3.setTrailer_url("");

        when(repository.add(arg3)).thenReturn(expected);
        Result<Media> result3 = service.add(arg3);
        assertEquals(ResultType.SUCCESS, result3.getType());
        assertEquals(expected, result3.getPayload());

        // null image & null trailer
        Media arg4 = new Media();
        arg4.setImage_url("");
        arg4.setTrailer_url("");

        when(repository.add(arg4)).thenReturn(expected);
        Result<Media> result4 = service.add(arg4);
        assertEquals(ResultType.SUCCESS, result4.getType());
        assertEquals(expected, result4.getPayload());
    }

    Media makeMedia() {
        Media media = new Media();
        media.setImage_url("https://img.opencritic.com/game/13509/o/KW0nVeXe.jpg");
        media.setTrailer_url("https://www.youtube.com/watch?v=xsPtUNB1z-Q");
        return media;
    }

    private List<Media> makeMediaList() {
        Media m1 = new Media(1, "https://img.opencritic.com/game/12090/o/5BXKr5S1.jpg", "https://youtube.com/watch?v=UhD0_MM4fnU");
        Media m2 = new Media(2, "https://img.opencritic.com/game/13386/o/S3tnyfm8.jpg", "https://www.youtube.com/watch?v=fOm_9N9ksBY");
        Media m3 = new Media(3, "https://img.opencritic.com/game/12088/o/AcyojAVM.jpg", "https://youtube.com/watch?v=PyMlV5_HRWk");
        return Arrays.asList(m1, m2, m3);
    }

}
