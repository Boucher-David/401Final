'use strict';

// stole this from a blog. makes all await promises have errors instead of silently failing and stopping all execution.

 module.exports = function (promise) {
    return promise.then(data => {
        return [null, data];
     })
     .catch(err => [err]);
 }