document.addEventListener("DOMContentLoaded", () => {
  const logOutBtn = document.getElementById("logout-link");
  const imageUrl = document.getElementById("imageUrl");
  const postText = document.getElementById("postText");
  const postForm = document.getElementById("post-form");

  // Display the right btn in navbar
  if (localStorage.getItem("username")) {
    document.getElementById("logout-link").className =
      "d-flex btn btn-outline-danger";
  } else {
    document.getElementById("login-link").className = "d-flex btn btn-success";
  }

  // Log user out
  logOutBtn.onclick = () => {
    localStorage.removeItem("username");
    window.location.reload();
  };

  const delPosts = async (postId) => {
    if ((window, confirm("Are you sure you want to delete this post?"))) {
      const res = await fetch(
        `https://68219a10259dad2655afc1c9.mockapi.io/post/${postId}`,
        {
          method: "DELETE",
        }
      );
      getPosts();
    }
  };

  const delCmnt = async (post, index) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;

    const updatedCmnts = post.comment.filter((_, i) => i !== index);

    const res = await fetch(
      `https://68219a10259dad2655afc1c9.mockapi.io/post/${post.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...post,
          comment: updatedCmnts,
        }),
      }
    );
    getPosts();
  };

  const renderPosts = (posts) => {
    const container = document.getElementById("posts-container");

    // Reset
    container.innerHTML = "";

    posts.reverse().forEach((post) => {
      const outerDiv = document.createElement("div");
      const card = document.createElement("div");
      const username = document.createElement("h4");
      const img = document.createElement("img");
      const title = document.createElement("h4");
      const postBody = document.createElement("div");
      const postText = document.createElement("p");
      const deleteBtn = document.createElement("button");
      const commentsDiv = document.createElement("div");
      const comInput = document.createElement("input");
      const sendCom = document.createElement("button");
      const comList = document.createElement("ul");
      const addComDiv = document.createElement("div");


  // Disable comment if user is not logged in
   sendCom.disabled = localStorage.getItem("username") ? false : true ;
   comInput.placeholder = localStorage.getItem("username") ? "Type a comment...." : "Sign in to send a comment" ;

      outerDiv.classList.add("col-12", "col-md-6", "mb-4");
      commentsDiv.classList.add("col-md-4", "com-div");
      addComDiv.classList.add("add-com-div");
      addComDiv.appendChild(comInput);
      addComDiv.appendChild(sendCom);
      comList.classList.add("mt-5", "list-unstyled");
      comInput.classList.add("com-input", "px-3");
      sendCom.classList.add("btn", "text-white", "send-com");
      sendCom.style.backgroundColor = "rgba(79, 70, 118, 0.908)";
      card.classList.add("card", "p-3");
      username.classList.add("card-title", "post-username");
      img.classList.add("card-img-top", "my-3");
      title.classList.add("card-title");
      postBody.classList.add("card-body");
      postText.classList.add("card-text");
      commentsDiv.classList.add("mb-4");
      deleteBtn.classList.add("btn", "btn-outline-danger");
      username.innerText = post.username;
      img.src = post.imageUrl;
      title.innerText = post.text;

      sendCom.innerText = "Send";
      deleteBtn.innerText = "Delete";
      const renderCmnts = () => {
        comList.innerText = "";
        post.comment.map((cmnt, index) => {
          const cmntLi = document.createElement("li");
          const cmntUser = document.createElement("h3");
          const cmntContent = document.createElement("h4");
          const delCmntBtn = document.createElement("button");
          const innerComDiv = document.createElement("div");
          innerComDiv.classList.add(
            "inner-com-div",
            "d-flex",
            "justify-content-between"
          );
          innerComDiv.appendChild(cmntContent);

          delCmntBtn.classList.add("btn", "btn-outline-danger");
          delCmntBtn.innerText = "Delete";
          cmntUser.innerText = cmnt.username;
          cmntContent.innerText = cmnt.comText;

          cmntLi.classList.add("border", "p-3", "m-2", "bg-white");

          cmntLi.appendChild(cmntUser);
          cmntLi.appendChild(innerComDiv);
          comList.appendChild(cmntLi);

          if (localStorage.getItem("username") === cmnt.username) {
            innerComDiv.appendChild(delCmntBtn);
            delCmntBtn.onclick = () => delCmnt(post, index);
          }
        });
      };
      renderCmnts();
      postBody.appendChild(postText);
      postBody.appendChild(deleteBtn);
      card.appendChild(username);
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(postBody);
      outerDiv.appendChild(card);
      commentsDiv.appendChild(addComDiv);

      commentsDiv.appendChild(comList);
      container.appendChild(outerDiv);
      container.appendChild(commentsDiv);

      // Handle add comment
      sendCom.onclick = async () => {
        const res = await fetch(
          `https://68219a10259dad2655afc1c9.mockapi.io/post/${post.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...post,
              comment: [
                ...post.comment,
                {
                  username: localStorage.getItem("username"),
                  comText: comInput.value,
                },
              ],
            }),
          }
        );

        const updatedPost = await res.json();
        post.comment = updatedPost.comment;
        renderCmnts();
      };

      // Handle post delete
      deleteBtn.onclick = () => delPosts(post.id);
      if (post.username === localStorage.getItem("username")) {
        deleteBtn.style.display = "inline-block";
      } else {
        deleteBtn.style.display = "none";
      }
    });
  };

  const getPosts = async () => {
    const res = await fetch("https://68219a10259dad2655afc1c9.mockapi.io/post");
    const posts = await res.json();
    renderPosts(posts);
  };

  //  Create a new post
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://68219a10259dad2655afc1c9.mockapi.io/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: localStorage.getItem("username"),
            imageUrl: imageUrl.value,
            text: postText.value,
            comment: [],
          }),
        }
      );
      getPosts();
    } catch (err) {
      console.error(err);
    }
  });
  getPosts();
});
