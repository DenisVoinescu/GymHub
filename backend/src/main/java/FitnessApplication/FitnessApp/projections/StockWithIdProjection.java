package FitnessApplication.FitnessApp.projections;

 import FitnessApplication.FitnessApp.entity.Stock;
 import org.springframework.data.rest.core.config.Projection;

@Projection(name = "withId", types = Stock.class)
// Projection that exposes the id, item id, size id and quantity of a stock as JSON
public interface StockWithIdProjection {
    int getId();
    int getItemId();
    int getSizeId();
    int getQuantity();
}
