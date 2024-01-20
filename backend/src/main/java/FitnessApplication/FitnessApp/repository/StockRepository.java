package FitnessApplication.FitnessApp.repository;


import FitnessApplication.FitnessApp.entity.Stock;
import FitnessApplication.FitnessApp.projections.StockWithIdProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(excerptProjection = StockWithIdProjection.class)
public interface StockRepository extends JpaRepository<Stock, Integer> {
    // Find all sizes of an item by item id
    List<Stock> findByItemId(@Param("itemId") int theId);
    @Query("SELECT s.sizeId FROM Stock s WHERE s.itemId = :itemId")
    // Finds all sizes  ID's of an item by item id
    List<Integer> findSizeIdsByItemId(@Param("itemId") int itemId);
    // Finds stock quantity by  item id and size id
    Stock findByItemIdAndSizeId(@Param("itemId") int itemId, @Param("sizeId") int sizeId);

}

