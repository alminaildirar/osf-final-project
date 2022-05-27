const {
    findCategoriesWhichHaveProducts,
} = require('../services/SearchService');
const { getProductsByCategoryId } = require('../services/ProductService');
const { getCategoriesByParentId } = require('../services/CategoryService');

const search = async (req, res, next) => {
    const searchedProduct = req.body.search;
    try {
        let filteredProducts = [];
        const categories = await findCategoriesWhichHaveProducts();
        const roots = await getCategoriesByParentId('root');
        let maxResult = 0;
        let resultCount = 0;
        let data;

        for (let i = 0; i < categories.length; i++) {
            data = await getProductsByCategoryId(categories[i]);
            if (!data) continue;

            for (let j = 0; j < data.length; j++) {
                if (data[j].name.toLowerCase().includes(searchedProduct)) {
                    if (maxResult === 25) {
                        i = categories.length;
                        continue;
                    }
                    maxResult++;
                    resultCount++;
                    let product = {};
                    product.name = data[j].name;
                    product.id = data[j].id;
                    product.image = data[j].image_groups[2].images[0].link;
                    product.price = data[j].price;
                    product.desc = data[j].short_description;
                    product.parent = data[j].primary_category_id;
                    filteredProducts.push(product);
                }
            }
        }

        return res.render('search', {
            roots,
            filteredProducts,
            resultCount,
            searchedProduct,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { search };
