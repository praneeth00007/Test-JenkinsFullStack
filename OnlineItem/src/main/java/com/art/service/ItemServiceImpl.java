package com.art.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.art.model.Item;
import com.art.repository.ItemRepository;

@Service
public class ItemServiceImpl implements ItemService {
    
    @Autowired
    private ItemRepository itemRepo;

    @Override
    public Item addItem(Item item) {
        return itemRepo.save(item);
    }

    @Override
    public List<Item> viewItem() {
        return itemRepo.findAll();
    }

    @Override
    public String deleteItem(Integer id) {
        Optional<Item> itemOpt = itemRepo.findById(id);
        if(itemOpt.isPresent()) {
            itemRepo.deleteById(id);
            return "Item deleted successfully with id: " + id;
        } else {
            return "Item not found with id: " + id;
        }
    }
    
    @Override
    public Item updateItem(Integer id, Item updatedItem) {
        Optional<Item> itemOpt = itemRepo.findById(id);
        
        if(itemOpt.isPresent()) {
            Item existingItem = itemOpt.get();
            
            // Update fields if they are provided
            if(updatedItem.getItemName() != null && !updatedItem.getItemName().isEmpty()) {
                existingItem.setItemName(updatedItem.getItemName());
            }
            
            if(updatedItem.getPrice() > 0) {
                existingItem.setPrice(updatedItem.getPrice());
            }
            
            if(updatedItem.getCategory() != null && !updatedItem.getCategory().isEmpty()) {
                existingItem.setCategory(updatedItem.getCategory());
            }
            
            // Save the updated item
            return itemRepo.save(existingItem);
        }
        
        return null; // Return null if item not found
    }
    
    @Override
    public Item getItemById(Integer id) {
        Optional<Item> itemOpt = itemRepo.findById(id);
        return itemOpt.orElse(null);
    }
}
