var path = require('path');
var rulesCtrl = require(path.join(__dirname, '..','..', 'ctrl', 'rulesCtrl'));
var validationCtrl = require(path.join(__dirname, '..','..', 'ctrl', 'validationCtrl'));
var organizationCtrl = require('./OrganizationController.js');




module.exports = function(app) {


    app.get('/api/verify/',
        rulesCtrl.verifyServer);

    // readALlData
    app.get('/api/organization/getAll',
        //validationCtrl.validateUserHeader,
        organizationCtrl.getAll);

        //createProduct
    app.post('/api/organization/create',
       // validationCtrl.validateUserHeader,
        organizationCtrl.createOrganization);


};
