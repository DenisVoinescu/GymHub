package FitnessApplication.FitnessApp.service;


import FitnessApplication.FitnessApp.entity.Stock;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface StockService {
    List<Stock> findAll();
    Stock findById(int theId);
    List<Stock> findByItemId(int theId);
    public List<Integer> getSizeIdsByItemId(@PathVariable int itemId);
    Integer decrementQuantity(int itemId, int sizeId);

    void save(Stock theStock);
    void deleteById(int theId);
    void update(Stock theStock);
}
