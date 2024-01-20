package FitnessApplication.FitnessApp.controller;


import FitnessApplication.FitnessApp.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StockController {

    @Autowired
    private StockService stockService;

    // Endpoint that exposes available sizes for a given item
    @GetMapping("/stocks/sizes/{itemId}")
    public List<Integer> getSizeIdsByItemId(@PathVariable int itemId) {
        return stockService.getSizeIdsByItemId(itemId);
    }
    // Endpoint that decrements the quantity of an item at the specified size
    @GetMapping("/stocks/decrementQuantity/{itemId}/{sizeId}")
    public ResponseEntity<Integer> decrementQuantity(
            @PathVariable int itemId,
            @PathVariable int sizeId
    ) {
        Integer updatedQuantity = stockService.decrementQuantity(itemId, sizeId);

        if (updatedQuantity != null) {
            return ResponseEntity.ok(updatedQuantity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
