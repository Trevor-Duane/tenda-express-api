import Category from "./category.js";
import Subcategory from "./subcategory.js";
import Item from "./item.js";

Subcategory.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Subcategory, { foreignKey: 'category_id', onUpdate: 'CASCADE' });

Item.belongsTo(Subcategory, { foreignKey: 'subcategory_id' });
Subcategory.hasMany(Item, { foreignKey: 'subcategory_id', onUpdate: 'CASCADE' });

Item.belongsTo(Subcategory, { through: Subcategory, foreignKey: 'subcategory_id' });
Category.hasMany(Item, { foreignKey: 'subcategory_id', onUpdate: 'CASCADE' });


export { Category, Subcategory, Item }