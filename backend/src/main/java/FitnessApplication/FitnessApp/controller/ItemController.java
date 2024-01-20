package FitnessApplication.FitnessApp.controller;

import FitnessApplication.FitnessApp.service.ItemService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class ItemController {
    private final ItemService itemService;
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // Endpoint that exposes the number of items in the database
    @GetMapping("/items/count")
    public int getNumberOfItems() {
        return itemService.getNumberOfItems();
    }
}
