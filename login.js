document.addEventListener("DOMContentLoaded", () => {
  let username = document.getElementById("username-input");
  let password = document.getElementById("password-input");
  let signInBtn = document.getElementById("signIn-btn");

  const login = async () => {
    try {
      const res = await fetch(
        "https://68219a10259dad2655afc1c9.mockapi.io/login"
      );
      const users = await res.json();
      const userExist = users.find(
        (user) =>
          user.username === username.value && user.password === password.value
      );
      if (userExist) {
        localStorage.setItem("username", userExist.username);
        alert("You have successfully logged in!");
        window.location.href = "/posts-project/index.html";
      } else {
        alert("Invalid username or password.");
      }
    } catch (err) {
      console.error("error login", err);
    }
  };

  signInBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    login();
  });
});
