Kettle.extend(Kettle.prototype, {
	playQueue: []
});

Kettle.prototype.playQueue.prototype = {
		updateTimer: null,
		updateInterval: 4000,
		searchTerm: "",
		mostRecentTime: 0;
		shuffle: function(){
			for(var j, x, i = this.length; i; j = parseInt(Math.random() * i, 10), x = this[--i], this[i] = this[j], this[j] = x);
		},
		startUpdate: function(){
			var self = this;
			this.updateTimer = setInterval(function(){
				Kettle.search(self.searchTerm);
			}, this.updateInterval);
		},
		stopUpdate: function(){
			clearInterval(this.updateTimer);
		}
	};