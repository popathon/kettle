var makeAPI = new Make({
	apiURL: "https://makeapi.webmaker.org"
});

Kettle.extend(Kettle.prototype, {
	search: function(searchTerm, fn){
		var self = this;
		makeAPI.or()
			.tags(searchTerm.split(/\s+/))
			.description(searchTerm)
			.sortByField('updatedAt', 'desc')
			.content("application/x-popcorn")
			.then(function(err, makes){
				if(err){
					// handle error
					console.log();
					return;
				}


				// dumb update (will likely cause duplicates)
				self.playQueue = self.playQueue.concat(makes);

				// stick the searchTerm into the playQueue for auto updating
				Kettle.forEach(makes, function(make){
					if (make.updatedAt > self.playQueue.mostRecentTime){
						self.playQueue.mostRecentTime = make.updatedAt;
					}
				});

				// callback
				if(fn){
					fn(self.playQueue);
				}

				// For the sake of usability return the playQueue
				return self.playQueue;
			});
	}
});