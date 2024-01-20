package FitnessApplication.FitnessApp.repository;

import FitnessApplication.FitnessApp.entity.User;
import FitnessApplication.FitnessApp.projections.UserWithIdProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(excerptProjection = UserWithIdProjection.class)
public interface UserRepository extends JpaRepository<User, Integer> {
    // Find user by username
    User findByUsername(String username);
}
