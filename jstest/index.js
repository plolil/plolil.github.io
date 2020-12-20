window.addEventListener('load', function() {
  document.body.innerHTML = "<div id="main"></div>";
  const main = document.getElementById("main");
  const form = document.createElement("form");
  const textbox = document.createElement("input")
  textbox.type = "text";
  form.id = "theform";
  form.appendChild(textbox);
});
