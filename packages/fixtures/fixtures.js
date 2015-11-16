
Fixtures = {
  clearDB: function(callback) {
    Meteor.call('clearDB', callback);
  },
  createLecture: function(changes, callback) {
    Meteor.call('createLecture', changes, callback);
  },
  createQuestion: function(changes, callback) {
    Meteor.call('createQuestion', changes, callback);
  },
  createVote: function(changes, callback) {
    Meteor.call('createVote', changes, callback);
  },
  createUser: function(changes) {
    Meteor.call('createTestUser', changes, callback);
  }
};


if (Meteor.isServer) {
  Meteor.methods({
    'createTestUser': function(changes) {
      var user = {
        _id: '00000000000000000',
        createdAt: new Date()
      };
      _.extend(user, changes);
      userId = Users.insert(user);
      return userId;
    },

    'createLecture': function(changes) {
      var lecture = {
        lectureCode: '00000',
        title: 'Example lecture title',
        author: '00000000000000000',
        members: []
      };
      _.extend(lecture, changes);
      Lectures.insert(lecture);
      return lecture.lectureCode;
    },

    'createQuestion': function(changes) {
      var question = {
        _id: '00000000000000000',
        lectureCode: '00000',
        questionText: 'Example question text',
        author: '00000000000000000',
        submited: new Date()
      };
      _.extend(question, changes);
      questionId = Questions.insert(question);
      return questionId;
    },

    'createVote': function(changes) {
      var vote = {
        _id: '00000000000000000',
        questionId: '00000000000000000',
        lectureCode: '00000',
        author: '00000000000000000'
      };
      _.extend(vote, changes);
      voteId = Votes.insert(vote);
    },

    'clearDB': function() {
      Lectures.remove({});
      Questions.remove({});
      Votes.remove({});
    }
  });
}
