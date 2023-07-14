"use strict";


// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

//returns long string of html,
function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Get values of author,title,url, send data to API and prepends the info to the story list
 */
//be more descriptive in docstring
//where the values are coming from
async function submitStoryAndPutOnPage(evt) {
  evt.preventDefault();
  const author = $('#create-author').val();
  const title = $('#create-title').val();
  const url = $('#create-url').val();
  //change variable name newstoryinstance or something
  const response = await storyList.addStory(currentUser, { author, title, url }); // storyList INstance
  //
  const $response = generateStoryMarkup(response);
  $allStoriesList.prepend($response);
}

$submitForm.on('submit', submitStoryAndPutOnPage);

function isFavorite(story){
  for (let i = 0; i < this.favorites; i++){
    if (this.favorites[i].storyId === story.storyId){
      return true;
    }
  }
}

function toggleStars(user, story){
  const isAFavorite = user.isFavorite(story);
  const star = isAFavorite ? "fill" : "" ;
  return `<span class="star">
  <i class="bi bi-star-fill"> </i>
  </span>`
}