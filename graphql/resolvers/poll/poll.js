const axios = require('axios');

const Poll = require('../../../models/Poll');

module.exports = {
  Query: {
    async getPolls() {

      const clientDetails = await axios.get('https://www.cloudflare.com/cdn-cgi/trace').then((res) => res.data)
      const ipStart = clientDetails.search('ip') + 3
      const ipEnd = clientDetails.search('ts') - 1
      const ip = clientDetails.substr(ipStart, ipEnd - ipStart);

      // Check if already voted
      const userIp = await Poll.findOne({ ip });
      if (userIp) {
        try {
          // const polls = await Poll.find()
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
    async pollChoice(parent, { choice }, context) {
      if (!choice) {
        throw new Error('Poll choice required');
      }

      const clientDetails = await axios.get('https://www.cloudflare.com/cdn-cgi/trace').then((res) => res.data)
      const ipStart = clientDetails.search('ip') + 3
      const ipEnd = clientDetails.search('ts') - 1
      const ip = clientDetails.substr(ipStart, ipEnd - ipStart);

      const newPoll = new Poll({
        choice,
        ip
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
