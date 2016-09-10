new Vue({
    el: '.main',
    data: {
        step: 10,
        name: '',
        players: [],
        playerCount: 0,
        history: [],
        historyName: ''
    },
    methods: {
        addPlayer: function() {
            this.playerCount++;
            var name = this.name || 'player' + this.playerCount;
            this.players.push({name: name, points: 0});
            this.addHistory(name + ' has join the game.');
            this.name = '';
            this.updateRank();
        },

        removePlayer: function(index) {
            this.addHistory(this.players[index].name + ' has left the game.');
            this.players.splice(index, 1);
        },

        addPoints: function(index) {
            this.addHistory(this.players[index].name + ' has won ' + this.step + ' points');
            this.players[index].points += parseInt(this.step);
            this.updateRank();
        },

        reducePoints: function(index) {
            this.addHistory(this.players[index].name + ' has lost ' + this.step + ' points.');
            this.players[index].points -= parseInt(this.step);
            this.updateRank();
        },

        resetScore: function(index) {
            this.players[index].points = 0;
            this.addHistory(this.players[index].name + "'s score has been reseted.");
            this.updateRank();
        },

        resetAllScore: function() {
            this.players.map(function(v) {
                return v.points = 0;
            });
            this.addHistory("Scores have been reseted.");
        },

        reset: function() {
            this.players = [];
            this.history = [];
        },

        addHistory: function(msg) {
            this.history.unshift(msg);
        },

        filterHistory: function(v) {
            if(this.historyName)
                return v.substr(0, this.historyName.length) === this.historyName;
            return v;
        },

        updateRank: function() {
            for(var i=window.setTimeout(function(){}, 0); i>0; i--)
                window.clearTimeout(i);
            setTimeout(this.sortRank, 1500);
        },

        sortRank: function() {
            this.players.sort(function(a, b) {
                return a.points < b.points;
            });
        }
    },
    filters: {
        rank: function(v) {
            v = '' + v;
            if(['11', '12', '13'].indexOf(v.substr(-2)) !== -1)
                return v + 'th';
            return v + ({1: 'st',2: 'nd',3: 'rd'}[v.substr(-1)] || 'th');
        }
    },
});