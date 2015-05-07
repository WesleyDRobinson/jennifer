var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/user');
require('../../../server/db/models/conference');
require('../../../server/db/models/presentation');

var User = mongoose.model('User');
var Conference = mongoose.model('Conference');
var TimeLineItem = mongoose.model('TimeLineItem');
var Presentation = mongoose.model('Presentation');

describe('Conference model', function () {
    var testUser,
        testConference,
        testPresentation,
        testTimeLineItem;

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Make a User, Conference, and Presentation', function (done) {


        User.create({
            name: 'Wesley'
        }, function (err, user) {
            testUser = user;

            Presentation.create({
                media    : [{mediaType: 'video', url: 'www.google.com'}],
                presenter: user._id,
                title: 'My Trip to India'
            }, function (err, presentation) {
                testPresentation = presentation;

                Conference.create({
                    name: "BrooklynJune15",
                    date: new Date("June 23, 2015"),
                    venue: "Brooklyn Bowl",
                    presenters: [ user._id ],
                    timeline: null,
                    //locale: 1234
                }, function (err, conf) {
                    if (err) console.log("Conference err: ", err);
                    testConference = conf;

                    done();
                });
            });
        });
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Conference).to.be.a('function');
    });

    it('saves a timeline on its own', function (done) {
        TimeLineItem.create({
            title: 'presentation',
            presentation: testPresentation._id
        }, function(err, item) {
            testTimeLineItem = TimeLineItem;

            expect(item.presentation).to.equal(testPresentation._id);
            done();
        }); 
    });

    it('adds a timeline to a conference', function(done) {
        console.log("Test conf: ", testConference);

        Conference.findOne({ id: testConference._id}, function(err, conference) {
            console.log("Err: ", err, "Conf: ", conference);

            expect(conference.timeline).to.equal(testTimeLineItem._id);
            done();
        });
    });

    // it('updates a timeline in a conference', function() {
    //     Conference.findOneAndUpdate({ id: testConference._id}, { timeline: ["Added timeline"]}, function(err, conference) {
    //         // console.log("TTTTTTTTTT");
    //         // console.log(conference);
    //         conference.timeline.push("Updated");

    //         Conference.findOneAndUpdate({ id: testConference._id }, { timeline: conference.timeline}, function(conference) {
    //             expect(conference.timeline.length).to.equal(2);
    //         });
    //     });
    // });
});