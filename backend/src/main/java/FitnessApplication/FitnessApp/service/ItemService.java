package FitnessApplication.FitnessApp.service;


import FitnessApplication.FitnessApp.entity.Item;

import java.util.List;

public interface ItemService {
    List<Item> findAll();
    Item findById(int theId);
    void save(Item theItem);
    void deleteById(int theId);
    int getNumberOfItems();


}
