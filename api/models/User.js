/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

	attributes: {
		firstName: {
			type: 'string'
	  	},
	  	lastName: {
			type: 'string'
		},
	  	username: {
			type: 'string',
			required: true,
			unique: true,
			minLength: 3
		},
	  	email : {
			type: 'email',
			required: true,
			unique: true
		},
		password: {
			type: 'string',
			required: true,
			minLength: 6
		},
		lists: {
			collection : 'list',
			via : 'user'
		},
		toJSON : function(){
			var obj = this.toObject();
			delete obj.password;
			return obj
		}
	},
	beforeCreate: function (values, cb) {
		bcrypt.genSalt(10, function(err, salt) {
			if (err) return next(err);

			bcrypt.hash(values.password, salt, function(err, hash) {
				if (err) return cb(err);

				values.password = hash;
				cb();
			});
		});		
	}
};

