window.FESTIVAL_CONFIG={
  id:'roskilde26',
  name:'ROSKILDE FESTIVAL 2026',
  location:'Roskilde · Denmark',
  startDate:'2026-06-27',
  dateRange:{zh:'6月27日—7月4日',zht:'6月27日—7月4日',es:'27 JUN–4 JUL',ca:'27 JUN–4 JUL',pt:'27 JUN–4 JUL',en:'JUN 27–JUL 4'},
  duration:{zh:'8 天',zht:'8 天',es:'8 días',ca:'8 dies',pt:'8 dias',en:'8 days'},
  faqUrl:'https://www.roskilde-festival.dk/',
  defaultDay:'sun',
  weatherLat:55.6150,weatherLon:12.0979,weatherTz:'Europe/Copenhagen',
  mapW:3508,mapH:2480,
};

var ST={
  "EOS":                    {color:"#FF8C00",e:"☀",s:"EOS"},
  "LAGUNE":                 {color:"#00CEC9",e:"◈",s:"LAGUNE"},
  "DANCEFLOOR":             {color:"#E84393",e:"♫",s:"FLOOR"},
  "SKATE":                  {color:"#95D544",e:"◎",s:"SKATE"},
  "STADION":                {color:"#38BDF8",e:"◈",s:"STAD."},
  "THE YARD":               {color:"#FB923C",e:"✺",s:"YARD"},
  "GROW":                   {color:"#4ADE80",e:"✦",s:"GROW"},
  "RE:ACT":                 {color:"#C084FC",e:"✊",s:"RE:ACT"},
  "CINEMA":                 {color:"#F87171",e:"▶",s:"CINEMA"},
  "REHEARSALS OF BELONGING":{color:"#FDA4AF",e:"◈",s:"R.O.B."},
  "THE LONG WAY AROUND":    {color:"#C4A35A",e:"🚶",s:"L.W.A."},
};
var HOTSPOTS={};

var DAYS=[
  {key:"sun",label:"Sun 6/28",date:"2026-06-28",sub:"day1",shows:[
    // ── 09:00 ──
    {time:"09:00",end:"09:45",stage:"STADION",              artist:"Flow Yoga",                             cat:"activity"},
    {time:"09:30",end:"10:15",stage:"THE YARD",             artist:"Morgenyoga",                            cat:"activity"},
    // ── 10:00 ──
    {time:"10:00",end:"11:00",stage:"STADION",              artist:"Go' Morgen Roskilde",                   cat:"activity"},
    {time:"10:00",end:"11:00",stage:"GROW",                 artist:"Wake Up with the Garden",               cat:"activity"},
    // ── 10:30 ──
    {time:"10:30",end:"11:30",stage:"THE YARD",             artist:"Taste with Your Senses",                cat:"activity"},
    {time:"10:30",end:"11:30",stage:"THE YARD",             artist:"Virtual Reality Experiment",            cat:"activity"},
    // ── 11:00 ──
    {time:"11:00",end:"12:00",stage:"SKATE",                artist:"The Global Piece for Peace Day",        cat:"art"},
    {time:"11:00",end:"12:30",stage:"DANCEFLOOR",           artist:"Choir with Luna Ersahin (AySay)",       cat:"art"},
    {time:"11:00",end:"12:30",stage:"CINEMA",               artist:"The Tender Revolution",                 cat:"art"},
    {time:"11:00",end:"12:00",stage:"RE:ACT",               artist:"Aaiún Nin",                             cat:"art"},
    {time:"11:00",end:"12:00",stage:"STADION",              artist:"Yin Yoga",                              cat:"activity"},
    {time:"11:00",end:"12:00",stage:"GROW",                 artist:"Taste the Garden",                      cat:"activity"},
    {time:"11:00",end:"12:00",stage:"SKATE",                artist:"Obviously Skate Session",               cat:"activity"},
    // ── 12:00 ──
    {time:"12:00",end:"13:00",stage:"THE YARD",             artist:"Youth for Citizenship",                 cat:"art"},
    {time:"12:00",end:"13:00",stage:"RE:ACT",               artist:"Patricia Sherpa",                       cat:"art"},
    {time:"12:00",end:"13:00",stage:"GROW",                 artist:"Stir the Pot",                          cat:"activity"},
    {time:"12:00",end:"13:00",stage:"STADION",              artist:"Keep Your Gains",                       cat:"activity"},
    // ── 12:30 ──
    {time:"12:30",end:"13:30",stage:"REHEARSALS OF BELONGING",artist:"Muskelsvindfonden",                  cat:"art"},
    {time:"12:30",end:"13:30",stage:"CINEMA",               artist:"Emma Holten x Emil Falster",            cat:"art"},
    {time:"12:30",end:"13:30",stage:"THE YARD",             artist:"Yoga",                                  cat:"activity"},
    {time:"12:30",end:"13:30",stage:"THE YARD",             artist:"Greenpeace",                            cat:"art"},
    // ── 13:00 ──
    {time:"13:00",end:"14:30",stage:"DANCEFLOOR",           artist:"Hedestrik x Nordisk Dans",              cat:"art"},
    {time:"13:00",end:"14:00",stage:"STADION",              artist:"Yinyasa Yoga",                          cat:"activity"},
    {time:"13:00",end:"14:00",stage:"THE YARD",             artist:"A Slice for the Climate",               cat:"art"},
    // ── 13:30 ──
    {time:"13:30",end:"14:30",stage:"GROW",                 artist:"Parallel Truths",                       cat:"art"},
    // ── 14:00 ──
    {time:"14:00",end:"15:00",stage:"RE:ACT",               artist:"Daregender",                            cat:"art"},
    {time:"14:00",end:"15:00",stage:"STADION",              artist:"What Does Your Heart Beat For?",        cat:"activity"},
    {time:"14:00",end:"15:00",stage:"STADION",              artist:"Do You Have Roskilde Power?",           cat:"activity"},
    {time:"14:00",end:"15:00",stage:"THE YARD",             artist:"Ukrudtsdrinks",                         cat:"activity"},
    {time:"14:00",end:"17:00",stage:"STADION",              artist:"Social Basketball Tournament",          cat:"activity"},
    // ── 14:15 ── Music starts
    {time:"14:15",end:"15:30",stage:"EOS",                  artist:"Ozzy",                                  cat:"music"},
    // ── 15:00 ──
    {time:"15:00",end:"16:15",stage:"LAGUNE",               artist:"Ponny",                                 cat:"music"},
    {time:"15:00",end:"16:30",stage:"DANCEFLOOR",           artist:"Hedestrik x Nordisk Dans",              cat:"art"},
    {time:"15:00",end:"16:00",stage:"THE YARD",             artist:"Book Club with Aktivisisk Tegnestue",   cat:"art"},
    {time:"15:00",end:"16:00",stage:"RE:ACT",               artist:"Peimi",                                 cat:"art"},
    {time:"15:00",end:"16:30",stage:"GROW",                 artist:"Decorate Your Camp with Sun Prints",    cat:"activity"},
    // ── 15:30 ──
    {time:"15:30",end:"16:30",stage:"REHEARSALS OF BELONGING",artist:"B.Y.O.B.",                           cat:"art"},
    {time:"15:30",end:"16:30",stage:"SKATE",                artist:"Gelwane",                               cat:"music"},
    // ── 15:45 ──
    {time:"15:45",end:"16:45",stage:"EOS",                  artist:"Carlina de Place",                      cat:"music"},
    // ── 16:00 ──
    {time:"16:00",end:"17:00",stage:"RE:ACT",               artist:"Rixpoet",                               cat:"art"},
    // ── 16:30 ──
    {time:"16:30",end:"17:45",stage:"LAGUNE",               artist:"Portal Pets",                           cat:"music"},
    // ── 17:00 ──
    {time:"17:00",end:"18:00",stage:"RE:ACT",               artist:"Rapolitics: Freestyle Rapshow",         cat:"art"},
    // ── 17:30 ──
    {time:"17:30",end:"18:45",stage:"EOS",                  artist:"Ana Juél",                              cat:"music"},
    // ── 18:00 ──
    {time:"18:00",end:"19:00",stage:"SKATE",                artist:"Bladeshow",                             cat:"activity"},
    {time:"18:15",end:"19:30",stage:"LAGUNE",               artist:"Oskar Witt",                            cat:"music"},
    {time:"18:15",end:"19:15",stage:"SKATE",                artist:"Roller Disco",                          cat:"activity"},
    // ── 19:00 ──
    {time:"19:00",end:"20:30",stage:"EOS",                  artist:"Grande Mahogany",                       cat:"music"},
    {time:"19:00",end:"20:30",stage:"CINEMA",               artist:"Christiania (2026)",                    cat:"art"},
    // ── 19:45 ──
    {time:"19:45",end:"21:00",stage:"LAGUNE",               artist:"Spawner",                               cat:"music"},
    // ── 20:00 ──
    {time:"20:00",end:"21:00",stage:"REHEARSALS OF BELONGING",artist:"Stefan Węgłowski",                   cat:"art"},
    // ── 20:30 ──
    {time:"20:30",end:"22:00",stage:"EOS",                  artist:"Kōya",                                  cat:"music"},
    // ── 21:15 ──
    {time:"21:15",end:"22:15",stage:"LAGUNE",               artist:"Scam",                                  cat:"music"},
    // ── 22:15 ──
    {time:"22:15",end:"23:30",stage:"EOS",                  artist:"Smøgmænd",                              cat:"music"},
    // ── 23:00 ──
    {time:"23:00",end:"01:00",stage:"LAGUNE",               artist:"Club Live",                             cat:"music"},
    {time:"23:00",end:"01:30",stage:"CINEMA",               artist:"Sinners (2025)",                        cat:"art"},
  ]},
  {key:"mon",label:"Mon 6/29",date:"2026-06-29",sub:"day2",shows:[
    // ── 09:00 ──
    {time:"09:00",end:"09:45",stage:"STADION",              artist:"Flow Yoga",                             cat:"activity"},
    {time:"09:30",end:"10:15",stage:"THE YARD",             artist:"Morgenyoga",                            cat:"activity"},
    // ── 10:00 ──
    {time:"10:00",end:"11:00",stage:"STADION",              artist:"Go' Morgen Roskilde",                   cat:"activity"},
    {time:"10:00",end:"11:00",stage:"GROW",                 artist:"Wake Up with the Garden",               cat:"activity"},
    // ── 10:30 ──
    {time:"10:30",end:"11:30",stage:"THE YARD",             artist:"Taste with Your Senses",                cat:"activity"},
    {time:"10:30",end:"11:30",stage:"THE YARD",             artist:"Virtual Reality Experiment",            cat:"activity"},
    // ── 11:00 ──
    {time:"11:00",end:"12:30",stage:"REHEARSALS OF BELONGING",artist:"Queer Meditations",                  cat:"art"},
    {time:"11:00",end:"12:30",stage:"CINEMA",               artist:"Slimo & More Perfect Union",            cat:"art"},
    {time:"11:00",end:"12:30",stage:"DANCEFLOOR",           artist:"Choir with Luna Ersahin (AySay)",       cat:"art"},
    {time:"11:00",end:"12:00",stage:"RE:ACT",               artist:"Saf Hayat",                             cat:"art"},
    {time:"11:00",end:"12:00",stage:"STADION",              artist:"Beachvolley: Heats",                    cat:"activity"},
    {time:"11:00",end:"12:00",stage:"STADION",              artist:"Go' Morgen Roskilde",                   cat:"activity"},
    {time:"11:00",end:"12:00",stage:"STADION",              artist:"Yin Yoga",                              cat:"activity"},
    {time:"11:00",end:"12:30",stage:"GROW",                 artist:"Moving Futures",                        cat:"art"},
    {time:"11:00",end:"12:00",stage:"SKATE",                artist:"Obviously Skate Session",               cat:"activity"},
    // ── 12:00 ──
    {time:"12:00",end:"13:00",stage:"RE:ACT",               artist:"Nøx, Kaka & Iris",                      cat:"art"},
    {time:"12:00",end:"13:30",stage:"STADION",              artist:"Basketturnering: Indledende Heats",     cat:"activity"},
    {time:"12:00",end:"13:00",stage:"STADION",              artist:"Keep Your Gains",                       cat:"activity"},
    // ── 12:30 ──
    {time:"12:30",end:"13:30",stage:"THE YARD",             artist:"Ndaku ya la vie est belle",             cat:"art"},
    {time:"12:30",end:"13:30",stage:"DANCEFLOOR",           artist:"Giant Board Game",                      cat:"activity"},
    {time:"12:30",end:"13:30",stage:"THE YARD",             artist:"Yoga",                                  cat:"activity"},
    // ── 13:00 ──
    {time:"13:00",end:"14:00",stage:"THE LONG WAY AROUND",  artist:"Shared Exploration",                    cat:"activity"},
    {time:"13:00",end:"14:00",stage:"STADION",              artist:"Yinyasa Yoga",                          cat:"activity"},
    {time:"13:00",end:"14:00",stage:"THE YARD",             artist:"A Slice for the Climate",               cat:"art"},
    // ── 13:30 ──
    {time:"13:30",end:"14:30",stage:"LAGUNE",               artist:"Dork",                                  cat:"music"},
    // ── 14:00 ──
    {time:"14:00",end:"15:00",stage:"RE:ACT",               artist:"2030Beyond",                            cat:"art"},
    {time:"14:00",end:"15:00",stage:"SKATE",                artist:"The Danish National Skateboard Team",   cat:"activity"},
    {time:"14:00",end:"15:30",stage:"GROW",                 artist:"Moving Futures",                        cat:"art"},
    {time:"14:00",end:"15:00",stage:"STADION",              artist:"What Does Your Heart Beat For?",        cat:"activity"},
    {time:"14:00",end:"15:00",stage:"STADION",              artist:"Do You Have Roskilde Power?",           cat:"activity"},
    {time:"14:00",end:"15:00",stage:"THE YARD",             artist:"Ukrudtsdrinks",                         cat:"activity"},
    // ── 14:15 ── Music starts
    {time:"14:15",end:"15:30",stage:"EOS",                  artist:"Kayak",                                 cat:"music"},
    {time:"14:15",end:"15:15",stage:"THE YARD",             artist:"Creams N' Dreams",                      cat:"activity"},
    // ── 15:00 ──
    {time:"15:00",end:"16:15",stage:"LAGUNE",               artist:"Døtre",                                 cat:"music"},
    {time:"15:00",end:"16:00",stage:"RE:ACT",               artist:"Ossi Michel",                           cat:"art"},
    {time:"15:00",end:"16:30",stage:"CINEMA",               artist:"Deaf (2026)",                           cat:"art"},
    {time:"15:00",end:"16:00",stage:"DANCEFLOOR",           artist:"Bridal Waltz",                          cat:"art"},
    {time:"15:00",end:"15:45",stage:"CINEMA",               artist:"Pærfekt Croquis",                       cat:"art"},
    // ── 15:30 ──
    {time:"15:30",end:"16:30",stage:"THE YARD",             artist:"Nordic Climate Justice Coalition",      cat:"art"},
    // ── 15:45 ──
    {time:"15:45",end:"16:45",stage:"EOS",                  artist:"Karoline Mousing",                      cat:"music"},
    // ── 16:00 ──
    {time:"16:00",end:"17:00",stage:"RE:ACT",               artist:"R.A. The Rugged Man",                   cat:"music"},
    {time:"16:00",end:"17:00",stage:"GROW",                 artist:"Plant Speed Dating: Queer",             cat:"activity"},
    // ── 16:30 ──
    {time:"16:30",end:"17:45",stage:"LAGUNE",               artist:"Ida Duelund",                           cat:"music"},
    // ── 17:00 ──
    {time:"17:00",end:"18:00",stage:"RE:ACT",               artist:"Rapolitics: Freestyle Rapshow",         cat:"art"},
    // ── 17:30 ──
    {time:"17:30",end:"18:45",stage:"EOS",                  artist:"Sa_G",                                  cat:"music"},
    // ── 18:00 ──
    {time:"18:00",end:"19:00",stage:"SKATE",                artist:"Bladeshow",                             cat:"activity"},
    {time:"18:15",end:"19:30",stage:"LAGUNE",               artist:"100%Wet",                               cat:"music"},
    {time:"18:15",end:"19:15",stage:"SKATE",                artist:"Roller Disco",                          cat:"activity"},
    // ── 19:00 ──
    {time:"19:00",end:"20:30",stage:"EOS",                  artist:"Demersal",                              cat:"music"},
    {time:"19:00",end:"21:00",stage:"CINEMA",               artist:"Amazomania (2026)",                     cat:"art"},
    // ── 19:45 ──
    {time:"19:45",end:"21:00",stage:"LAGUNE",               artist:"GB",                                    cat:"music"},
    // ── 20:00 ──
    {time:"20:00",end:"21:00",stage:"REHEARSALS OF BELONGING",artist:"Stefan Węgłowski",                   cat:"art"},
    // ── 20:30 ──
    {time:"20:30",end:"22:00",stage:"EOS",                  artist:"Michael Williams",                      cat:"music"},
    // ── 21:15 ──
    {time:"21:15",end:"22:15",stage:"LAGUNE",               artist:"A Good Year",                           cat:"music"},
    // ── 22:15 ──
    {time:"22:15",end:"23:30",stage:"EOS",                  artist:"Alice Ai",                              cat:"music"},
    // ── 23:00 ──
    {time:"23:00",end:"01:00",stage:"LAGUNE",               artist:"Morild",                                cat:"music"},
    {time:"23:00",end:"01:30",stage:"CINEMA",               artist:"Let the Right One In (2008)",           cat:"art"},
    // ── 23:45 ──
    {time:"23:45",end:"01:30",stage:"EOS",                  artist:"Masiv",                                 cat:"music"},
  ]},
  {key:"tue",label:"Tue 6/30",date:"2026-06-30",sub:"day3",shows:[
    // ── 09:00 ──
    {time:"09:00",end:"09:45",stage:"STADION",              artist:"Flow Yoga",                             cat:"activity"},
    {time:"09:30",end:"10:15",stage:"THE YARD",             artist:"Morgenyoga",                            cat:"activity"},
    // ── 10:00 ──
    {time:"10:00",end:"11:00",stage:"GROW",                 artist:"Maiken Stæhr",                          cat:"art"},
    {time:"10:00",end:"11:00",stage:"STADION",              artist:"Go' Morgen Roskilde",                   cat:"activity"},
    // ── 10:30 ──
    {time:"10:30",end:"11:30",stage:"GROW",                 artist:"Københavns Plantefarveri",              cat:"art"},
    {time:"10:30",end:"11:30",stage:"THE YARD",             artist:"Taste with Your Senses",                cat:"activity"},
    {time:"10:30",end:"11:30",stage:"THE YARD",             artist:"Virtual Reality Experiment",            cat:"activity"},
    // ── 11:00 ──
    {time:"11:00",end:"12:00",stage:"RE:ACT",               artist:"Lucia Odoom",                           cat:"art"},
    {time:"11:00",end:"12:30",stage:"CINEMA",               artist:"Why Freedom?",                          cat:"art"},
    {time:"11:00",end:"12:00",stage:"STADION",              artist:"Beachvolley: Heats",                    cat:"activity"},
    {time:"11:00",end:"12:00",stage:"STADION",              artist:"Go' Morgen Roskilde",                   cat:"activity"},
    {time:"11:00",end:"12:00",stage:"STADION",              artist:"Yin Yoga",                              cat:"activity"},
    {time:"11:00",end:"12:30",stage:"REHEARSALS OF BELONGING",artist:"Meditation: Walk Your Brain",         cat:"art"},
    {time:"11:00",end:"12:30",stage:"DANCEFLOOR",           artist:"The Ultimate Group Dance",              cat:"art"},
    // ── 12:00 ──
    {time:"12:00",end:"13:00",stage:"RE:ACT",               artist:"Human Rights Bingo with Mizz Privileze",cat:"art"},
    {time:"12:00",end:"13:30",stage:"STADION",              artist:"Basket Tournament: Heats",              cat:"activity"},
    {time:"12:00",end:"13:00",stage:"STADION",              artist:"Keep Your Gains",                       cat:"activity"},
    {time:"12:00",end:"13:00",stage:"SKATE",                artist:"Obviously Skate Session",               cat:"activity"},
    // ── 12:30 ──
    {time:"12:30",end:"13:30",stage:"DANCEFLOOR",           artist:"Dancehall",                             cat:"art"},
    {time:"12:30",end:"13:30",stage:"THE YARD",             artist:"Ndaku ya la vie est belle",             cat:"art"},
    {time:"12:30",end:"13:30",stage:"THE YARD",             artist:"Yoga",                                  cat:"activity"},
    // ── 13:00 ──
    {time:"13:00",end:"14:00",stage:"THE LONG WAY AROUND",  artist:"Shared Exploration",                    cat:"activity"},
    {time:"13:00",end:"14:00",stage:"STADION",              artist:"Yinyasa Yoga",                          cat:"activity"},
    {time:"13:00",end:"14:00",stage:"THE YARD",             artist:"A Slice for the Climate",               cat:"art"},
    // ── 13:30 ──
    {time:"13:30",end:"14:30",stage:"LAGUNE",               artist:"Diket",                                 cat:"music"},
    // ── 14:00 ──
    {time:"14:00",end:"15:00",stage:"RE:ACT",               artist:"DFunk",                                 cat:"art"},
    {time:"14:00",end:"15:00",stage:"SKATE",                artist:"Skate 'N' Blade Mega Jam",              cat:"activity"},
    {time:"14:00",end:"15:00",stage:"STADION",              artist:"What Does Your Heart Beat For?",        cat:"activity"},
    {time:"14:00",end:"15:00",stage:"STADION",              artist:"Do You Have Roskilde Power?",           cat:"activity"},
    // ── 14:15 ──
    {time:"14:15",end:"15:30",stage:"EOS",                  artist:"Augusta Schackinger",                   cat:"music"},
    {time:"14:15",end:"15:15",stage:"THE YARD",             artist:"Creams N' Dreams",                      cat:"activity"},
    // ── 14:30 ──
    {time:"14:30",end:"15:30",stage:"GROW",                 artist:"Københavns Plantefarveri",              cat:"art"},
    {time:"14:30",end:"15:30",stage:"DANCEFLOOR",           artist:"Psytrance Dance Fitness",               cat:"activity"},
    // ── 15:00 ──
    {time:"15:00",end:"16:15",stage:"LAGUNE",               artist:"Pumpegris",                             cat:"music"},
    {time:"15:00",end:"16:00",stage:"THE YARD",             artist:"Feerne",                                cat:"art"},
    {time:"15:00",end:"16:00",stage:"REHEARSALS OF BELONGING",artist:"Whisper Whisper",                     cat:"art"},
    {time:"15:00",end:"16:00",stage:"RE:ACT",               artist:"Negash Ali",                            cat:"art"},
    {time:"15:00",end:"16:30",stage:"CINEMA",               artist:"It Was Just an Accident (2025)",        cat:"art"},
    // ── 15:45 ──
    {time:"15:45",end:"16:45",stage:"EOS",                  artist:"Alawari",                               cat:"music"},
    // ── 16:00 ──
    {time:"16:00",end:"17:00",stage:"RE:ACT",               artist:"Outlandish",                            cat:"music"},
    {time:"16:00",end:"17:00",stage:"SKATE",                artist:"Cake Deathrace",                        cat:"activity"},
    {time:"16:00",end:"17:00",stage:"GROW",                 artist:"Plant Speed Dating: Straight",          cat:"activity"},
    // ── 16:30 ──
    {time:"16:30",end:"17:45",stage:"LAGUNE",               artist:"Pistol Pistol Pistol",                  cat:"music"},
    // ── 17:00 ──
    {time:"17:00",end:"18:00",stage:"RE:ACT",               artist:"Rapolitics: Freestyle Rapshow",         cat:"art"},
    // ── 17:30 ──
    {time:"17:30",end:"18:45",stage:"EOS",                  artist:"Will",                                  cat:"music"},
    // ── 18:00 ──
    {time:"18:00",end:"19:00",stage:"SKATE",                artist:"Bladeshow",                             cat:"activity"},
    {time:"18:15",end:"19:30",stage:"LAGUNE",               artist:"Fauna",                                 cat:"music"},
    {time:"18:15",end:"19:15",stage:"SKATE",                artist:"Roller Disco",                          cat:"activity"},
    // ── 19:00 ──
    {time:"19:00",end:"20:30",stage:"EOS",                  artist:"Berg",                                  cat:"music"},
    {time:"19:00",end:"21:00",stage:"CINEMA",               artist:"The History of Concrete (2026)",        cat:"art"},
    // ── 19:45 ──
    {time:"19:45",end:"21:00",stage:"LAGUNE",               artist:"Salver",                                cat:"music"},
    // ── 20:00 ──
    {time:"20:00",end:"21:00",stage:"REHEARSALS OF BELONGING",artist:"Stefan Węgłowski",                   cat:"art"},
    // ── 20:30 ──
    {time:"20:30",end:"22:00",stage:"EOS",                  artist:"Eros for You",                          cat:"music"},
    // ── 21:15 ──
    {time:"21:15",end:"22:15",stage:"LAGUNE",               artist:"Mami Umami",                            cat:"music"},
    // ── 22:15 ──
    {time:"22:15",end:"23:30",stage:"EOS",                  artist:"Zuloo",                                 cat:"music"},
    // ── 23:00 ──
    {time:"23:00",end:"01:00",stage:"LAGUNE",               artist:"Muskila + Simona Abdallah",             cat:"music"},
    {time:"23:00",end:"01:30",stage:"CINEMA",               artist:"Vampyr (1932)",                         cat:"art"},
    // ── 23:45 ──
    {time:"23:45",end:"01:30",stage:"EOS",                  artist:"Glayden",                               cat:"music"},
  ]},
];
