package npc.models;

import java.util.Objects;

public class Platform {
    private int platformId;
    private String name;

    public int getPlatformId() {
        return platformId;
    }

    public void setPlatformId(int platformId) {
        this.platformId = platformId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int hashCode() {
        return Objects.hash(platformId, name);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Platform that = (Platform) o;
        return platformId == that.platformId &&
                Objects.equals(name, that.name);
    }
}