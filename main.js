document.addEventListener("DOMContentLoaded", () => {
  const imageUrl = document.getElementById("imageUrl");
  const postText = document.getElementById("postText");
  const submitPost = document.getElementById("submit-post");

  const getPosts = async () => {
    const res = await fetch("https://68219a10259dad2655afc1c9.mockapi.io/post");
    const data = await res.json();
    dsipalyPosts(data);
  };

  //  Send a POST request to the API
  submitPost.addEventListener("click", async () => {
    const res = await fetch(
      "https://68219a10259dad2655afc1c9.mockapi.io/post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: imageUrl.value,
          text: postText.value,
          comment: [],
        }),
      }
    );
    getPosts();
  });

  function dsipalyPosts(posts) {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";
    const commentsDiv = document.createElement("div");
    const comeentUl = document.createElement("ul");
    posts.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.style.width = "150px";
      const title = document.createElement("h4");
      title.innerText = item.text;
      const commentLi = document.createElement("li");
      card.appendChild(img);
      card.appendChild(title);
      comeentUl.appendChild(commentLi);
      card.appendChild(comeentUl);
      container.appendChild(card);
    });
  }

  getPosts();
});
