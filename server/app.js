//Initialize modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//app.use(bodyParser({limit: '7mb'}));
app.use(bodyParser.json()); // parse application/json

// Set up multer.
const multer = require('multer');
//const path = require('path');
const storage = multer.diskStorage({
    destination: __dirname + '/img/',
    filename: (req, file, cb) => {
        cb(null, file.originalname) //  + "-" + Date.now() + path.extname(file.originalname) to make name unique
        //TODO make uploaded filenames unique
    }
});
const upload = multer({
    storage: storage
}).single('file');

//DB setup
mongoose.connect("mongodb://mongo:27017/test");
const models = require('./models')(mongoose);

/**
 * Create (a specific) user(s)
 */
app.post('/users/create', function (req, res) {
    console.log("creating user");
    if (!req.body) {
        res.send('Use valid userformat');
        return;
    }
    models.user.create(req.body, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

/**
 * Read (a specific) user(s)
 */
app.post('/users/read', function (req, res) {
    console.log("getting users");
    models.user.find(req.body, function (err, result) {
        if (err) {
            res.send('Fehler');
        } else {
            res.send(result);
        }
    });
});

/**
 * Update a specific user
 */
app.post('/users/update', function (req, res) {
    models.user.update(req.body.seachFor, req.body.setTo, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

/**
 * Delete (a specific) user(s)
 */
app.post('/users/delete', function (req, res) {
    models.user.remove(req.body, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

/**
 * Create a job
 */
app.post('/jobs/create', function (req, res) {
    models.job.create(req.body, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

/**
 * Read (a specific) job(s)
 */
app.post('/jobs/read', function (req, res) {
    models.job.find(req.body, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

/**
 * Update a specific user
 */
app.post('/jobs/update', function (req, res) {
    models.job.update(req.body.searchFor, req.body.setTo, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

/**
 * Delete (a specific) user(s)
 */
app.post('/jobs/delete', function (req, res) {
    models.job.remove(req.body, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
});

app.post('/jobs/cards', function (req, res) {
    var tempRes = [];
    models.job.find({}, function(err, result){
        result.forEach(function (job) {
            console.log(Math.sqrt(Math.pow(Math.abs(job.jobLon - req.body.lon), 2) + Math.pow(Math.abs(job.jobLat - req.body.lat), 2)));
            if (Math.sqrt(Math.pow(Math.abs(job.jobLon - req.body.lon), 2) + Math.pow(Math.abs(job.jobLat - req.body.lat), 2)) < 1000) {
                tempRes.push(job);
            }
            console.log(tempRes);
        })
        res.send(tempRes);
    });
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.send('Something went wrong.');
        } else {
            console.log(req.file);
            res.send('Success.');
        }
    })
});

app.get('/download', (req, res) => {
    const path = '/img/' + req.headers.file;
    res.sendFile(path, {root: __dirname});
});

/**
 * Run API
 */
app.listen(3000, function () {
    console.log('Server listening on port 3000!');
});