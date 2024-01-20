package FitnessApplication.FitnessApp.service;


import FitnessApplication.FitnessApp.entity.Item;
import FitnessApplication.FitnessApp.entity.User;
import FitnessApplication.FitnessApp.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ItemServiceImpl implements ItemService{
    private final ItemRepository itemRepository;
    @Autowired
    public ItemServiceImpl(ItemRepository theItemRepository) {
        itemRepository = theItemRepository;
    }
    @Override
    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    @Override
    public Item findById(int theId) {
        Optional<Item> result = itemRepository.findById(theId);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new RuntimeException("Did not find item id - " + theId);
        }
    }



    @Override
    public void save(Item theItem) {
        itemRepository.save(theItem);
    }

    @Override
    public void deleteById(int theId) {
        itemRepository.deleteById(theId);
    }

    @Override
    public int getNumberOfItems() {
        List<Item> items = itemRepository.findAll();
        return items.size();
    }
}
