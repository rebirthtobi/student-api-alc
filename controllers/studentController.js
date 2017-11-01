var student = require('./../models/student');

var index = function(req, res) {
    student.find({}).exec(function(err, data) {
        if (err) {
            res.status(404).send({ 'error': err.message });
        } else {
            res.status(200).send({
                'success': 'successfull',
                'students': data
            });
        }
    });
};

var create = function(req, res) {
	var studentData = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
		"class": req.body.studentClass,
        "dob": new Date(req.body.dob)
    };
    student.findOne({
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
		'class': req.body.studentClass,
        'dob': new Date(req.body.dob)
    }).exec(function(err, data) {
        if (err) {
            res.status(404).send({ 'error': err.message });
        } else {
            if (data) {
                res.status(200).send({ 'error': 'a student with the same data already exist' });
            } else {
                student(studentData).save(function(err, data) {
                    if (err) {
                        res.status(404).send({ 'error': err.message });
                    } else {
                        res.status(200).send({ 'success': 'Student details saved successfully' });
                    }
                });
            }
        }
    });
};

var update = function(req, res) {
	var studentData = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
		"class": req.body.studentClass,
        "dob": new Date(req.body.dob)
    };
    student.findOne({_id: req.body.identifier}).exec(function(err, data) {
        if (err) {
            res.status(404).send({ 'error': err.message });
        } else {
            if (data) {
                var toUpdate = studentData;
                toUpdate.dob = new Date(req.body.dob);
                toUpdate.updated_at = new Date();
                data.set(toUpdate);
                data.save(function(err, data) {
                    if (err) {
                        res.status(404).send({ 'error': err.message });
                    } else {
                        res.status(200).send({ 'success': 'Student details updated successfully' });
                    }
                });
            } else {
                res.status(404).send({ 'error': 'no student with these details found' });
            }
        }
    });
};

var remove = function(req, res) {
    student.findOne({
        '_id': req.body.id,
    }).exec(function(err, data) {
        if (err) {
            res.status(404).send({ 'error': err.message });
        } else {
            if (data) {
                data.remove(function(err, data) {
                    if (err) {
                        res.status(404).send({ 'error': err.message });
                    } else {
                        res.status(200).send({
                            'success': 'student record deleted successfully',
                            'data': data,
                        });
                    }
                });
            } else {
                res.status(404).send({ 'error': 'no student with ' + req.body.id + ' found' });
            }
        }
    });
};

var view = function(req, res) {
    student.findOne({
        '_id': req.params.id,
    }).exec(function(err, data) {
        if (err) {
            res.status(404).send({ 'error': err.message });
        } else {
            if (data) {
                res.status(200).send({
                    'success': 'student found',
                    'student': data
                });
            } else {
                res.status(404).send({ 'error': 'no student with ' + req.params.id + ' found' });
            }
        }
    });
};

var find = function(req, res) {
    var tofind = {};
    if (req.query.id) {
        tofind.id = req.query.id;
    }
    if (req.query.firstName) {
        tofind.firstName = new RegExp(["^", req.query.firstName, "$"].join(""), "i");
    }
    if (req.query.lastName) {
        tofind.lastName = new RegExp(["^", req.query.lastName, "$"].join(""), "i");
    }
    if (req.query.class) {
        tofind.class = new RegExp(["^", req.query.class, "$"].join(""), "i");
    }
    if (req.query.dob) {
        tofind.dob = new Date(req.query.dob);
    }
    student.find(tofind).exec(function(err, data) {
        if (err) {
            res.status(404).send({ 'error': err.message });
        } else {
            if (data) {
                res.status(200).send({
                    'success': 'student found',
                    'student': data
                });
            } else {
                res.status(404).send({ 'error': 'no student data with found' });
            }
        }
    });
};

module.exports = {
    index: index,
    create: create,
    update: update,
    remove: remove,
    view: view,
    find: find
};