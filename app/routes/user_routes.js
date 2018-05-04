var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/users/all', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('users').find().toArray((err, items) => {
            if (err || !items) {
                res.send([]);
            } else {
                res.send(items);
            }
        });
    });
    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    app.post('/users/login', (req, res) => {
        const details = {'email': req.body.email, 'password': req.body.password};
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    app.post('/users', (req, res) => {
        const user = {name: req.body.name, email: req.body.email, password: req.body.password};
        db.collection('users').insert(user, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('users').remove(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Item ' + id + ' deleted!');
            }
        });
    });

    app.put('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const user = {name: req.body.name, email: req.body.email, password: req.body.password};
        db.collection('users').update(details, user, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(user);
            }
        });
    });
};