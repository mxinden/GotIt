App = {};

"use strict";

/* as the navbar poisition is fixed, the page content needs to be
 * pulled down when the navbar gets higher (on resize or when the title is edited) */
App.updateNavbarCSS = function() {
  var navbarHeight, columnLectureCodeHeight, columnLectureCodeMargin,
    lectureCodeNavbarHeight, bodyPaddingTop;

  // reset the margin of the column to calculate proper dimensions
  $('#col-show-lecture-code').css('margin-top', '0');

  navbarHeight = $('#lecture-page-header').height();
  columnLectureCodeHeight = $('#col-show-lecture-code').height();
  lectureCodeNavbarHeight = 0;

  if (Session.get('lecturePage.isLectureCodeVisible')) {
    lectureCodeNavbarHeight = $('#lecture-page-navbar-lecture-code').height();
  }

  bodyPaddingTop = navbarHeight + lectureCodeNavbarHeight + 12;
  columnLectureCodeMargin = navbarHeight - columnLectureCodeHeight;

  $('#lecture-page-navbar-lecture-code').css('top', navbarHeight + 'px');
  $('#col-show-lecture-code').css('margin-top', columnLectureCodeMargin + 'px');
  $('body').css('padding-top', bodyPaddingTop + 'px');
};
