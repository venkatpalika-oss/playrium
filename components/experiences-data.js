/**
 * Playrium — Shared Experience Metadata
 * Single source of truth for all experience pages.
 * Consumed by breadcrumb.js, related.js, navigation.js and schema.js.
 * Do not duplicate this data elsewhere — update here only.
 */
(function () {
  var EXPERIENCES = [
{"slug": "yut-relay", "title": "Yut Relay", "tagline": "Two runners. One clever journey.", "href": "yut-relay.html", "country": "South Korea", "flag": "🇰🇷", "accent": "#b8c8ed", "icon": "🎲", "tags": ["strategy"], "moods": ["mind"], "addedAt": "2026-10-12T12:10:00Z", "discovery": {"globe": true, "surprise": true, "featured": true, "dailyChallenge": false}},
{"slug": "gonggi-garden", "title": "Gonggi Garden", "tagline": "A little lift. A perfect handful.", "href": "gonggi-garden.html", "country": "South Korea", "flag": "🇰🇷", "accent": "#b8c8ed", "icon": "🪨", "tags": ["puzzle", "skill"], "moods": ["mind"], "addedAt": "2026-10-12T12:10:00Z", "discovery": {"globe": true, "surprise": true, "featured": true, "dailyChallenge": false}},
{"slug": "tuho-courtyard", "title": "Tuho Courtyard", "tagline": "Read the wind. Find the opening.", "href": "tuho-courtyard.html", "country": "South Korea", "flag": "🇰🇷", "accent": "#b8c8ed", "icon": "🏹", "tags": ["skill", "physics"], "moods": ["physics", "family"], "addedAt": "2026-10-12T12:10:00Z", "discovery": {"globe": true, "surprise": true, "featured": true, "dailyChallenge": false}},
{"slug": "ddakji-studio", "title": "Ddakji Studio", "tagline": "Find the corner. Turn the tile.", "href": "ddakji-studio.html", "country": "South Korea", "flag": "🇰🇷", "accent": "#b8c8ed", "icon": "◈", "tags": ["skill", "physics"], "moods": ["physics", "family"], "addedAt": "2026-10-12T12:10:00Z", "discovery": {"globe": true, "surprise": true, "featured": true, "dailyChallenge": false}},
{"slug": "jegi-sky", "title": "Jegi Sky", "tagline": "One more kick into the blue.", "href": "jegi-sky.html", "country": "South Korea", "flag": "🇰🇷", "accent": "#b8c8ed", "icon": "🪶", "tags": ["skill", "physics"], "moods": ["physics", "family"], "addedAt": "2026-10-12T12:10:00Z", "discovery": {"globe": true, "surprise": true, "featured": true, "dailyChallenge": false}},
{"slug": "peteca-rally", "title": "Peteca Rally", "tagline": "Find the flight. Keep it alive.", "href": "peteca-rally.html", "country": "Brazil", "flag": "🇧🇷", "accent": "#c7dd91", "icon": "🪶", "tags": ["skill", "physics"], "moods": ["physics", "family"], "addedAt": "2026-10-12T12:10:00Z", "discovery": {"globe": true, "surprise": true, "featured": true, "dailyChallenge": false}},
{"slug": "button-football", "title": "Button Football", "tagline": "Small discs. Big match moments.", "href": "button-football.html", "country": "Brazil", "flag": "🇧🇷", "accent": "#c7dd91", "icon": "⚽", "tags": ["skill", "physics"], "moods": ["physics", "family"], "addedAt": "2026-10-12T12:10:00Z", "discovery": {"globe": true, "surprise": true, "featured": true, "dailyChallenge": false}},
{"slug": "gude-circle", "title": "Gude Circle", "tagline": "Read the angles. Clear the circle.", "href": "gude-circle.html", "country": "Brazil", "flag": "🇧🇷", "accent": "#c7dd91", "icon": "🔵", "tags": ["skill", "physics"], "moods": ["physics", "family"], "addedAt": "2026-10-12T12:10:00Z", "discovery": {"globe": true, "surprise": true, "featured": true, "dailyChallenge": false}},
{"slug": "amarelinha-trail", "title": "Amarelinha Trail", "tagline": "Up to the sky. Back to the street.", "href": "amarelinha-trail.html", "country": "Brazil", "flag": "🇧🇷", "accent": "#c7dd91", "icon": "🔢", "tags": ["puzzle", "skill"], "moods": ["mind"], "addedAt": "2026-10-12T12:10:00Z", "discovery": {"globe": true, "surprise": true, "featured": true, "dailyChallenge": false}},
{"slug": "pipa-breeze", "title": "Pipa Breeze", "tagline": "Follow the breeze. Paint the sky.", "href": "pipa-breeze.html", "country": "Brazil", "flag": "🇧🇷", "accent": "#c7dd91", "icon": "🪁", "tags": ["skill", "physics"], "moods": ["physics", "family"], "addedAt": "2026-10-12T12:10:00Z", "discovery": {"globe": true, "surprise": true, "featured": true, "dailyChallenge": false}},
{"slug": "puli-meka", "title": "Puli Meka", "tagline": "Tigers hunt. Goats outthink.", "href": "puli-meka.html", "country": "India", "flag": "🇮🇳", "accent": "#b9dbc7", "icon": "🐯", "tags": ["strategy", "traditional"], "moods": ["mind"], "discovery": {"globe": true, "surprise": true, "featured": true, "dailyChallenge": false}},
{"slug": "fukuwarai", "title": "Fukuwarai", "tagline": "A face worth remembering.", "href": "fukuwarai.html", "country": "Japan", "flag": "🇯🇵", "accent": "#b9dbc7", "icon": "🎭", "tags": ["puzzle", "traditional"], "moods": ["mind", "family"], "discovery": {"globe": true, "surprise": true, "featured": true, "dailyChallenge": false}},
{"slug": "patintero", "title": "Patintero", "tagline": "Read the line. Find your opening.", "href": "patintero.html", "country": "Philippines", "flag": "🇵🇭", "accent": "#b9dbc7", "icon": "🏃", "tags": ["skill", "traditional"], "moods": ["physics", "family"], "discovery": {"globe": true, "surprise": true, "featured": true, "dailyChallenge": false}},
    {
      "slug": "gully-cricket",
      "title": "Gully Cricket™",
      "tagline": "Every Street Has A Legend.",
      "href": "gully-cricket.html",
      "country": "India",
      "flag": "🇮🇳",
      "accent": "#f0c14b",
      "icon": "🏏",
      "tags": ["traditional","skill","multiplayer"],
      "moods": ["family","physics"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "matka-mania",
      "title": "Matka Mania™",
      "tagline": "Balance. Race. Survive.",
      "href": "matka-mania.html",
      "country": "India",
      "flag": "🇮🇳",
      "accent": "#4fd6c4",
      "icon": "🏺",
      "tags": ["physics","skill"],
      "moods": ["physics"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "kancha-kings",
      "title": "Kancha Kings™",
      "tagline": "Aim. Shoot. Rule The Circle.",
      "href": "kancha-kings.html",
      "country": "India",
      "flag": "🇮🇳",
      "accent": "#e8a13c",
      "icon": "🔮",
      "tags": ["traditional","skill"],
      "moods": ["physics","family"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "balloon-bazaar",
      "title": "Balloon Bazaar™",
      "tagline": "Every Balloon Has A Surprise.",
      "href": "balloon-bazaar.html",
      "country": "India",
      "flag": "🇮🇳",
      "accent": "#ff6b5e",
      "icon": "🎈",
      "tags": ["funny","kids"],
      "moods": ["relax","satisfying","family"],
      "discovery": { "globe": true, "surprise": true, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "spend-crore",
      "title": "Spend ₹10,000 Crore™",
      "tagline": "Can You Spend It All?",
      "href": "spend-crore.html",
      "country": "India",
      "flag": "🇮🇳",
      "accent": "#f0c14b",
      "icon": "💰",
      "tags": ["strategy","educational"],
      "moods": ["mind"],
      "discovery": { "globe": true, "surprise": true, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "hydraulic-press-lab",
      "title": "Hydraulic Press Lab™",
      "tagline": "What Happens If You Crush It?",
      "href": "hydraulic-press-lab.html",
      "country": "India",
      "flag": "🇮🇳",
      "accent": "#9a97a8",
      "icon": "⚙️",
      "tags": ["physics","funny"],
      "moods": ["satisfying","physics"],
      "discovery": { "globe": true, "surprise": true, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "world-size-explorer",
      "title": "World Size Explorer™",
      "tagline": "The World Isn't What It Looks Like.",
      "href": "world-size-explorer.html",
      "country": "India",
      "flag": "🇮🇳",
      "accent": "#b4fff0",
      "icon": "🌍",
      "tags": ["educational","puzzle","nature"],
      "moods": ["mind"],
      "discovery": { "globe": true, "surprise": true, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "moksha-patam",
      "title": "Moksha Patam",
      "tagline": "Every Ladder Is Virtue. Every Snake Is Vice.",
      "href": "moksha-patam.html",
      "country": "India",
      "flag": "🇮🇳",
      "accent": "#138808",
      "icon": "🐍",
      "tags": ["traditional","strategy"],
      "moods": ["family","mind"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "pie-break",
      "title": "Pie Break",
      "tagline": "Ten Slices. One Ring. One Throw.",
      "href": "pie-break.html",
      "country": "India",
      "flag": "🇮🇳",
      "accent": "#e87a3c",
      "icon": "🥧",
      "tags": ["skill","puzzle"],
      "moods": ["mind","physics"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "seven-stones",
      "title": "Seven Stones",
      "tagline": "Knock It Down. Rebuild Before Time Runs Out.",
      "href": "seven-stones.html",
      "country": "India",
      "flag": "🇮🇳",
      "accent": "#9a97a8",
      "icon": "🪨",
      "tags": ["traditional","multiplayer"],
      "moods": ["family"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "stapu",
      "title": "Stapu",
      "tagline": "Toss. Hop. Master The Squares.",
      "href": "stapu.html",
      "country": "India",
      "flag": "🇮🇳",
      "accent": "#ff8fa3",
      "icon": "🔲",
      "tags": ["traditional","kids"],
      "moods": ["family"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "rangoli-maker",
      "title": "Rangoli Maker",
      "tagline": "Every Mark Mirrors Into Beauty.",
      "href": "rangoli-maker.html",
      "country": "India",
      "flag": "🇮🇳",
      "accent": "#ff8fa3",
      "icon": "🎨",
      "tags": ["festival","puzzle"],
      "moods": ["creative","relax"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "daruma-drop",
      "title": "Daruma Drop",
      "tagline": "One Perfect Hit Changes Everything.",
      "href": "daruma-drop.html",
      "country": "Japan",
      "flag": "🇯🇵",
      "accent": "#BC002D",
      "icon": "🎮",
      "tags": ["skill","physics"],
      "moods": ["physics","mind"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "goldfish-scoop",
      "title": "Goldfish Scoop",
      "tagline": "Kingyo Sukui — Scoop Before The Paper Tears.",
      "href": "goldfish-scoop.html",
      "country": "Japan",
      "flag": "🇯🇵",
      "accent": "#4fa8ff",
      "icon": "🐟",
      "tags": ["festival","skill","nature"],
      "moods": ["family","relax"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "sensu-spinner",
      "title": "Sensu Spinner",
      "tagline": "Flick. Fan. Flow.",
      "href": "sensu-spinner.html",
      "country": "Japan",
      "flag": "🇯🇵",
      "accent": "#ff8fa3",
      "icon": "🪭",
      "tags": ["physics","kids"],
      "moods": ["physics","satisfying"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "koinobori-festival",
      "title": "Koinobori Festival",
      "tagline": "Ride The Wind. Race The Sky.",
      "href": "koinobori-festival.html",
      "country": "Japan",
      "flag": "🇯🇵",
      "accent": "#4fd6c4",
      "icon": "🎏",
      "tags": ["festival","physics","nature"],
      "moods": ["relax","physics"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "sungka-streak",
      "title": "Sungka Streak",
      "tagline": "Time The Sow. Fill The Store.",
      "href": "sungka-streak.html",
      "country": "Philippines",
      "flag": "🇵🇭",
      "accent": "#0038A8",
      "icon": "🐚",
      "tags": ["traditional","strategy"],
      "moods": ["mind"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "tinikling-tempo",
      "title": "Tinikling Tempo",
      "tagline": "Hop Between The Clapping Poles.",
      "href": "tinikling-tempo.html",
      "country": "Philippines",
      "flag": "🇵🇭",
      "accent": "#f0c14b",
      "icon": "🎋",
      "tags": ["traditional","skill"],
      "moods": ["physics","family"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "parol-glow",
      "title": "Parol Glow",
      "tagline": "Spark The Star Lantern Alight.",
      "href": "parol-glow.html",
      "country": "Philippines",
      "flag": "🇵🇭",
      "accent": "#f0c14b",
      "icon": "⭐",
      "tags": ["festival","kids"],
      "moods": ["creative","relax"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "jeepney-jam",
      "title": "Jeepney Jam",
      "tagline": "Weave The Streets. Stack The Fares.",
      "href": "jeepney-jam.html",
      "country": "Philippines",
      "flag": "🇵🇭",
      "accent": "#ff6b5e",
      "icon": "🚌",
      "tags": ["skill","strategy"],
      "moods": ["mind"],
      "discovery": { "globe": true, "surprise": false, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "zen-ripple",
      "title": "Zen Ripple",
      "tagline": "Touch The Water. Watch It Come Alive.",
      "href": "zen-ripple.html",
      "country": null,
      "flag": "",
      "accent": "#4fd6c4",
      "icon": "🌊",
      "tags": ["physics","nature"],
      "moods": ["relax","satisfying"],
      "discovery": { "globe": false, "surprise": true, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "gravity-playground",
      "title": "Gravity Playground™",
      "tagline": "Change Gravity. Change Reality.",
      "href": "gravity-playground.html",
      "country": null,
      "flag": "",
      "accent": "#f0c14b",
      "icon": "🌪️",
      "tags": ["physics","sandbox","relaxing"],
      "moods": ["relax","experimental","physics"],
      "discovery": { "globe": false, "surprise": true, "featured": true, "dailyChallenge": true }
    },
    {
      "slug": "cloud-painter",
      "title": "Cloud Painter™",
      "tagline": "Draw The Sky. Watch Nature Paint The Rest.",
      "href": "cloud-painter.html",
      "country": null,
      "flag": "",
      "accent": "#7fd8ff",
      "icon": "☁️",
      "tags": ["relaxing","creative","nature"],
      "moods": ["relax","creative","satisfying"],
      "discovery": { "globe": false, "surprise": true, "featured": true, "dailyChallenge": true }
    }
    ];

 var HUBS = [
{title:'South Korea Collection',href:'south-korea.html',country:'South Korea',flag:'🇰🇷'},
{title:'Brazil Collection',href:'brazil.html',country:'Brazil',flag:'🇧🇷'},
   { title: 'India Collection', href: 'india.html', country: 'India', flag: '🇮🇳' },
   { title: 'Japan Collection', href: 'japan.html', country: 'Japan', flag: '🇯🇵' },
   { title: 'Philippines Collection', href: 'philippines.html', country: 'Philippines', flag: '🇵🇭' }
   ];

 var HOME = { title: 'Playrium', href: 'index.html' };

 var ORIGINALS_HUB = { title: 'Playrium Originals', href: 'index.html#originals-panel', country: null, flag: '✨' };

 window.PLAYRIUM_EXPERIENCES = EXPERIENCES;
  window.PLAYRIUM_HUBS = HUBS;
  window.PLAYRIUM_HOME = HOME;
  window.PLAYRIUM_ORIGINALS_HUB = ORIGINALS_HUB;

 window.PLAYRIUM_getExperience = function (slug) {
   for (var i = 0; i < EXPERIENCES.length; i++) {
     if (EXPERIENCES[i].slug === slug) return EXPERIENCES[i];
   }
   return null;
 };

 window.PLAYRIUM_getHub = function (country) {
   if (country == null) return ORIGINALS_HUB;
   for (var i = 0; i < HUBS.length; i++) {
     if (HUBS[i].country === country) return HUBS[i];
   }
   return null;
 };

 window.PLAYRIUM_isRelax = function (exp) {
   if (!exp || !exp.moods) return false;
   return exp.moods.indexOf('relax') > -1 || exp.moods.indexOf('satisfying') > -1;
 };
})();
