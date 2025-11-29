export const commentResolvers = {
  Query: {
    comments: () => [],
    comment: () => null,
  },

  Mutation: {
    addComment: () => null,
    updateComment: () => null,
    deleteComment: () => false,
    restoreComment: () => null,
  },

  Subscription: {
    commentAdded: {
      subscribe: () => ({
        [Symbol.asyncIterator]: () => ({
          next: () => Promise.resolve({ value: {}, done: false })
        })
      })
    }
  },
};