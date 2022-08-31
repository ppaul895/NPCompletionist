package npc.domain;

import npc.data.PlatformRepository;
import npc.models.Platform;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class PlatformServiceTest {

    @Autowired
    PlatformService service;

    @MockBean
    PlatformRepository repository;

    @Test
    void shouldFindAll() {
        List<Platform> expected = makePlatformList();
        when(repository.findAll()).thenReturn(expected);
        List<Platform> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindById() {
        Platform expected = makePlatformList().get(1);
        when(repository.findById(2)).thenReturn(expected);
        Platform actual = service.findById(2);
        assertEquals(expected, actual);
    }

    private List<Platform> makePlatformList() {
        Platform p1 = new Platform();
        p1.setPlatformId(1);
        p1.setName("PC");

        Platform p2 = new Platform();
        p2.setPlatformId(2);
        p2.setName("PlayStation");

        Platform p3 = new Platform();
        p3.setPlatformId(3);
        p3.setName("Xbox");

        return Arrays.asList(p1, p2, p3);
    }
}