/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create : function(req, res){
		console.log('creating list');
		List.create(req.body).exec(function(err, list){
			if(err){res.json({error: "Error creating list"}, 400)}
			res.json(list);
		});
	},
	
	findByUser : function(req, res){
		
	},
	
	findOne : function(req, res){
		console.log(req.param("id"));
		List.findOne(req.param("id")).populate("items").exec(function(err, list){
			if(err){res.json({error: "Error finding list"}, 400)}
			res.json(list);
		});
	},
	destroy : function(req, res){
		console.log("preparing to destroy list " + req.body.id)
		List.destroy({id : req.body.id}).exec(function(err, list){
			if(err){res.json({error: err})}
			console.log("destroy " +  list);
			res.send(req.body.id);
		});
	}
};

