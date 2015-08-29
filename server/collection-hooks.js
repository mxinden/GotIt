/** When user is inactive, delete all his votes */
Presences.after.remove(function (userId, doc) {
  Votes.remove({author: doc.userId});
});
