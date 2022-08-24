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
