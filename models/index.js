import Category from "./category.js";
import Subcategory from "./subcategory.js";
import Item from "./item.js";
import Store from "./store.js";
import Recipe from "./recipes.js";
import shoppingList from "./shopping_list.js";

Subcategory.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Subcategory, { foreignKey: 'category_id', onUpdate: 'CASCADE' });

Item.belongsTo(Subcategory, { foreignKey: 'subcategory_id' });
Subcategory.hasMany(Item, { foreignKey: 'subcategory_id', onUpdate: 'CASCADE' });

Item.belongsTo(Subcategory, { through: Subcategory, foreignKey: 'subcategory_id' });
Category.hasMany(Item, { foreignKey: 'subcategory_id', onUpdate: 'CASCADE' });

Recipe.belongsTo(Store, { foreignKey: 'store_id'});
Recipe.belongsTo(Item, { foreignKey: 'product_id'});
Item.hasMany(Recipe, { foreignKey: 'product_id', onUpdate: 'CASCADE'});
Store.hasMany(Recipe, { foreignKey: 'store_id', onUpdate: 'CASCADE' });

Store.belongsTo(shoppingList, { foreignKey: 'shopping_list_id' });
shoppingList.hasMany(Store, { foreignKey: 'shopping_list_id', onUpdate: 'CASCADE'})



export { Category, Subcategory, Item, Store, Recipe }