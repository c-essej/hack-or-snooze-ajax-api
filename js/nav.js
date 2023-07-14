"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */


const $favoritedStories = $('#favorited-stories');
const $navBarFavorites = $('#nav-favorites');
const $star = $('.star');

//missing docstring

function navBarSubmitClick(evt) {
  evt.preventDefault();
  hidePageComponents(); //TODO: maybe you dont need it
  $allStoriesList.show();
  $submitForm.show();

}

$navSubmitStory.on('click', navBarSubmitClick);


/** Show main list of all stories when click site name */
function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();

}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


function showFavoriteList(){


  if (currentUser.favorites.length === 0){
    $favoritedStories.append(`<h3>No favorites added </h3>`)

  } else {
    for (let story of currentUser.favorites){
      const stories = generateStoryMarkup(story)
      $favoritedStories.append(stories);
    }
  }
  $favoritedStories.show();
}



function navFavoriteClick(evt){
  evt.preventDefault();
  hidePageComponents();
  showFavoriteList();
}

$navBarFavorites.on('click', navFavoriteClick);


