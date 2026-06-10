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
  "ORANGE SCENE":           {color:"#F97316",e:"🟠",s:"Orange"},
  "ARENA":                  {color:"#3B82F6",e:"🏟",s:"Arena"},
  "GLORIA":                 {color:"#EC4899",e:"✦",s:"Gloria"},
  "FAUNA":                  {color:"#22C55E",e:"🌿",s:"Fauna"},
  "PLATFORM":               {color:"#F59E0B",e:"▲",s:"Platform"},
  "FOOD IS NOW":            {color:"#F472B6",e:"🍽",s:"Food"},
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
  {key:"wed",label:"Wed 7/1",date:"2026-07-01",sub:"day4",shows:[
    // ── 09:00 ──
    {time:"09:00",end:"09:45",stage:"STADION",              artist:"Flow Yoga",                             cat:"activity"},
    // ── 10:00 ──
    {time:"10:00",end:"11:00",stage:"STADION",              artist:"Go' Morgen Roskilde",                   cat:"activity"},
    {time:"10:00",end:"11:00",stage:"DANCEFLOOR",           artist:"Roskilde Festivals Største Yogafest",   cat:"activity"},
    {time:"10:00",end:"11:00",stage:"GROW",                 artist:"Wake Up with the Garden",               cat:"activity"},
    // ── 11:00 ──
    {time:"11:00",end:"13:00",stage:"STADION",              artist:"Basket Tournament: Finals",             cat:"activity"},
    {time:"11:00",end:"12:00",stage:"GROW",                 artist:"Taste the Garden",                      cat:"activity"},
    // ── 12:00 ──
    {time:"12:00",end:"14:00",stage:"STADION",              artist:"Beachvolley: Finals",                   cat:"activity"},
    {time:"12:00",end:"13:00",stage:"SKATE",                artist:"Skate Match: Denmark vs. Sweden",       cat:"activity"},
    {time:"12:00",end:"14:00",stage:"FOOD IS NOW",          artist:"Dinner: From Sea to Shared Table",      cat:"activity"},
    // ── 13:00 ──
    {time:"13:00",end:"14:30",stage:"STADION",              artist:"Wheelchair Basketball Celebrity Game",  cat:"activity"},
    // ── 17:00 ──
    {time:"17:00",end:"18:30",stage:"EOS",                  artist:"Bia",                                   cat:"music"},
    {time:"17:00",end:"18:15",stage:"PLATFORM",             artist:"Dorotea Saykaly & Emil Dam Seidel",     cat:"music"},
    // ── 17:30 ──
    {time:"17:30",end:"18:45",stage:"GLORIA",               artist:"Joshua Idehen",                         cat:"music"},
    {time:"17:30",end:"19:00",stage:"ORANGE SCENE",         artist:"PIL",                                   cat:"music"},
    // ── 17:45 ──
    {time:"17:45",end:"18:45",stage:"FAUNA",                artist:"Tuvaband",                              cat:"music"},
    // ── 18:30 ──
    {time:"18:30",end:"19:45",stage:"ARENA",                artist:"Pa Salieu",                             cat:"music"},
    {time:"18:30",end:"19:45",stage:"LAGUNE",               artist:"Annie & The Caldwells",                 cat:"music"},
    {time:"18:30",end:"19:45",stage:"PLATFORM",             artist:"Andreas Haglund",                       cat:"music"},
    // ── 19:30 ──
    {time:"19:30",end:"21:00",stage:"GLORIA",               artist:"Hypnosis Therapy",                      cat:"music"},
    {time:"19:30",end:"21:30",stage:"ORANGE SCENE",         artist:"Wolf Alice",                            cat:"music"},
    {time:"19:30",end:"20:45",stage:"FAUNA",                artist:"Smertegrænsens Toldere",                cat:"music"},
    // ── 20:30 ──
    {time:"20:30",end:"21:45",stage:"LAGUNE",               artist:"Angående Mig",                          cat:"music"},
    {time:"20:30",end:"22:30",stage:"EOS",                  artist:"Sama' Abdulhadi",                       cat:"music"},
    // ── 20:45 ──
    {time:"20:45",end:"22:15",stage:"ARENA",                artist:"JADE",                                  cat:"music"},
    {time:"20:45",end:"22:00",stage:"PLATFORM",             artist:"1GUH WATCH",                            cat:"music"},
    // ── 21:00 ──
    {time:"21:00",end:"22:15",stage:"FAUNA",                artist:"The Sophs",                             cat:"music"},
    // ── 21:30 ──
    {time:"21:30",end:"23:00",stage:"GLORIA",               artist:"Indus",                                 cat:"music"},
    // ── 22:00 ──
    {time:"22:00",end:"01:00",stage:"ORANGE SCENE",         artist:"The Cure",                              cat:"music",hl:true},
    // ── 22:30 ──
    {time:"22:30",end:"00:00",stage:"LAGUNE",               artist:"Marwan Moussa",                         cat:"music"},
    // ── 23:30 ──
    {time:"23:30",end:"01:00",stage:"GLORIA",               artist:"Dying Wish",                            cat:"music"},
    {time:"23:30",end:"01:00",stage:"EOS",                  artist:"Smag på Dig Selv",                      cat:"music"},
    // ── 00:00 ──
    {time:"00:00",end:"01:30",stage:"ARENA",                artist:"Esdeekid",                              cat:"music"},
    {time:"00:00",end:"02:00",stage:"FAUNA",                artist:"Sherelle",                              cat:"music"},
    // ── 00:30 ──
    {time:"00:30",end:"02:00",stage:"LAGUNE",               artist:"Primitive Man",                         cat:"music"},
    // ── 00:45 ──
    {time:"00:45",end:"02:00",stage:"PLATFORM",             artist:"Pili Pili Girls",                       cat:"music"},
    // ── 01:30 ──
    {time:"01:30",end:"03:00",stage:"EOS",                  artist:"¥Ø¥$UK€ ¥UK1MAT$U",                    cat:"music"},
  ]},
  {key:"thu",label:"Thu 7/2",date:"2026-07-02",sub:"day5",shows:[
    // ── 09:30 ──
    {time:"09:30",end:"10:15",stage:"STADION",              artist:"Flow Yoga",                             cat:"activity"},
    // ── 10:00 ──
    {time:"10:00",end:"11:00",stage:"STADION",              artist:"Go' Morgen Roskilde",                   cat:"activity"},
    {time:"10:00",end:"11:00",stage:"FOOD IS NOW",          artist:"Breakfast: Coffee and Bun with Cheese", cat:"activity"},
    // ── 10:30 ──
    {time:"10:30",end:"11:30",stage:"FOOD IS NOW",          artist:"Øllingegaard",                          cat:"art"},
    // ── 11:00 ──
    {time:"11:00",end:"12:00",stage:"STADION",              artist:"Go' Morgen Roskilde",                   cat:"activity"},
    // ── 11:15 ──
    {time:"11:15",end:"12:30",stage:"FAUNA",                artist:"Singalong for Peace",                   cat:"art"},
    // ── 11:30 ──
    {time:"11:30",end:"12:30",stage:"FOOD IS NOW",          artist:"Jazzed on Grains x Sæsonmelier",        cat:"activity"},
    // ── 12:00 ──
    {time:"12:00",end:"13:15",stage:"LAGUNE",               artist:"Uld",                                   cat:"music"},
    {time:"12:00",end:"13:15",stage:"PLATFORM",             artist:"Vilde Tuv",                             cat:"music"},
    {time:"12:00",end:"14:00",stage:"FOOD IS NOW",          artist:"Lunch: Green Open-Faced Sandwiches on Toasted Rye",cat:"activity"},
    // ── 13:00 ──
    {time:"13:00",end:"14:15",stage:"FAUNA",                artist:"Dean Johnson",                          cat:"music"},
    {time:"13:00",end:"14:15",stage:"GLORIA",               artist:"Soli City x Vertigo",                   cat:"music"},
    // ── 13:30 ──
    {time:"13:30",end:"14:45",stage:"PLATFORM",             artist:"Noah Umur Kanber",                      cat:"music"},
    // ── 14:00 ──
    {time:"14:00",end:"15:15",stage:"LAGUNE",               artist:"Tarrak",                                cat:"music"},
    // ── 14:30 ──
    {time:"14:30",end:"15:45",stage:"ARENA",                artist:"Guldimund",                             cat:"music"},
    // ── 15:00 ──
    {time:"15:00",end:"16:15",stage:"FAUNA",                artist:"Širom",                                 cat:"music"},
    {time:"15:00",end:"16:15",stage:"EOS",                  artist:"Jalen Ngonda",                          cat:"music"},
    {time:"15:00",end:"16:15",stage:"PLATFORM",             artist:"Joana Öhlschläger",                     cat:"music"},
    {time:"15:00",end:"16:00",stage:"FOOD IS NOW",          artist:"Anton Schmidt Feiring & Erik Lautrup-Nielsen",cat:"art"},
    // ── 16:00 ──
    {time:"16:00",end:"17:15",stage:"ORANGE SCENE",         artist:"Malk de Koijn",                         cat:"music"},
    {time:"16:00",end:"18:00",stage:"FOOD IS NOW",          artist:"Dinner: From Sea to Shared Table",      cat:"activity"},
    // ── 16:30 ──
    {time:"16:30",end:"17:45",stage:"LAGUNE",               artist:"BB Trickz",                             cat:"music"},
    {time:"16:30",end:"17:45",stage:"GLORIA",               artist:"Abdullah Miniawy Trio",                 cat:"music"},
    // ── 17:00 ──
    {time:"17:00",end:"18:15",stage:"ARENA",                artist:"Royel Otis",                            cat:"music"},
    {time:"17:00",end:"18:15",stage:"FAUNA",                artist:"Yerai Cortés",                          cat:"music"},
    {time:"17:00",end:"18:15",stage:"EOS",                  artist:"Napalm Death",                          cat:"music"},
    // ── 17:15 ──
    {time:"17:15",end:"18:30",stage:"PLATFORM",             artist:"Dorotea Saykaly & Emil Dam Seidel",     cat:"music"},
    // ── 18:00 ──
    {time:"18:00",end:"19:30",stage:"ORANGE SCENE",         artist:"Little Simz",                           cat:"music"},
    // ── 18:30 ──
    {time:"18:30",end:"19:45",stage:"GLORIA",               artist:"The New Eves",                          cat:"music"},
    {time:"18:30",end:"19:45",stage:"LAGUNE",               artist:"Ecca Vandal",                           cat:"music"},
    // ── 19:00 ──
    {time:"19:00",end:"20:30",stage:"ARENA",                artist:"Ethel Cain",                            cat:"music"},
    {time:"19:00",end:"20:30",stage:"EOS",                  artist:"Wicky",                                 cat:"music"},
    {time:"19:00",end:"20:15",stage:"PLATFORM",             artist:"Shovel Dance Collective",               cat:"music"},
    // ── 19:30 ──
    {time:"19:30",end:"20:45",stage:"FAUNA",                artist:"Truck Violence",                        cat:"music"},
    // ── 20:15 ──
    {time:"20:15",end:"21:30",stage:"LAGUNE",               artist:"Naïka",                                 cat:"music"},
    // ── 20:30 ──
    {time:"20:30",end:"21:45",stage:"GLORIA",               artist:"Cortisa Star",                          cat:"music"},
    // ── 21:00 ──
    {time:"21:00",end:"22:15",stage:"FAUNA",                artist:"Khana Bierbood",                        cat:"music"},
    {time:"21:00",end:"22:15",stage:"EOS",                  artist:"KWN",                                   cat:"music"},
    {time:"21:00",end:"22:15",stage:"ARENA",                artist:"Ken Carson",                            cat:"music"},
    {time:"21:00",end:"22:15",stage:"PLATFORM",             artist:"1GUH WATCH",                            cat:"music"},
    // ── 22:00 ──
    {time:"22:00",end:"01:00",stage:"ORANGE SCENE",         artist:"Gorillaz",                              cat:"music",hl:true},
    // ── 22:15 ──
    {time:"22:15",end:"23:30",stage:"GLORIA",               artist:"Krøyer",                                cat:"music"},
    {time:"22:15",end:"23:30",stage:"LAGUNE",               artist:"Uncle Acid & The Deadbeats",            cat:"music"},
    // ── 23:00 ──
    {time:"23:00",end:"00:30",stage:"FAUNA",                artist:"Nick León",                             cat:"music"},
    // ── 23:30 ──
    {time:"23:30",end:"01:00",stage:"EOS",                  artist:"Lykke Li",                              cat:"music"},
    // ── 23:45 ──
    {time:"23:45",end:"01:00",stage:"PLATFORM",             artist:"Elle Fierce",                           cat:"music"},
    // ── 00:00 ──
    {time:"00:00",end:"01:30",stage:"ARENA",                artist:"KNEECAP",                               cat:"music"},
    {time:"00:00",end:"01:15",stage:"GLORIA",               artist:"The Zawose Queens",                     cat:"music"},
    // ── 00:15 ──
    {time:"00:15",end:"01:30",stage:"LAGUNE",               artist:"Cobrah",                                cat:"music"},
    // ── 01:00 ──
    {time:"01:00",end:"02:30",stage:"ORANGE SCENE",         artist:"Tobias Rahim",                          cat:"music"},
    {time:"01:00",end:"02:30",stage:"FAUNA",                artist:"VGTBL.PL",                              cat:"music"},
    // ── 01:45 ──
    {time:"01:45",end:"03:15",stage:"GLORIA",               artist:"DJRUM",                                 cat:"music"},
    // ── 02:00 ──
    {time:"02:00",end:"03:30",stage:"ARENA",                artist:"Brutalismus 3000",                      cat:"music"},
    // ── 02:15 ──
    {time:"02:15",end:"03:30",stage:"LAGUNE",               artist:"Honningbarna",                          cat:"music"},
  ]},
  {key:"fri",label:"Fri 7/3",date:"2026-07-03",sub:"day6",shows:[
    // ── 09:30 ──
    {time:"09:30",end:"10:15",stage:"STADION",              artist:"Flow Yoga",                             cat:"activity"},
    // ── 10:00 ──
    {time:"10:00",end:"11:00",stage:"STADION",              artist:"Go' Morgen Roskilde",                   cat:"activity"},
    {time:"10:00",end:"11:00",stage:"FOOD IS NOW",          artist:"Breakfast: Coffee and Bun with Cheese", cat:"activity"},
    // ── 10:30 ──
    {time:"10:30",end:"12:00",stage:"GLORIA",               artist:"Haidar Ansari x Brimheim",              cat:"music"},
    {time:"10:30",end:"11:30",stage:"FOOD IS NOW",          artist:"Collective Bakery",                     cat:"art"},
    // ── 11:00 ──
    {time:"11:00",end:"12:00",stage:"STADION",              artist:"Go' Morgen Roskilde",                   cat:"activity"},
    // ── 11:30 ──
    {time:"11:30",end:"12:30",stage:"FOOD IS NOW",          artist:"Plantetarisk Forsamling",               cat:"art"},
    // ── 11:45 ──
    {time:"11:45",end:"13:00",stage:"PLATFORM",             artist:"Spellchestra",                          cat:"music"},
    // ── 12:00 ──
    {time:"12:00",end:"13:15",stage:"EOS",                  artist:"Aysay",                                 cat:"music"},
    {time:"12:00",end:"13:15",stage:"LAGUNE",               artist:"Hemlocke Springs",                      cat:"music"},
    // ── 12:30 ──
    {time:"12:30",end:"13:45",stage:"GLORIA",               artist:"Vanessa Amara",                         cat:"music"},
    // ── 13:00 ──
    {time:"13:00",end:"14:15",stage:"ARENA",                artist:"Mille",                                 cat:"music"},
    {time:"13:00",end:"14:15",stage:"FAUNA",                artist:"Cat Clyde",                             cat:"music"},
    // ── 13:30 ──
    {time:"13:30",end:"14:45",stage:"PLATFORM",             artist:"Shovel Dance Collective",               cat:"music"},
    // ── 14:00 ──
    {time:"14:00",end:"15:15",stage:"LAGUNE",               artist:"Chezile",                               cat:"music"},
    // ── 14:30 ──
    {time:"14:30",end:"15:45",stage:"GLORIA",               artist:"Gwenifer Raymond",                      cat:"music"},
    // ── 15:00 ──
    {time:"15:00",end:"16:15",stage:"FAUNA",                artist:"Folk Bitch Trio",                       cat:"music"},
    {time:"15:00",end:"16:15",stage:"EOS",                  artist:"The Savage Rose",                       cat:"music"},
    {time:"15:00",end:"16:15",stage:"ARENA",                artist:"Young Miko",                            cat:"music"},
    {time:"15:00",end:"16:00",stage:"FOOD IS NOW",          artist:"Circular Cooking",                      cat:"art"},
    // ── 16:00 ──
    {time:"16:00",end:"17:15",stage:"ORANGE SCENE",         artist:"Tessa",                                 cat:"music"},
    {time:"16:00",end:"17:15",stage:"LAGUNE",               artist:"Getdown Services",                      cat:"music"},
    {time:"16:00",end:"18:00",stage:"FOOD IS NOW",          artist:"Dinner: From Sea to Shared Table",      cat:"activity"},
    // ── 16:30 ──
    {time:"16:30",end:"17:45",stage:"GLORIA",               artist:"Milkweed",                              cat:"music"},
    // ── 17:00 ──
    {time:"17:00",end:"18:15",stage:"FAUNA",                artist:"Maruja",                                cat:"music"},
    // ── 17:15 ──
    {time:"17:15",end:"18:30",stage:"PLATFORM",             artist:"Joana Öhlschläger",                     cat:"music"},
    // ── 17:30 ──
    {time:"17:30",end:"18:45",stage:"ARENA",                artist:"Sierra Ferrell",                        cat:"music"},
    // ── 18:00 ──
    {time:"18:00",end:"19:30",stage:"EOS",                  artist:"Rizwan-Muazzam Qawwali",                cat:"music"},
    {time:"18:00",end:"19:15",stage:"LAGUNE",               artist:"Smerz",                                 cat:"music"},
    // ── 18:30 ──
    {time:"18:30",end:"19:45",stage:"GLORIA",               artist:"Luisa Almaguer",                        cat:"music"},
    // ── 19:00 ──
    {time:"19:00",end:"20:30",stage:"ORANGE SCENE",         artist:"Addison Rae",                           cat:"music"},
    {time:"19:00",end:"20:30",stage:"FAUNA",                artist:"Saad Tiouly",                           cat:"music"},
    // ── 20:00 ──
    {time:"20:00",end:"21:15",stage:"LAGUNE",               artist:"Jim Legxacy",                           cat:"music"},
    // ── 20:15 ──
    {time:"20:15",end:"21:30",stage:"PLATFORM",             artist:"Thicket",                               cat:"music"},
    // ── 20:30 ──
    {time:"20:30",end:"22:00",stage:"EOS",                  artist:"DBN Gogo",                              cat:"music"},
    {time:"20:30",end:"22:00",stage:"ARENA",                artist:"David Byrne",                           cat:"music"},
    {time:"20:30",end:"21:45",stage:"GLORIA",               artist:"No Joy",                                cat:"music"},
    // ── 21:00 ──
    {time:"21:00",end:"22:15",stage:"FAUNA",                artist:"Lamisi",                                cat:"music"},
    // ── 22:00 ──
    {time:"22:00",end:"01:00",stage:"ORANGE SCENE",         artist:"Jennie",                                cat:"music",hl:true},
    {time:"22:00",end:"23:15",stage:"LAGUNE",               artist:"Los Thuthanaka",                        cat:"music"},
    // ── 22:30 ──
    {time:"22:30",end:"23:45",stage:"GLORIA",               artist:"Mark William Lewis",                    cat:"music"},
    // ── 23:00 ──
    {time:"23:00",end:"00:30",stage:"EOS",                  artist:"Oklou",                                 cat:"music"},
    {time:"23:00",end:"00:30",stage:"FAUNA",                artist:"Kin'Gongolo Kiniata",                   cat:"music"},
    // ── 23:30 ──
    {time:"23:30",end:"01:00",stage:"PLATFORM",             artist:"Elle Fierce",                           cat:"music"},
    // ── 00:00 ──
    {time:"00:00",end:"01:30",stage:"LAGUNE",               artist:"Blawan",                                cat:"music"},
    // ── 00:15 ──
    {time:"00:15",end:"01:30",stage:"ARENA",                artist:"Yung Lean & Bladee",                    cat:"music"},
    // ── 00:30 ──
    {time:"00:30",end:"01:45",stage:"GLORIA",               artist:"Poison Ruïn",                           cat:"music"},
    // ── 01:00 ──
    {time:"01:00",end:"02:30",stage:"FAUNA",                artist:"Iglooghost",                            cat:"music"},
    {time:"01:00",end:"02:30",stage:"ORANGE SCENE",         artist:"Aphaca",                                cat:"music"},
    // ── 02:00 ──
    {time:"02:00",end:"03:30",stage:"GLORIA",               artist:"Lechuga Zafiro & Verraco",              cat:"music"},
    // ── 02:15 ──
    {time:"02:15",end:"03:30",stage:"LAGUNE",               artist:"Tonser",                                cat:"music"},
    // ── 02:30 ──
    {time:"02:30",end:"04:00",stage:"ARENA",                artist:"Sammy Virji",                           cat:"music"},
  ]},
  {key:"sat",label:"Sat 7/4",date:"2026-07-04",sub:"day7",shows:[
    // ── 10:00 ──
    {time:"10:00",end:"11:00",stage:"FOOD IS NOW",          artist:"Breakfast: Coffee and Bun with Cheese", cat:"activity"},
    // ── 10:30 ──
    {time:"10:30",end:"11:30",stage:"FOOD IS NOW",          artist:"Coffee Collective",                     cat:"art"},
    // ── 11:30 ──
    {time:"11:30",end:"12:30",stage:"FOOD IS NOW",          artist:"Kølsters Bryggeri",                     cat:"art"},
    // ── 11:45 ──
    {time:"11:45",end:"13:00",stage:"PLATFORM",             artist:"Det Åbne Ensemble",                     cat:"music"},
    // ── 12:00 ──
    {time:"12:00",end:"13:15",stage:"LAGUNE",               artist:"Snuggle",                               cat:"music"},
    {time:"12:00",end:"14:00",stage:"FOOD IS NOW",          artist:"Lunch: Danish Favourites with Middle Eastern Flavours",cat:"activity"},
    {time:"12:00",end:"14:00",stage:"FOOD IS NOW",          artist:"Lunch: Long-Table Dinner with Future Ingredients",cat:"activity"},
    // ── 12:30 ──
    {time:"12:30",end:"13:45",stage:"GLORIA",               artist:"Madra Salach",                          cat:"music"},
    {time:"12:30",end:"13:45",stage:"FAUNA",                artist:"Midori Takada & Jakob Bro",             cat:"music"},
    // ── 13:15 ──
    {time:"13:15",end:"14:30",stage:"PLATFORM",             artist:"Andreas Haglund",                       cat:"music"},
    // ── 14:00 ──
    {time:"14:00",end:"15:15",stage:"EOS",                  artist:"Lojay",                                 cat:"music"},
    // ── 14:30 ──
    {time:"14:30",end:"15:45",stage:"FAUNA",                artist:"Sara Parkman",                          cat:"music"},
    {time:"14:30",end:"15:45",stage:"LAGUNE",               artist:"Eee Gee",                               cat:"music"},
    {time:"14:30",end:"15:45",stage:"GLORIA",               artist:"Heinali & Andriana-Yaroslava Saienko",  cat:"music"},
    {time:"14:30",end:"15:45",stage:"ARENA",                artist:"Mas",                                   cat:"music"},
    // ── 14:45 ──
    {time:"14:45",end:"16:00",stage:"PLATFORM",             artist:"Spellchestra",                          cat:"music"},
    // ── 15:00 ──
    {time:"15:00",end:"16:00",stage:"FOOD IS NOW",          artist:"Christian Fentz",                       cat:"art"},
    // ── 15:30 ──
    {time:"15:30",end:"17:00",stage:"ORANGE SCENE",         artist:"TV-2",                                  cat:"music"},
    // ── 16:00 ──
    {time:"16:00",end:"18:00",stage:"FOOD IS NOW",          artist:"Dinner: From Sea to Shared Table",      cat:"activity"},
    // ── 16:30 ──
    {time:"16:30",end:"17:45",stage:"FAUNA",                artist:"Jorjiana",                              cat:"music"},
    {time:"16:30",end:"17:45",stage:"GLORIA",               artist:"Cuirass",                               cat:"music"},
    // ── 17:00 ──
    {time:"17:00",end:"18:15",stage:"PLATFORM",             artist:"Ela Lung",                              cat:"music"},
    {time:"17:00",end:"18:15",stage:"LAGUNE",               artist:"Nourished by Time",                     cat:"music"},
    {time:"17:00",end:"18:15",stage:"EOS",                  artist:"Los Mirlos",                            cat:"music"},
    // ── 17:15 ──
    {time:"17:15",end:"18:30",stage:"ARENA",                artist:"Audrey Nuna",                           cat:"music"},
    // ── 18:15 ──
    {time:"18:15",end:"19:30",stage:"FAUNA",                artist:"The Callous Daoboys",                   cat:"music"},
    // ── 18:30 ──
    {time:"18:30",end:"20:00",stage:"ORANGE SCENE",         artist:"Clipse",                                cat:"music",hl:true},
    {time:"18:30",end:"19:45",stage:"GLORIA",               artist:"Bruno Berle",                           cat:"music"},
    // ── 19:30 ──
    {time:"19:30",end:"20:45",stage:"ARENA",                artist:"Liniker",                               cat:"music"},
    {time:"19:30",end:"20:45",stage:"LAGUNE",               artist:"Igorrr",                                cat:"music"},
    // ── 19:45 ──
    {time:"19:45",end:"21:00",stage:"EOS",                  artist:"Frost Children",                        cat:"music"},
    {time:"19:45",end:"21:00",stage:"PLATFORM",             artist:"Susobrino",                             cat:"music"},
    // ── 20:30 ──
    {time:"20:30",end:"21:45",stage:"GLORIA",               artist:"1111",                                  cat:"music"},
    // ── 20:45 ──
    {time:"20:45",end:"22:00",stage:"ORANGE SCENE",         artist:"Lily Allen",                            cat:"music"},
    // ── 21:00 ──
    {time:"21:00",end:"22:15",stage:"FAUNA",                artist:"Albertslund Terror Korps",              cat:"music"},
    // ── 21:45 ──
    {time:"21:45",end:"23:00",stage:"ARENA",                artist:"Bad Gyal",                              cat:"music"},
    // ── 22:00 ──
    {time:"22:00",end:"23:15",stage:"LAGUNE",               artist:"Jane Remover",                          cat:"music"},
    {time:"22:00",end:"23:15",stage:"EOS",                  artist:"Panda Bear & Sonic Boom",               cat:"music"},
    {time:"22:00",end:"23:15",stage:"PLATFORM",             artist:"This Is a Love Song",                   cat:"music"},
    // ── 22:30 ──
    {time:"22:30",end:"23:45",stage:"GLORIA",               artist:"Ata Kak",                               cat:"music"},
    // ── 23:15 ──
    {time:"23:15",end:"01:00",stage:"ORANGE SCENE",         artist:"Zara Larsson",                          cat:"music",hl:true},
    {time:"23:15",end:"00:30",stage:"FAUNA",                artist:"Sorry",                                 cat:"music"},
    // ── 00:00 ──
    {time:"00:00",end:"01:30",stage:"LAGUNE",               artist:"Rochelle Jordan",                       cat:"music"},
    // ── 00:30 ──
    {time:"00:30",end:"02:00",stage:"GLORIA",               artist:"Lord Snow",                             cat:"music"},
    // ── 00:45 ──
    {time:"00:45",end:"02:00",stage:"ARENA",                artist:"Zar Paulo",                             cat:"music"},
    // ── 01:15 ──
    {time:"01:15",end:"02:45",stage:"FAUNA",                artist:"CRRDR",                                 cat:"music"},
    // ── 02:00 ──
    {time:"02:00",end:"03:30",stage:"EOS",                  artist:"Kettama",                               cat:"music"},
  ]},
];
