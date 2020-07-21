const axios = require('axios');

const Poll = require('../../../models/Poll');

module.exports = {
  Query: {
    async getPolls(parent, { ip }, context) {

      // Check if already voted
      const userIp = await Poll.findOne({ ip });
      if (userIp) {
        try {
          const polls = {
            C1: Math.round(100 * (await Poll.find({ 'choice': '1' }).countDocuments() / await Poll.find().countDocuments())),
            C2: Math.round(100 * (await Poll.find({ 'choice': '2' }).countDocuments() / await Poll.find().countDocuments())),
            C3: Math.round(100 * (await Poll.find({ 'choice': '3' }).countDocuments() / await Poll.find().countDocuments())),
            C4: Math.round(100 * (await Poll.find({ 'choice': '4' }).countDocuments() / await Poll.find().countDocuments())),
            C5: Math.round(100 * (await Poll.find({ 'choice': '5' }).countDocuments() / await Poll.find().countDocuments())),
          };
          return polls;
        } catch (err) {
          throw new Error(err);
        }
      }

      return polls = { C1: 101, C2: 101, C3: 101, C4: 101, C5: 101 };
    },
  },
  Mutation: {
    async pollChoice(parent, { choice, ip }, context) {
      if (!choice || !ip) {
        throw new Error('Poll choice and ip required');
      }

      const newPoll = new Poll({
        choice,
        ip,
        createdAt: new Date().toISOString(),
      });

      const poll = await newPoll.save();

      const polls = {
        C1: Math.round(100 * (await Poll.find({ 'choice': '1' }).countDocuments() / await Poll.find().countDocuments())),
        C2: Math.round(100 * (await Poll.find({ 'choice': '2' }).countDocuments() / await Poll.find().countDocuments())),
        C3: Math.round(100 * (await Poll.find({ 'choice': '3' }).countDocuments() / await Poll.find().countDocuments())),
        C4: Math.round(100 * (await Poll.find({ 'choice': '4' }).countDocuments() / await Poll.find().countDocuments())),
        C5: Math.round(100 * (await Poll.find({ 'choice': '5' }).countDocuments() / await Poll.find().countDocuments())),
      };

      return polls
    },
  },
};
