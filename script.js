const createPostBtn = document.getElementById("create-post-btn");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const postHeadingInput = document.getElementById("post-heading-input");
const postContentInput = document.getElementById("post-content-input");
const savePostBtn = document.getElementById("save-post-btn");
const postsContainer = document.getElementById("posts-container");
const cancelPostBtn = document.getElementById("cancel-post-btn");
crossPostBtn = document.getElementById("cross-post-btn");

// Function to create a new post element
function createPostElement(postHeading, postContent, timestamp) {
  const postElement = document.createElement("div");
  const postHeadingElement = document.createElement("h3");
  const postContentElement = document.createElement("p");
  const timestampElement = document.createElement("small");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  postHeadingElement.textContent = postHeading;
  postContentElement.textContent = postContent;
  timestampElement.textContent = timestamp;
  editBtn.textContent = "Edit Post";
  deleteBtn.textContent = "Delete Post";
  deleteBtn.classList="dbtn"
  editBtn.addEventListener("click", () => {
    // Show the popup and fill in the input fields with the current values
    showPopup();
    postHeadingInput.value = postHeading;
    postContentInput.value = postContent;
    savePostBtn.setAttribute("data-post-id", postElement.id);
    document.getElementById("popup-header").textContent = "Edit a post";
    document.getElementById("save-post-btn").textContent = "Save Post";
   

  });
  deleteBtn.addEventListener("click", () => {
    // Remove the post element from the DOM
    postsContainer.removeChild(postElement);
  });
  postElement.appendChild(postHeadingElement);
  postElement.appendChild(postContentElement);
  postElement.appendChild(timestampElement);
  postElement.appendChild(editBtn);
  postElement.appendChild(deleteBtn);
  postsContainer.appendChild(postElement);
  return postElement;
}

function showPopup() {
  overlay.style.display = "block";
  popup.style.display = "block";
}

function hidePopup() {
  overlay.style.display = "none";
  popup.style.display = "none";
}

createPostBtn.addEventListener("click", () => {
  // Show the popup when the button is clicked
  showPopup();
  document.getElementById("popup-header").textContent = "Create a post";

 
});

savePostBtn.addEventListener("click", () => {
  const postId = savePostBtn.getAttribute("data-post-id");
  const now = new Date();
  const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  if (postId) {
    // Update an existing post
    const postElement = document.getElementById(postId);
    const postHeading = postHeadingInput.value;
    const postContent = postContentInput.value;
    const postHeadingElement = postElement.querySelector("h3");
    const postContentElement = postElement.querySelector("p");
    postHeadingElement.textContent = postHeading;
    postContentElement.textContent = postContent;
    postElement.querySelector(".post-timestamp").textContent = `Last Edited at ${timestamp}`;
   
    

  } else {
    // Create a new post
    const postHeading = postHeadingInput.value;
    const postContent = postContentInput.value;
    const postElement = createPostElement(postHeading, postContent);
    postElement.id = `post-${postsContainer.children.length}`;
    const timestampElement = document.createElement("span");
    timestampElement.className = "post-timestamp";
    timestampElement.textContent = `Created at ${timestamp}`;
    postElement.appendChild(timestampElement);
    
  }

  // Hide the popup and reset the input values
  hidePopup();
  postHeadingInput.value = "";
  postContentInput.value = "";
  savePostBtn.removeAttribute("data-post-id");
});






cancelPostBtn.addEventListener("click", () => {
    // Hide the popup and reset the input values
    popup.style.display = "none";
    overlay.style.display = "none";
  });

crossPostBtn.addEventListener("click", () => {
    // Hide the popup and reset the input values
    popup.style.display = "none";
    overlay.style.display = "none";
    postHeadingInput.value = "";
    postContentInput.value = "";
    savePostBtn.removeAttribute("data-post-id");
  });

