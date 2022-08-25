package npc.models;

import java.util.Objects;

public class Media {
    private int mediaId;
    private String image_url;
    private String trailer_url;

    public Media() {
    }

    public Media(int mediaId, String image_url, String trailer_url) {
        this.mediaId = mediaId;
        this.image_url = image_url;
        this.trailer_url = trailer_url;
    }

    public int getMediaId() {
        return mediaId;
    }

    public void setMediaId(int mediaId) {
        this.mediaId = mediaId;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public String getTrailer_url() {
        return trailer_url;
    }

    public void setTrailer_url(String trailer_url) {
        this.trailer_url = trailer_url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Media that = (Media) o;
        return mediaId == that.mediaId && Objects.equals(image_url, that.image_url) && Objects.equals(trailer_url, that.trailer_url);
    }

    @Override
    public int hashCode() {
        return Objects.hash(mediaId, image_url, trailer_url);
    }
}