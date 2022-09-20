$(document).ready(function(){

  var skills = $('#horizontal-list');

  skills.delegate('img.inactive','click',function(){
    skills.find('.active').toggleClass('active inactive');
    $(this).toggleClass('active inactive');
  });

});
