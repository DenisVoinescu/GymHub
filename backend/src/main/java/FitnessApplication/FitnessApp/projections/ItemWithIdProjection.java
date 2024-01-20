package FitnessApplication.FitnessApp.projections;


import FitnessApplication.FitnessApp.entity.Item;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "withId", types = Item.class)
// Projection that exposes the id, category, name, description, price and image url of an item as JSON
public interface ItemWithIdProjection {
    int getId();
    String getCategory();

    String getName();
    String getDescription();
    Double getPrice();
    String getImageUrl();
}
