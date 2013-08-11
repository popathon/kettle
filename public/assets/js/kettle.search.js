Kettle.extend(Kettle.prototype, {
	search: function(searchTerm){
		makeAPI.find({
			tags: [{
				tags: searchTerm.split(/\s+/)
			}],
			description: searchTerm
		}).sortByField('updatedAt', 'desc').then(function(err, makes){
			if(err){
				// handle error
				return;
			}

			// dumb update (will likely cause duplicates)
			Kettle.playQueue = Kettle.playQueue.concat(makes);

			// stick the searchTerm into the playQueue for auto updating
			Kettle.playQueue.searchTerm = searchTerm;

			// For the sake of usability return the playQueue
			return Kettle.playQueue;
		});
	}
});