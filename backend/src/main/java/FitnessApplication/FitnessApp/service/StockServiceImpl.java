package FitnessApplication.FitnessApp.service;


import FitnessApplication.FitnessApp.entity.Stock;
import FitnessApplication.FitnessApp.repository.StockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class StockServiceImpl implements StockService {
     private final StockRepository stockRepository;
    @Autowired
    public StockServiceImpl(StockRepository stockRepository){
        this.stockRepository = stockRepository;
    }
    public List<Stock> findAll(){
        return stockRepository.findAll();
    }

    @Override
    public Stock findById(int theId) {
        return stockRepository.findById(theId).orElse(null);
    }

    @Override
    public List<Stock> findByItemId(int theId) {
        return stockRepository.findByItemId(theId);
    }

    @Override
    public List<Integer> getSizeIdsByItemId(@PathVariable int itemId) {
        return stockRepository.findSizeIdsByItemId(itemId);
    }




    @Override
    public Integer decrementQuantity(int itemId, int sizeId) {
        System.out.println("Decrementing quantity for itemId: " + itemId + ", sizeId: " + sizeId);
        Stock stock = stockRepository.findByItemIdAndSizeId(itemId, sizeId);

        if (stock != null && stock.getQuantity() > 0) {
            System.out.println("Found Stock: " + stock);
            stock.setQuantity(stock.getQuantity() - 1);
            stockRepository.save(stock);
            System.out.println("Updated quantity: " + stock.getQuantity());
            return stock.getQuantity();
        }

        System.out.println("Stock not found or quantity already 0");
        return null; // or throw an exception based on your requirement
    }


    @Override
    public void save(Stock theStock) {
        if(stockRepository.existsById(theStock.getId())){
            throw new IllegalArgumentException("Stock already exists");
        }
        stockRepository.save(theStock);
    }

    @Override
    public void deleteById(int theId) {
        if(!stockRepository.existsById(theId)){
            throw new IllegalArgumentException("Stock does not exist");
        }
        stockRepository.deleteById(theId);
    }

    @Override
    public void update(Stock theStock) {
        if(!stockRepository.existsById(theStock.getId())){
            throw new IllegalArgumentException("Stock does not exist");
        }
      Optional<Stock> optinalStock = stockRepository.findById(theStock.getId());
        if(optinalStock.isPresent()){
            Stock existingStock = optinalStock.get();
            existingStock.setItemId(theStock.getItemId());
            existingStock.setSizeId(theStock.getSizeId());
            existingStock.setQuantity(theStock.getQuantity());
            stockRepository.save(existingStock);
        }
    }
}
