const { getAllCategories } = require('./CategoryService');

//For finding subcategories(categories that are not parent category have products)
const findCategoriesWhichHaveProducts = async () => {
    const categories = (await getAllCategories()).map((category) => {
        return { category: category.id, parent: category.parent_category_id };
    });
    const subCategories = categories.map((item) => item.category);
    let uniqParent = [];
    categories.forEach((item) => {
        if (uniqParent.indexOf(item.parent) < 0) uniqParent.push(item.parent);
    });
    uniqParent.forEach((item) => {
        subCategories.splice(subCategories.indexOf(item), 1);
    });
    return subCategories;
};

module.exports = { findCategoriesWhichHaveProducts };
