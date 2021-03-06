'use strict';

var express = require('express');
var router = express.Router();
var apiController = require('../Controllers/api.js')

var insertEvent = require('../Models/eventModel').insertEvent
var insertPoll = require('../Models/pollModel').insertPoll
var insertEmail = require('../Models/emailModel').insertEmail
var nodeMailer = require('../Workers/email').sendNodeMailer
var request = require('request');


// ROUTE TO RETRIEVE API(S) DATA 
router.route('/events/:loc/:timeframe')
	.get(function(req, res) {

    var loc = req.params.loc
    var timeframe = req.params.timeframe
    // console.log('loc', loc)
    // console.log('timeframe', timeframe)

		apiController.getEvents(loc, timeframe, function(err, data){
      if(err) {
        res.statusCode(404).send("did not find events")
      } else {
        // console.log('data', data)
        res.json(data)
      }
    });

	});

// ROUTE TO CREATE USERS
router.route('/users')
  .post(function(req,res){
    // add to user table
    // respond with user token

  })


// ROUTE TO CREATE POLL
//POST BODY must have pollInfo and eventInfo properties, each holding an object with necessary info.
//eventInfo will be preset on client, regardless of API its from. pollInfo will need to have userId,
//user object with will include userId, firstName, lastName.
router.route('/polls')
  .post(function(req, res){
  // create new poll



 
    var pollInfo = req.body.pollInfo;
    var eventInfo = req.body.eventInfo;

    insertEvent(eventInfo, function(err, eventId){
      console.log(eventId)
      if(err){
        res.send(404)
      }
      insertPoll(eventId[0]['id'], pollInfo, function(err, pollId){
        if(err){
          res.send(404)
        }
        for(var i = 0;i<pollInfo.emails.length;i++){
          insertEmail(pollInfo.emails[i], i, pollId[pollId.length-1]['id'], function(err, emailId, i){
            if(err){
              res.send(404)
            }

            var emailObj = {
              to: pollInfo.emails[i],
              user: 'RICHARD',
              eventInfo: eventInfo,
              othersInvited: pollInfo.emails.slice(0,i).concat(pollInfo.emails.slice(i+1))
            }

            request({
              uri: 'http://localhost:4568/jobs',
              headers: {'Content-type': 'application/json'},
              method: 'POST',
              body: JSON.stringify(emailObj)

            })

            if(i === pollInfo.emails.length - 1){

    
              res.send(200, 'ALL EMAILS INSERTED, POLL CREATION SUCCESS')
            }
          })
        }

      })

    })


    // var sendObj = {
    //   userid: userId,
    //   eventObj: eventObj
    // }
    //   res.send(sendObj)


    // add to event table
    // insertEvent(eventObj, function(err, eventId){
    //   // add to poll table
    //   insertPoll(eventId, userId, function(err, pollId){ 
    //   //don't yet know the num of participants because the emais have not been created
    //     if(err){
    //       throw err
    //     }
    //     res.send(pollId)
    //   });
      
    })

    
    
    // add to email table (including main user)
    // send out to email service

 // });

// ROUTE TO CALCULATE POLL STATUS
router.route('/polls/:id')
  .put(function(req, res){
    // updated poll count in poll table
      // if poll complete, send email to everyone
      // or send poll results to everyone as of now

  })





module.exports = router;
