const pg = require('pg');
const path = require('path');
var config = require(path.join(__dirname, '..','..', 'resources', 'DBresources','DBQueryUtil'));
const Query = require('pg').Query
const { Client } = require('pg').Client
const logger = require(path.join(__dirname, '..','..', 'util', 'logger'));

var connectionString = config.ConnectDevDbString;

// working


exports.create = function(product){
    var results = [];
    var _query = "INSERT INTO organization(organization_id, contact_person, contact_person_email," +
           "geolocation, is_active, organization_name, contact_person_no)VALUES ($1, $2, $3, $4, $5, $6, $7);"
    logger.info("Query String  :: ",_query)
    return new Promise(function(res, rej) {
      pg.connect(connectionString, function(err, client, done){
        client.query(_query,
        [productStat.productId, productStat.createdTillNowNo, productStat.predictedNo ,productStat.tenantId],
        function(err, result) {
            if(err){
              logger.info("Some Error occured")
              res({success: false, data: err});
            }
            logger.info("success");
            res({success: true, data:result });
            done(); // don't forget this to have the client returned to the pool
          })
        })
    })
}
// working
exports.getAll = function(){
    var results = [];
    var _query = 'SELECT * FROM organization;';
    console.log("Query String ::",_query);

    return new Promise(function(res, rej) {
      pg.connect(connectionString, function(err, client, done){
        client.query(_query, function(err, result) {
           if(err){
             logger.info("Some Error occured",err)
             res({success: false, data: err});
           }
             for(var val of result.rows) {
               results.push(val)
             }
             logger.info("success");
             res({"success": true, "data":results });
             done(); // don't forget this to have the client returned to the pool
           })

    })
  })
}
