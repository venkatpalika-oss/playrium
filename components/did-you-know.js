/**
 * Playrium — "Did You Know?" Fact Panel Component
 * Requires: no dependencies (facts are self-contained in this file).
 * Reads: window.PAGE_META = { slug: '...' }
 * Optional mount point: <div id="pr-did-you-know"></div> (auto-created before end of <body> if absent)
 * Part of the shared experience-page layout described in issue #12.
 */
(function () {
  var FACTS = {
    'gully-cricket': "Gully cricket is played in narrow lanes and streets across India with improvised local rules, and it has been the starting point for many players who went on to play professionally.",
    'matka-mania': "The matka (clay pot) has traditionally been used across India to store and cool drinking water, since the porous clay lets a small amount of water evaporate through its walls and cool the rest.",
    'kancha-kings': "Marble games like kancha are among the oldest children's games in the world — archaeologists have found marbles used for play in ancient Egyptian and Roman sites.",
    'balloon-bazaar': "The modern rubber balloon was invented in 1824 by the scientist Michael Faraday, who made them to experiment with hydrogen gas.",
    'spend-crore': "In the Indian numbering system, one crore equals 10 million, so ₹10,000 crore works out to ₹100 billion.",
    'hydraulic-press-lab': "Hydraulic presses work on Pascal's principle: pressure applied to a confined fluid is transmitted equally in every direction, letting a small force produce a much larger one.",
    'world-size-explorer': "Many familiar world maps use the Mercator projection, which distorts size near the poles — it makes Greenland look roughly as large as Africa, even though Africa is about 14 times bigger.",
    'moksha-patam': "Moksha Patam is the original Indian game that evolved into \"Snakes and Ladders\" — ladders represented virtues and snakes represented vices, teaching a lesson about karma.",
    'pie-break': "The pie chart, the inspiration behind slicing up a circle into shares, was first used by the Scottish engineer William Playfair in 1801.",
    'seven-stones': "Seven Stones (also called Pittu or Lagori in parts of South Asia) has players stack flat stones into a tower, knock it down with a ball, then race to rebuild it before being tagged out.",
    'stapu': "Stapu is the Indian name for hopscotch, a game whose long courses are believed to date back to footwork drills used by Roman soldiers in training.",
    'rangoli-maker': "Rangoli patterns are traditionally drawn at the entrance of Indian homes during festivals like Diwali using colored powder, rice, or flower petals, and are believed to welcome good fortune.",
    'daruma-drop': "Daruma Otoshi is a traditional Japanese game where players hammer out stacked wooden blocks one at a time without letting the Daruma doll balanced on top topple over.",
    'goldfish-scoop': "Kingyo-sukui (goldfish scooping) is a favorite game at Japanese summer festivals, played with a fragile paper-covered scoop called a poi that weakens the moment it touches water.",
    'sensu-spinner': "The sensu (folding fan) took shape in Japan around the 6th-7th century, evolving from earlier Chinese fan designs, and became central to traditional dance and tea ceremonies.",
    'koinobori-festival': "Koinobori, the carp-shaped streamers flown in Japan for Children's Day on May 5th, symbolize strength and perseverance because carp are known for swimming upstream against the current.",
    'sungka-streak': "Sungka is a traditional Filipino mancala game played on a boat-shaped wooden board using shells or seeds as counters — mancala-style games are among the oldest known board games in the world.",
    'tinikling-tempo': "Tinikling, the Philippine folk dance this game is inspired by, mimics the movement of the tikling bird dodging bamboo traps, with dancers stepping between two clapping bamboo poles.",
    'parol-glow': "The parol, a star-shaped lantern, is a well-known symbol of the Philippine Christmas season, said to represent the Star of Bethlehem that guided the Three Wise Men.",
    'jeepney-jam': "The jeepney, one of the most recognizable sights on Philippine roads, was originally built from surplus US military jeeps left behind after World War II.",
    'zen-ripple': "Traditional Japanese zen gardens often use raked gravel to represent rippling water, a practice thought to support meditation and calm focus.",
    'gravity-playground': "Ignoring air resistance, gravity accelerates every falling object at the same rate — about 9.8 m/s\u00b2 on Earth — regardless of how much it weighs, as Galileo famously demonstrated.",
    'cloud-painter': "Clouds form when water vapor condenses around tiny particles in the air; the altitude and shape of that condensation gives rise to distinct types such as cumulus, stratus, and cirrus clouds."
  };

  function injectStyle() {
    if (document.getElementById('pr-dyk-style')) return;
    var css = '.pr-dyk{max-width:1200px;margin:0 auto;padding:1rem 1.5rem 0;font-family:var(--font-display,system-ui,sans-serif);}'
      + '.pr-dyk-card{display:flex;gap:1rem;align-items:flex-start;border-radius:1.2rem;padding:1.2rem 1.4rem;'
      + 'background:rgba(244,240,230,.06);border:1px solid rgba(244,240,230,.14);color:var(--chalk,#f4f0e6);}'
      + '.pr-dyk-icon{font-size:1.6rem;line-height:1;flex-shrink:0;}'
      + '.pr-dyk-text{margin:0;line-height:1.5;font-size:.98rem;}'
      + '.pr-dyk-text strong{color:var(--chalk,#f4f0e6);}';
    var style = document.createElement('style');
    style.id = 'pr-dyk-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function getMount() {
    var el = document.getElementById('pr-did-you-know');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'pr-did-you-know';
    document.body.appendChild(el);
    return el;
  }

  function render() {
    var meta = window.PAGE_META || {};
    var fact = FACTS[meta.slug];
    if (!fact) return;
    injectStyle();
    var mount = getMount();
    mount.className = 'pr-dyk';
    mount.innerHTML = '<div class="pr-dyk-card"><span class="pr-dyk-icon" aria-hidden="true">💡</span>'
      + '<p class="pr-dyk-text"><strong>Did you know?</strong> ' + fact + '</p></div>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
