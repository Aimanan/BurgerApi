class MealsController {
    constructor(data) {
        this.data = data;
    }  

    create(req, res) {
        const meal = req.body;

        // validate item
        const category = {
            name: meal.category,
        };

        const user = req.user;

        meal.user = {
            id: user._id,
            username: user.username,
        };

        return Promise
            .all([
                this.data.meals.create(meal),
            ])
            .then(([dbMeal,category]) => {
                console.log('***');
                console.log('dbMeal:');
                console.log(dbMeal);
                dbCategory.name = meal.category;
                dbCategory.meals = dbCategory.meals || [];
                const burger = {};
                burger._id = dbMeal._id;
                burger.name = dbMeal.name;
                burger.tagline = dbMeal.tagline;
                burger.description = dbMeal.description;
                burger.first_brewed = dbMeal.first_brewed;
                burger.image_url = dbMeal.image_url;
                burger.abv = dbMeal.abv;
                burger.ibu = dbMeal.ibu;
                burger.target_fg = dbMeal.target_fg;
                burger.target_og = dbMeal.target_og;
                burger.ebc = dbMeal.ebc;
                burger.srm = dbMeal.srm;
                burger.ph = dbMeal.ph;
                burger.ingredients = dbMeal.ingredients;
                //burger.contributed_by = dbMeal.contributed_by;

                dbCategory.meals.push(
                    burger
                );

                dbMeal.category = {
                    _id: dbCategory._id,
                    name: dbCategory.name,
                };

                return Promise.all([
                    this.data.meals.updateById(dbMeal),
                    this.data.categorys.updateById(dbCategory),
                ]);
            })
            .then(() => {
                // connect-flash
                return res.redirect('/');
            })
            .catch((err) => {
                // console.log('err:');
                // console.log(err);
                req.flash('error', err);
                return res.redirect('/meals/form');
            });
    }
}

const init = (data) => {
    return new MealsController(data);
};

module.exports = { init };