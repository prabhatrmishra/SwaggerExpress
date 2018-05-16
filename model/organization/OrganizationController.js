var path = require('path');
var restify = require('restify');
var Request = require('request');
var http = require("http");
var organizationDAL = require('./organizationDAL.js');
const logger = require(path.join(__dirname, '..','..', 'util', 'logger'));

;

/**
 * @swagger
 * resourcePath: /Organization
 * description: All about Organization
 */

/**
 * @swagger
 * path: /fetchAll
 * operations:
 *   -  httpMethod: GET
 *      summary: Fetch Organization
 *      notes: Returns all Organizations
 *      responseClass: User
 *      nickname: fetchAll
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: organizationId
 *          description: organization Id
 *          paramType: query
 *          required: false
 *          dataType: string
 *        - name: organizationName
 *          description: organization Name
 *          paramType: query
 *          required: false
 *          dataType: string
 */
exports.getAll = function (req, res,next) {

    logger.info("I am in getAll  Controller ...");
    organizationDAL.getAll().
    then(function (result) {
        if(result.success == true){
            res.status(200)
        }
        else{
            res.status(400) ;
        }
        res.send(result)
        return next();

    });
}
