const model = require('../models/guestbook');

module.exports = {
    index: async function(req, res) {
        const results = await model.findAll();
        res.render('index', {
            list: results || []
        });
    },
    deleteform: function(req, res) {
        var no = req.query.no
        res.render('deleteform', {no});
    },
    add: async function(req, res) {
        const results = await model.insert(req.body);
        res.redirect("/");
    },
    delete: async function(req, res) {
        const results = await model.delete(req.body);
        res.redirect("/");
    }
}