Template.lecturePage.helpers({

  questions: function() {
    var questions =  Questions.find({lectureCode: this.lectureCode}).fetch();

    _.each(questions, function(question) {
      var amountVotes = Votes.find({questionId: question._id}).count();
      question.amountVotes = amountVotes;
    });

    questions.sort(function(a,b) {
      return b.amountVotes - a.amountVotes;
    });

    return questions;
  },

});

Template.lecturePage.rendered = function() {
  this.find('.animated')._uihooks = {
    insertElement: function (node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },
    moveElement: function (node, next) {
      console.log("moved");
      var $node = $(node), $next = $(next);
      var oldTop = $node.offset().top;
      var height = $(node).outerHeight(true);

      // find all the elements between next and node
      var $inBetween = $(next).nextUntil(node);
      if ($inBetween.length === 0)
        $inBetween = $(node).nextUntil(next);

      // now put node in place
      $(node).insertBefore(next);

      // measure new top
      var newTop = $(node).offset().top;

      // move node *back* to where it was before
      $(node)
        .removeClass('animate')
        .css('top', oldTop - newTop);

      // push every other element down (or up) to put them back
      $inBetween
        .removeClass('animate')
        .css('top', oldTop < newTop ? height : -1 * height);


      // force a redraw
      $(node).offset();

      // reset everything to 0, animated
      $(node).addClass('animate').css('top', 0);
      $inBetween.addClass('animate').css('top', 0);
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        $(this).remove();
      });
    }
  };
};
