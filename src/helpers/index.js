import $ from "jquery";

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

export const inializeHeaderDropDown = () => {
  /*--------------------------------------------------*/
  /*  Notification Dropdowns
	  /*--------------------------------------------------*/
  $(".header-notifications").each(function () {
    console.log("'jquery'");
    var userMenu = $(this);
    var userMenuTrigger = $(this).find(".header-notifications-trigger a");

    $(userMenuTrigger).on("click", function (event) {
      event.preventDefault();

      if ($(this).closest(".header-notifications").is(".active")) {
        close_user_dropdown();
      } else {
        close_user_dropdown();
        userMenu.addClass("active");
      }
    });
  });

  // Closing function
  function close_user_dropdown() {
    $(".header-notifications").removeClass("active");
  }

  // Closes notification dropdown on click outside the conatainer
  var mouse_is_inside = false;

  $(".header-notifications").on("mouseenter", function () {
    mouse_is_inside = true;
  });
  $(".header-notifications").on("mouseleave", function () {
    mouse_is_inside = false;
  });

  $("body").mouseup(function () {
    if (!mouse_is_inside) close_user_dropdown();
  });

  // Close with ESC
  $(document).keyup(function (e) {
    if (e.keyCode == 27) {
      close_user_dropdown();
    }
  });
};
