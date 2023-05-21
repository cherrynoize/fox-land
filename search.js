var search = document.getElementById("search");
var help = document.getElementById("search-help");
var icon = document.getElementById("search-icon");
var form = document.getElementById("search-form");

var commands = [
  {
    command: "",
    label: "Google",
    icon: "fa fa-google",
    url: "https://www.google.com/search?q="
  },
  {
    command: "/a",
    label: "Amazon",
    icon: "fa fa-amazon",
    url: "https://www.amazon.com/s/field-keywords="
  },
  {
    command: "/d",
    label: "DuckDuckGo",
    icon: "fa fa-ban",
    url: "https://duckduckgo.com/?q="
  },
  {
    command: "/f",
    label: "Facebook",
    icon: "fa fa-facebook",
    url: "https://www.facebook.com/search/top/?q="
  },
  {
    command: "/t",
    label: "Twitter",
    icon: "fa fa-twitter",
    url: "https://twitter.com/search?q="
  },
  {
    command: "/r",
    label: "Reddit",
    icon: "fa fa-reddit-alien",
    url: "https://www.reddit.com/search?sort=relevance&t=all&q="
  },
  {
    command: "/w",
    label: "Wikipedia",
    icon: "fa fa-wikipedia-w",
    url: "http://en.wikipedia.org/wiki/Special:Search/"
  },
  {
    command: "/y",
    label: "YouTube",
    icon: "fa fa-youtube-play",
    url: "https://www.youtube.com/results?search_query="
  },
];

var command = commands[0];

function setCommand(value) {
  for (var i = 0; i < commands.length; i++) {
    if (value == commands[i].command) {
      command = commands[i];
      icon.className = command.icon;
      search.value = "";
      form.setAttribute("action", command.url);
      break;
    }
  }
}

if (search) {
  search.addEventListener("keyup", function(e) {
    var value = search.value;

    if (e.keyCode == 13 || e.which == 13) {
      if (value.indexOf(".") > 0) {
        window.location.href = "http://" + encodeURIComponent(value);
      } else {
        window.location.href = command.url + encodeURIComponent(value);
      }
    } else if (value[0] == "/" &&
               (value[value.length - 1] == " "
             || e.keyCode == 9)) {
      value = value.trim();
      // set new command
      setCommand(value);
    } else if (value.indexOf("/") == 0 && value.length <= 2) {
      help.style.opacity = 1;
      help.style["max-height"] = "50vh";
    }
  });

  search.addEventListener("keydown", function(e) {
    var value = search.value;
    var key = e.keyCode || e.which;

    if (key == 0 || key == 229) {
      // android keycode fix
      key = isBackspace(value) ? 8 : 0;
    }

    help.style.opacity = 0;
    help.style["max-height"] = "20px";

    if (key == 8 || key == 27) { // backspace or esc is pressed
      // empty or /? search box
      if ((value == "" && command.icon != commands[0].icon)
          || (value == "/?") && key == 27) {
        // reset default command
        command = commands[0];
        icon.className = command.icon;
        search.value = "";
        form.setAttribute("action", command.url);
      }
    } else if (key == 9) {
      // lock tab in search bar
      e.preventDefault();
    }
  });
}

/* Fix for Android keycode 229 issue */
var prevWord = "";
function isBackspace(val) {
  var bool = val && val.length < prevWord.length;
  prevWord = val;
  return bool;
}

if (help) {
  // initialize help
  help.innerHTML = "";

  // populate help
  for (var i = 0; i < commands.length; i++) {
    const c = commands[i];
    if (c.command.length > 0) {
      help.innerHTML += "<li id='help-li-" + c.label + "'><span><span class='icon " + c.icon + "'></span>"
                      + "<span class='command'>" + c.command + "</span></span></li>";
    }
  }

  // set help item listeners
  for (var i = 0; i < commands.length; i++) {
    const c = commands[i];
    if (c.command.length > 0) {
      document.getElementById("help-li-" + c.label).addEventListener('click', function() {
        // set command on help item click
        setCommand(c.command);
      });
    }
  }
}
