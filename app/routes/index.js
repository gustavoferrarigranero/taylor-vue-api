const userRoutes = require('./user_routes');
const squareRoutes = require('./square_routes');
const cardRoutes = require('./card_routes');
module.exports = function (app, db) {
    userRoutes(app, db);
    squareRoutes(app, db);
    cardRoutes(app, db);
    // Other route groups could go here, in the future
};