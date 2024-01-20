package FitnessApplication.FitnessApp.projections;


import FitnessApplication.FitnessApp.entity.User;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "withId", types = User.class)
// Projection that exposes the id, username and membership days of a user as JSON
public interface UserWithIdProjection {
    int getId();
    String getUsername();
    Integer getMembershipDays();

}

