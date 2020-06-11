// No dependencies

module.exports = {
  Query: {
    // Queries not needed since users retrieve game data from subscriptions (server memory not the database)
  },
  Mutation: {
    async blobsTick(parent, { blobsPos, foodsPos }, context) {
      if (!blobsPos || !foodsPos) {
        throw new Error('blobsPos and foodPos required');
      }

      const newTick = new Tick({
        blobsPos,
        foodsPos,
        tickTime: new Date().toISOString(),
      });

      const gameTick = await newTick.save();

      context.pubsub.publish('GAME_TICK', {
        gameTick: gameTick,
      });

      return blobsPos;
    },
  },
  Subscription: {
    gameTick: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator('GAME_TICK'),
    },
  },
};
