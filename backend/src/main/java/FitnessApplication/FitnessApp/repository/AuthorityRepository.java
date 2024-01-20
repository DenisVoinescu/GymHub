package FitnessApplication.FitnessApp.repository;


import FitnessApplication.FitnessApp.entity.Authority;
import FitnessApplication.FitnessApp.projections.AuthorityWithIdProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(excerptProjection = AuthorityWithIdProjection.class)
public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    // Find all authorities of a user by username
    List<Authority> findByUsername(@Param("username") String username);
    // Find all authorities by role name(example ROLE_ADMIN) finds all admins
    List<Authority> findByRole(String authority);

}
