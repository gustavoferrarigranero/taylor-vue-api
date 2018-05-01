var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/squares/:square_id/cards', (req, res) => {
        const square_id = req.params.square_id;
        const details = {'square_id': square_id};
        db.collection('cards').find(details).toArray((err, items) => {
            if (err || !items) {
                res.send([]);
            } else {
                res.send(items);
            }
        });
    });
    app.get('/cards/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('cards').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    app.post('/squares/:square_id/cards', (req, res) => {
        const square_id = req.params.square_id;
        const square = { name: req.body.name, status: req.body.status, square_id: square_id };
        db.collection('cards').insert(square, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/cards/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('cards').remove(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Item ' + id + ' deleted!');
            }
        });
    });

    app.put('/cards/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const square = { name: req.body.name, status: req.body.status, square_id: req.body.square_id };
        db.collection('cards').update(details, square, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(square);
            }
        });
    });
};