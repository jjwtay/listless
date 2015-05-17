var app = angular.module("listless");

app.filter("urlFilter", function(){
	return function(lists, currentList){
		if(!lists){
			return [];	
		}
		var filteredList =  lists.filter(function(list){
			return list.url.indexOf(currentList.url + currentList.name) === 0;
		});
		return filteredList;
	}
});