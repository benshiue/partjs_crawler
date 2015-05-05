'use strict';

// Life Streaming
exports = module.exports = function(app, mongoose) {
    var channelSchema = new mongoose.Schema({

        youtubeId: { type: String, default: ''}, 
        username: { type: String, default: ''},
        subject: { type: String, default: ''}, 
        group: { type: String, default: ''},

        // update date
        date: { type: Date, default: Date.now },

        userCreated: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            name: { type: String, default: '' },
            time: { type: Date, default: Date.now } // create date
        }     
    });

    channelSchema.plugin(require('./plugins/pagedFind'));

    channelSchema.index({ youtubeId: 1 });

    channelSchema.set('autoIndex', true);
    app.db.model('Channel', channelSchema);
}