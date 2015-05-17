/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');
var _ = require('lodash');		

module.exports = {
	create : function(req, res){
		User.create(req.body, function(err, user){
			if(err){res.json({error: err})};
			var list = {};
			list.name = user.username;
			list.url = "/";
			list.user = user;
			List.create(list, function(err, list){
				User.findOneByUsername(user.username)
					.populate('lists')
					.exec(function(err, entry){
					res.json(entry);
				});
			});
		});	
	},
	update : function(req, res){
		var user = req.body;
		user.save(function(err, user){
			if(err){res.json({error: err})}	
			res.send(user);
		});
	},
	
	findOne : function(req, res){
		if(req.param === undefined){
			res.json({});	
		}
		User.findOne(req.param("id")).populate('lists').exec(function(err, user){
			if(err){res.json({error: err})};
			List.find({where: {user : user.id}}).populate('items').exec(function(err, lists){
				
				//weirdly I cannot just say user.lists = lists and then call res.json(user)
				//it seems to lose all added fields;
				user.lists = [];
				var test = {};
				test.username = user.username;
				test.email = user.email;
				test.firstName = user.firstName;
				test.lastName = user.lastName;
				test.id = user.id;
				test.createdAt = user.createdAt;
				test.updatedAt = user.updatedAt;
				test.lists = lists;
				res.json(test);
			});
		});
	},
	
	findOneByUsername : function(req, res){
		console.log(req.body.username);
		User.findOneByUsername(req.body.username).populate('lists').exec(function(err, user){
			
			if(err){res.json({error: err})}
			console.log(user);
			List.find({where: {user : user.id}}).populate('items').exec(function(err, lists){
				
				//weirdly I cannot just say user.lists = lists and then call res.json(user)
				//it seems to lose all added fields;
				user.lists = [];
				var test = {};
				test.username = user.username;
				test.email = user.email;
				test.firstName = user.firstName;
				test.lastName = user.lastName;
				test.id = user.id;
				test.createdAt = user.createdAt;
				test.updatedAt = user.updatedAt;
				test.lists = lists;
				res.json(test);
			});
		});
	},
	
	login: function (req, res) {
		console.log('logging in ' + req.body.email + ' with ' + req.body.password);
		User.findOneByEmail(req.body.email).populate('lists').exec(function (err, user) {
			if (err) res.json({ error: 'DB error' }, 500);
			console.log('found user');
			if (user) {
				bcrypt.compare(req.body.password, user.password, function (err, match) {
					if (err) {
						console.log('error');
						res.json({ error: 'Server error' }, 500);
					}
					console.log('gonna be a match');
					if (match) {
						// password match
						req.session.user = {};
						req.session.user.id = user.id;
						req.session.user.username = user.username;
						req.session.authenticated = true;
						res.json(user);
					} else {
						// invalid password
						if (req.session.user) req.session.user = null;
						res.json({ error: 'Invalid password' }, 400);
					}
				});
			} else {
				res.json({ error: 'User not found' }, 404);
			}
		});
	},
	
	logout: function(req, res){
		req.session.destroy();
		res.json({logout : "successful"});
	},
	
	findme : function(req, res){
		if(req.session.authenticated){
			res.json(req.session.user);	
		} else {
			res.json({});
		}
	}
};

