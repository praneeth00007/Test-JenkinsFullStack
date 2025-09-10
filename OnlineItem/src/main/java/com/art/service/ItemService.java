package com.art.service;

import java.util.List;
import com.art.model.Item;

public interface ItemService {
	
	public Item addItem(Item item);
	public List<Item> viewItem();
	String deleteItem(Integer id);
	public Item updateItem(Integer id, Item item);
	public Item getItemById(Integer id);
	
}
