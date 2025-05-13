document.addEventListener("DOMContentLoaded", () => {
  let username = document.getElementById("username-input");
  let password = document.getElementById("password-input");
  let confirmPassword = document.getElementById("confirm-password");
  let signUpBtn = document.getElementById("signUp-btn");

  const createUser = async () => {
    try {
      console.log(username.value);
      const userRes = await fetch(
        "https://68219a10259dad2655afc1c9.mockapi.io/login"
      );
      const userData = await userRes.json();
      // Validate user input
      if (userData.find((user) => user.username === username.value))
        return alert("This username is already taken.");
      if (confirmPassword.value != password.value)
        return alert("Passwords do not match.");

      // POST request to create user
      const res = await fetch(
        "https://68219a10259dad2655afc1c9.mockapi.io/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        }
      );
      alert("You signed in successfully!");
      window.location.href = "/login.html";
    } catch (error) {
      console.log("Error:", error);
    }
  };

  signUpBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    createUser();
  });
});
