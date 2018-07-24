"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
        width: {type: Number, required: true},
        height: {type: Number, required: true},
        src: {type: String, required: true},
        title: {type: String, default: '', maxlength: 140},
        description: {type: String, default: '', maxlength: 1000},
        views: {type: Number, default: 0, min: 0}
    }, {
    timestamps:{createdAt: 'timestamp', pdatedAt: 'changed'}
    }
);

module.exports = mongoose.model('Picture',PictureSchema);
