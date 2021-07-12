export const getJquery = () => {
  if (!document.getElementById("customJs")) {
    let customScript = document.createElement("script");
    customScript.setAttribute("src", "/assets/js/custom.js");
    customScript.setAttribute("type", "text/javascript");
    customScript.setAttribute("id", "customJs");
    document.body.appendChild(customScript);
  } else {
    let customScript = document.getElementById("customJs");
    customScript = document.createElement("script");
    customScript.setAttribute("src", "/assets/js/custom.js");
    customScript.setAttribute("type", "text/javascript");
    customScript.setAttribute("id", "customJs");
    document.body.appendChild(customScript);
  }
};
