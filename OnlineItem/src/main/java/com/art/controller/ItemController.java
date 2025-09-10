package com.art.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.art.model.Item;
import com.art.service.ItemService;
@RestController
@RequestMapping("/item")
@CrossOrigin(origins = {"http://localhost:2030", "http://localhost:5173", "http://localhost:2030/itemsapi"}) // specific origins for security
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/")
    public String home() {
        return "Item Store Home Page";
    }

    @PostMapping("/add")
    public Item addItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    @GetMapping("/view")
    public List<Item> viewItem() {
        return itemService.viewItem();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteItem(@PathVariable Integer id) {
        return itemService.deleteItem(id);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getItemById(@PathVariable Integer id) {
        Item item = itemService.getItemById(id);
        if (item != null) {
            return new ResponseEntity<>(item, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Item not found with id: " + id, HttpStatus.NOT_FOUND);
        }
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Integer id, @RequestBody Item item) {
        Item updatedItem = itemService.updateItem(id, item);
        if (updatedItem != null) {
            return new ResponseEntity<>(updatedItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Item not found with id: " + id, HttpStatus.NOT_FOUND);
        }
    }
}
