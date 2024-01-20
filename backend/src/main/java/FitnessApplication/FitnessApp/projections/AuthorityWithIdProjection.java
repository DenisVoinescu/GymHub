package FitnessApplication.FitnessApp.projections;

 import FitnessApplication.FitnessApp.entity.Authority;
 import org.springframework.data.rest.core.config.Projection;

@Projection(name = "withId", types = Authority.class)
// Projection that exposes the id, username of the user and role of an authority as JSON

public interface AuthorityWithIdProjection {
    int getId();
    String getUsername();
    String getRole();
}
