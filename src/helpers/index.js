import $ from "jquery";

export const getCustomJs = () => {
  if (!document.getElementById("customJs")) {
    let customScript = document.createElement("script");
    customScript.setAttribute("src", "/assets/js/custom.js");
    customScript.setAttribute("type", "text/javascript");
    customScript.setAttribute("id", "customJs");
    document.body.appendChild(customScript);
  } else {
    let customScript = document.getElementById("customJs");
    let backtotop = document.getElementById("backtotop");
    if (customScript) document.body.removeChild(customScript);
    if (backtotop) document.body.removeChild(backtotop);
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
    var userMenu = $(this);
    var userMenuTrigger = $(this).find(".header-notifications-trigger a");

    $(userMenuTrigger).on("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

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

// Avatar Switcher
export const avatarSwitcher = () => {
  var readURL = function (input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(".profile-pic").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  $(".file-upload").on("change", function () {
    readURL(this);
  });

  $(".upload-button").on("click", function () {
    $(".file-upload").click();
  });
};

export const getTimeLeft = (job) => {
  if (job) {
    const { assignedAt, completesAt } = job;
    const diffMilliseconds = new Date(completesAt) - new Date(assignedAt);
    const daysLetf = Math.trunc(diffMilliseconds / (1000 * 60 * 60 * 24));
    return {
      days: Math.abs(daysLetf),
      status:
        daysLetf > 0 ? (daysLetf > 3 ? "ON_TIME" : "DEADLINE_NEAR") : "LATE",
    };
  }
};
