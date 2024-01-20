package FitnessApplication.FitnessApp.repository;


import FitnessApplication.FitnessApp.entity.Item;
import FitnessApplication.FitnessApp.projections.ItemWithIdProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = ItemWithIdProjection.class)
public interface ItemRepository extends JpaRepository<Item, Integer> {

}
