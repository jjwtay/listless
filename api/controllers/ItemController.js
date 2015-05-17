/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findOne: function(req, res){
		console.log("finding " + req.param('id'));
		Item.findOne(req.param("id")).exec(function(err, item){
			if(err){res.json({error: "Error finding item"}, 400)}
			console.log("found " + item);
			res.json(item);
		});	
	},
	create : function(req, res){
		Item.create(req.body).exec(function(err, item){
			if(err){res.json({error: err})}
			res.send(item);
		});
	},
	update : function(req, res){
		/*Item.findOne(req.body.id).exec(function(err, item){
			if(err){res.json({error: err})}
			item.done = req.body.done;
			item.save(function(e, i){
				res.send(i);
			});
			
		});*/
		Item.update({id: req.body.id}, {done: req.body.done, name: req.body.name}).exec(function afterwards(err, updated){
			if(err){res.json({error: err})}
			res.send(updated[0]);
		});
	},
	destroy : function(req, res){
Item.destroy({id : req.body.id}).exec(function(err, item){
			if(err){res.json({error: err})}
			res.send(req.body.id);
		});
	},
	move : function(req, res){
		List.findOne(req.idList).exec(function(err, list){
			Item.update({id: req.idItem}, {list: list}).exec(function afterwards(err, updated){
				res.send(updated[0]);
			});
		});
			
	}
};

