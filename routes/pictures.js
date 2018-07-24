/** This module defines the routes for pictures using mongoose
 *
 * @author Johannes Konert
 * @licence MIT
 *
 * @module routes/pictures
 * @type {Router}
 */


// modules
const express = require('express');
const logger = require('debug')('we2:pictures');
const codes = require('../restapi/http-codes');
const HttpError = require('../restapi/http-error.js');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/we2',
    {promiseLibrary: Promise});
const PictureModel = require('../models/picture.model.js');

// TODO add here your require for your own model file


const pictures = express.Router();

const storeKey = 'pictures';

// routes **************
pictures.route('/')
    .get((req, res, next) => {
        // TODO replace store and use mongoose/MongoDB
        // res.locals.items = store.select(storeKey);
        let query = PictureModel.find({});
        query.exec()
            .catch(err => {
                return next(err);
            })
            .then(items => {
                res.locals.items = items;
                res.locals.processed = true;
                logger("GET fetched items");
                next();
            });
    })
    .post((req,res,next) => {
        req.body.timestamp = new Date().getTime();
        // TODO replace store and use mongoose/MongoDB
        // var result = store.insert(storeKey, req.body);
        let picture = new PictureModel(req.body);
        let query = picture.save();
        query
            .catch((err)=> {
                return next(err);
            })
            .then(()=> {
                res.locals.items = picture;
                res.status(codes.created);

                res.locals.processed = true;
                next();
            });
    })
    .all((req, res, next) => {
        if (res.locals.processed) {
            next();
        } else {
            // reply with wrong method code 405
            let err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    });

pictures.route('/:id')
    .get((req, res,next) => {
        // TODO replace store and use mongoose/MongoDB
        // res.locals.items = store.select(storeKey, req.params.id);

        let query = PictureModel.findById(mongoose.Types.ObjectId(req.params.id));
        query.exec()
            .catch(()=>{
                var err = new HttpError('No element with id ' + req.params.id, codes.notfound);
                return next(err);
            })
            .then(items=>{
                res.locals.items = items;
                res.status(codes.success);
                res.locals.processed = true;
                logger("GET fetched items");
                next();
            });
    })
    .put((req, res,next) => {

        // TODO replace store and use mongoose/MongoDB
        // store.replace(storeKey, req.body.id, req.body);
        PictureModel.findByIdAndUpdate(req.params.id, req.body,
            {runValidators:true, new: true})
            .catch( ()=> {
                var err = new HttpError('No element with id ' + req.params.id, codes.notfound);
                return next(err);
            })
            .then(items => {
                res.status(codes.success);
                res.locals.processed = true;
                res.locals.items = items;
                next();
            });
        // res.locals.items = store.select(storeKey, id);

    })
    .delete((req,res,next) => {
        // TODO replace store and use mongoose/MongoDB
        // store.remove(storeKey, id);

        // ...
        //    var err = new HttpError('No element to delete with id ' + req.params.id, codes.notfound);
        //    next(err);
        // ...

        PictureModel.findByIdAndRemove(req.params.id)
            .catch( () => {
                var err = new HttpError('No element to delete with id ' + req.params.id, codes.notfound);
                return next(err);
            })
            .then(items => {
                res.status(codes.success);
                res.locals.processed = true;
                res.locals.items = items;
                next();
            });
    })

    .all((req, res, next) => {
        if (res.locals.processed) {
            next();
        } else {
            // reply with wrong method code 405
            let err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    });

/**
 * This middleware would finally send any data that is in res.locals to the client (as JSON)
 * or, if nothing left, will send a 204.
 */
pictures.use((req, res, next) => {
    if (res.locals.items) {
        res.json(res.locals.items);
        delete res.locals.items;
    } else if (res.locals.processed) {
        res.set('Content-Type', 'application/json'); // not really necessary if "no content"
        if (res.get('Status-Code') == undefined) { // maybe other code has set a better status code before
            res.status(204); // no content;
        }
        res.end();
    } else {
        next(); // will result in a 404 from app.js
    }
});

module.exports = pictures;

