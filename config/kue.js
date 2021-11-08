// kue is a groupe of similar jobs or arrya of similar jobs there fore we are creating a new folder Worker
const kue = require('kue')// configuration kue
const queue = kue.createQueue();
module.exports = queue;