var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/:user_id/squares', (req, res) => {
        const user_id = req.params.user_id;
        const details = {'user_id': user_id};
        db.collection('squares').find(details).toArray((err, items) => {
            if (err || !items) {
                res.send([]);
            } else {
                res.send(items);
            }
        });
    });
    app.get('/squares/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('squares').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    app.post('/:user_id/squares', (req, res) => {
        const user_id = req.params.user_id;
        const square = { name: req.body.name, user_id: user_id };
        db.collection('squares').insert(square, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/squares/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('squares').remove(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Item ' + id + ' deleted!');
            }
        });
    });

    app.put('/squares/:id', (req, res) => {
        const id = req.params.id;
        const user_id = req.params.user_id;
        const details = {'_id': new ObjectID(id)};
        const square = { name: req.body.name, user_id: user_id };
        db.collection('squares').update(details, square, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(square);
            }
        });
    });
};