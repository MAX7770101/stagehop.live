<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<title>春声 2026 · Primavera Sound Barcelona</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0E1017;
    --bg2: #141720;
    --bg3: #1A1E2A;
    --line: #252A38;
    --text: #E8E0CC;
    --muted: #5A6070;
    --dimmed: #353B4A;

    --estrella: #F5C842;
    --revolut:  #FF5722;
    --occident: #7DCE82;
    --cupra:    #60AAEE;
    --schwarz:  #CC88EE;
    --port:     #F4A261;
    --pleni:    #00CFCF;
    --levis:    #C9B070;
    --auditori: #FF8FAB;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    min-height: 100vh;
    overscroll-behavior: none;
  }

  /* ── HEADER ── */
  #header {
    position: sticky;
    top: 0;
    z-index: 200;
    background: var(--bg2);
    border-bottom: 1px solid var(--line);
    padding: 14px 16px 10px;
  }
  .header-eyebrow {
    font-size: 9px;
    letter-spacing: .32em;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-title {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    line-height: 1;
    letter-spacing: -.02em;
  }
  .header-title .accent { color: var(--estrella); }
  #map-btn {
    background: var(--bg3);
    color: var(--muted);
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 5px 12px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    cursor: pointer;
    transition: all .2s;
  }
  #map-btn.active { background: var(--estrella); color: #000; border-color: var(--estrella); }

  /* ── MAP PANEL ── */
  #map-panel {
    display: none;
    background: #10131C;
    border-bottom: 1px solid var(--line);
    padding: 16px;
  }
  #map-panel.open { display: block; }
  .map-title { font-size: 9px; letter-spacing: .25em; color: var(--muted); text-transform: uppercase; margin-bottom: 12px; }
  .map-zone { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--line); }
  .map-zone:last-of-type { border-bottom: none; }
  .zone-label { font-size: 10px; color: var(--muted); min-width: 80px; padding-top: 3px; line-height: 1.4; }
  .zone-stages { display: flex; flex-wrap: wrap; gap: 6px; }
  .stage-badge {
    border-radius: 6px;
    padding: 4px 9px;
    border: 1px solid transparent;
  }
  .stage-badge .sname { font-size: 11px; font-weight: 500; }
  .stage-badge .sloc { font-size: 9px; color: #666; margin-top: 1px; }
  .map-tip { margin-top: 12px; font-size: 9px; color: #3A3A3A; line-height: 1.5; }

  /* ── DAY TABS ── */
  #day-tabs {
    display: flex;
    overflow-x: auto;
    background: var(--bg2);
    border-bottom: 1px solid var(--line);
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  #day-tabs::-webkit-scrollbar { display: none; }
  .day-tab {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: #3A3A3A;
    padding: 9px 14px;
    cursor: pointer;
    white-space: nowrap;
    font-family: 'DM Mono', monospace;
    transition: all .15s;
    flex-shrink: 0;
  }
  .day-tab.active { color: var(--text); }
  .day-tab .dtop { font-size: 12px; font-weight: 500; }
  .day-tab .dbot { font-size: 9px; margin-top: 2px; }

  /* ── FILTER BAR ── */
  #filter-bar {
    padding: 10px 14px 9px;
    background: #0F1219;
    border-bottom: 1px solid #1E2330;
  }
  .day-badge {
    display: inline-block;
    border-radius: 4px;
    padding: 2px 10px;
    font-size: 10px;
    letter-spacing: .04em;
    margin-bottom: 9px;
    border: 1px solid transparent;
  }
  .stage-filters { display: flex; gap: 6px; flex-wrap: wrap; }
  .sf-btn {
    border-radius: 20px;
    padding: 3px 10px;
    font-size: 10px;
    border: 1px solid transparent;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    transition: all .15s;
    white-space: nowrap;
  }
  .sf-all { background: #1C2030; color: #666; border-color: #2A3040; }
  .sf-all.active { background: var(--text); color: #000; }

  /* ── SHOW LIST ── */
  #show-list { padding-bottom: 60px; background: var(--bg); }

  .show-item {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 10px 16px;
    border-bottom: 1px solid #191E2A;
    background: var(--bg);
    position: relative;
    overflow: hidden;
    transition: background .1s;
  }
  .show-item.headliner { }
  .hl-bar {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
  }

  .show-time {
    min-width: 46px;
    padding-left: 0;
  }
  .show-time .t-start {
    font-size: 15px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }
  .show-time .t-end {
    font-size: 9px;
    color: var(--dimmed);
    margin-top: 2px;
  }
  .show-time .t-late {
    font-size: 8px;
    color: #3A3A3A;
    margin-top: 1px;
  }

  .show-stage-pill {
    border-radius: 3px;
    padding: 2px 6px;
    font-size: 8px;
    letter-spacing: .03em;
    border: 1px solid transparent;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .show-artist {
    flex: 1;
    min-width: 0;
  }
  .show-artist .aname {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.2;
  }
  .show-artist .hl-label {
    font-size: 8px;
    letter-spacing: .12em;
    margin-top: 3px;
    opacity: .7;
  }

  .footer-note {
    padding: 14px 16px;
    font-size: 9px;
    color: #2E3444;
    text-align: center;
    letter-spacing: .05em;
  }

  /* scroll anchor for sticky tabs */
  html { scroll-behavior: smooth; }
</style>
</head>
<body>

<div id="header">
  <div class="header-eyebrow">Barcelona · Parc del Fòrum · Junio 2026</div>
  <div class="header-row">
    <div class="header-title">
      <span class="accent">春声</span> PRIMAVERA
    </div>
    <button id="map-btn" onclick="toggleMap()">场地图</button>
  </div>
</div>

<div id="map-panel">
  <div class="map-title">场地分布 · 从入口到海边</div>
  <div class="map-zone">
    <div class="zone-label">🚪 入口广场</div>
    <div class="zone-stages">
      <div class="stage-badge" style="background:#7DCE8218;border-color:#7DCE8244">
        <div class="sname" style="color:#7DCE82">Occident</div>
        <div class="sloc">主入口·最大开放舞台</div>
      </div>
    </div>
  </div>
  <div class="map-zone">
    <div class="zone-label">🌟 海边主台</div>
    <div class="zone-stages">
      <div class="stage-badge" style="background:#F5C84218;border-color:#F5C84244">
        <div class="sname" style="color:#F5C842">Estrella Damm</div>
        <div class="sloc">最大舞台·左侧</div>
      </div>
      <div class="stage-badge" style="background:#FF572218;border-color:#FF572244">
        <div class="sname" style="color:#FF5722">Revolut</div>
        <div class="sloc">最大舞台·右侧</div>
      </div>
      <div class="stage-badge" style="background:#60AAEE18;border-color:#60AAEE44">
        <div class="sname" style="color:#60AAEE">CUPRA</div>
        <div class="sloc">海景阶梯舞台</div>
      </div>
    </div>
  </div>
  <div class="map-zone">
    <div class="zone-label">☀️ 太阳板下</div>
    <div class="zone-stages">
      <div class="stage-badge" style="background:#CC88EE18;border-color:#CC88EE44">
        <div class="sname" style="color:#CC88EE">Schwarzkopf</div>
        <div class="sloc">小舞台A·全天12h</div>
      </div>
      <div class="stage-badge" style="background:#F4A26118;border-color:#F4A26144">
        <div class="sname" style="color:#F4A261">Port</div>
        <div class="sloc">小舞台B·全天12h</div>
      </div>
    </div>
  </div>
  <div class="map-zone">
    <div class="zone-label">🎛️ 电子区</div>
    <div class="zone-stages">
      <div class="stage-badge" style="background:#00CFCF18;border-color:#00CFCF44">
        <div class="sname" style="color:#00CFCF">Plenitude</div>
        <div class="sloc">过渡区·纯电子</div>
      </div>
    </div>
  </div>
  <div class="map-zone">
    <div class="zone-label">🏚️ 隐秘场所</div>
    <div class="zone-stages">
      <div class="stage-badge" style="background:#C9B07018;border-color:#C9B07044">
        <div class="sname" style="color:#C9B070">The Levi's Warehouse</div>
        <div class="sloc">Schwarzkopf背后·实验</div>
      </div>
      <div class="stage-badge" style="background:#FF8FAB18;border-color:#FF8FAB44">
        <div class="sname" style="color:#FF8FAB">Auditori Rockdelux</div>
        <div class="sloc">室内剧场·有座位</div>
      </div>
    </div>
  </div>
  <div class="map-tip">💡 地铁L4 El Maresme | Fòrum站 · 凌晨夜巴士N6返回市区 · Auditori为座位制室内场地请提早到</div>
</div>

<div id="day-tabs"></div>
<div id="filter-bar"></div>
<div id="show-list"></div>

<script>
const STAGES = {
  "Estrella Damm":       { color: "#F5C842", bg: "#1a140040", emoji: "🌟", short: "Estrella" },
  "Revolut":             { color: "#FF5722", bg: "#1a080040", emoji: "🔥", short: "Revolut" },
  "Occident":            { color: "#7DCE82", bg: "#0a1a0a40", emoji: "🎸", short: "Occident" },
  "CUPRA":               { color: "#60AAEE", bg: "#00112a40", emoji: "🌊", short: "CUPRA" },
  "Schwarzkopf":         { color: "#CC88EE", bg: "#1a001a40", emoji: "☀️", short: "Schwarz." },
  "Port":                { color: "#F4A261", bg: "#1a0e0040", emoji: "⚓", short: "Port" },
  "Plenitude":           { color: "#00CFCF", bg: "#001a1a40", emoji: "🎛️", short: "Pleni." },
  "The Levi's Warehouse":{ color: "#C9B070", bg: "#12100e40", emoji: "🏚️", short: "Levi's" },
  "Auditori Rockdelux":  { color: "#FF8FAB", bg: "#1a001040", emoji: "🪑", short: "Auditori" },
};

const DAYS = [
  { key:"wed", label:"周三 6/3", sub:"Opening Day", badge:"免费开放", badgeColor:"#4ADE80",
    shows:[
      {stage:"Estrella Damm",time:"17:45",end:"18:25",artist:"Ouineta"},
      {stage:"Estrella Damm",time:"18:55",end:"19:45",artist:"Yard Act"},
      {stage:"Estrella Damm",time:"20:15",end:"21:15",artist:"Guitarricadelafuente"},
      {stage:"Estrella Damm",time:"21:55",end:"23:05",artist:"Wet Leg",headliner:true},
    ]
  },
  { key:"thu", label:"周四 6/4", sub:"Day 1", badge:"Massive Attack · Doja Cat · Bad Gyal", badgeColor:"#F5C842",
    shows:[
      {stage:"Auditori Rockdelux",time:"17:00",end:"18:00",artist:"Cameron Winter"},
      {stage:"CUPRA",time:"17:15",end:"17:55",artist:"Gisela João"},
      {stage:"Port",time:"17:15",end:"18:00",artist:"Paus"},
      {stage:"Estrella Damm",time:"17:30",end:"18:15",artist:"Aiko el Grupo"},
      {stage:"Plenitude",time:"18:00",end:"19:00",artist:"Sama Yax"},
      {stage:"Occident",time:"18:00",end:"18:45",artist:"Raly"},
      {stage:"Revolut",time:"18:20",end:"19:20",artist:"Blood Orange"},
      {stage:"Schwarzkopf",time:"18:05",end:"18:50",artist:"Renaldo & Clara"},
      {stage:"CUPRA",time:"18:50",end:"19:40",artist:"Men I Trust"},
      {stage:"Port",time:"18:55",end:"19:45",artist:"The New Eves"},
      {stage:"Auditori Rockdelux",time:"19:00",end:"20:00",artist:"Lucrecia Dalt"},
      {stage:"Estrella Damm",time:"19:35",end:"20:35",artist:"Ravyn Lenae"},
      {stage:"Occident",time:"19:45",end:"20:45",artist:"Geese"},
      {stage:"Schwarzkopf",time:"19:55",end:"20:50",artist:"LaBlackie"},
      {stage:"Plenitude",time:"19:00",end:"22:00",artist:"berlioz"},
      {stage:"Revolut",time:"20:50",end:"21:50",artist:"Alex G"},
      {stage:"CUPRA",time:"20:50",end:"21:50",artist:"Oklou"},
      {stage:"Port",time:"20:55",end:"21:50",artist:"Agriculture"},
      {stage:"Auditori Rockdelux",time:"20:30",end:"21:30",artist:"caroline"},
      {stage:"Occident",time:"21:55",end:"22:55",artist:"Mac DeMarco"},
      {stage:"Schwarzkopf",time:"21:55",end:"22:55",artist:"Skullcrusher"},
      {stage:"Auditori Rockdelux",time:"22:00",end:"23:00",artist:"Panda Bear"},
      {stage:"The Levi's Warehouse",time:"22:00",end:"23:00",artist:"Malibu"},
      {stage:"Estrella Damm",time:"22:05",end:"23:20",artist:"Massive Attack",headliner:true},
      {stage:"CUPRA",time:"23:00",end:"00:20",artist:"Father John Misty",headliner:true},
      {stage:"Port",time:"23:00",end:"00:00",artist:"Florence Road"},
      {stage:"Revolut",time:"23:35",end:"01:05",artist:"Doja Cat",headliner:true},
      {stage:"Plenitude",time:"23:25",end:"00:25",artist:"Guedra Guedra"},
      {stage:"The Levi's Warehouse",time:"23:05",end:"00:05",artist:"Brìghde Chaimbeul"},
      {stage:"Occident",time:"00:30",end:"01:30",artist:"TV Girl"},
      {stage:"Schwarzkopf",time:"00:25",end:"01:25",artist:"Rojuu"},
      {stage:"Port",time:"01:30",end:"02:30",artist:"Melt-Banana"},
      {stage:"Estrella Damm",time:"01:20",end:"02:50",artist:"Bad Gyal",headliner:true},
      {stage:"CUPRA",time:"01:35",end:"02:35",artist:"2hollis"},
      {stage:"Plenitude",time:"00:25",end:"02:00",artist:"Ahadadream"},
      {stage:"The Levi's Warehouse",time:"00:10",end:"01:10",artist:"New York"},
      {stage:"Plenitude",time:"02:00",end:"03:00",artist:"BAMBII"},
      {stage:"Schwarzkopf",time:"02:40",end:"03:35",artist:"Fcukers"},
      {stage:"Port",time:"03:40",end:"04:30",artist:"VVV [Trippin'you]"},
      {stage:"Occident",time:"03:00",end:"04:00",artist:"Overmono"},
      {stage:"Plenitude",time:"03:00",end:"05:00",artist:"Ben UFO"},
      {stage:"The Levi's Warehouse",time:"02:20",end:"03:20",artist:"Oli XL Live"},
      {stage:"The Levi's Warehouse",time:"03:25",end:"05:25",artist:"Anthony Naples"},
      {stage:"Schwarzkopf",time:"04:35",end:"05:35",artist:"Six Sex"},
      {stage:"CUPRA",time:"04:30",end:"06:00",artist:"¥ØU$UK€ ¥UK1MAT$U"},
    ]
  },
  { key:"fri", label:"周五 6/5", sub:"Day 2", badge:"The Cure · Skrillex · Addison Rae", badgeColor:"#FF5722",
    shows:[
      {stage:"Auditori Rockdelux",time:"16:30",end:"17:30",artist:"Annahstasia"},
      {stage:"Schwarzkopf",time:"16:35",end:"17:15",artist:".bd."},
      {stage:"Estrella Damm",time:"17:40",end:"18:25",artist:"NewDad"},
      {stage:"CUPRA",time:"17:15",end:"17:55",artist:"Pavvla"},
      {stage:"Port",time:"17:20",end:"18:00",artist:"Las Petunias"},
      {stage:"Occident",time:"18:00",end:"18:45",artist:"Somos la Herencia"},
      {stage:"Plenitude",time:"18:00",end:"19:30",artist:"Malena"},
      {stage:"Revolut",time:"18:35",end:"19:30",artist:"Slowdive"},
      {stage:"Schwarzkopf",time:"18:05",end:"18:50",artist:"Juicy Bae"},
      {stage:"CUPRA",time:"18:50",end:"19:45",artist:"Buscabulla"},
      {stage:"Port",time:"19:00",end:"19:45",artist:"Ósserp"},
      {stage:"Auditori Rockdelux",time:"18:00",end:"19:00",artist:"mark william lewis"},
      {stage:"Estrella Damm",time:"19:45",end:"20:45",artist:"Ethel Cain"},
      {stage:"Occident",time:"19:50",end:"20:50",artist:"Rilo Kiley",headliner:true},
      {stage:"Schwarzkopf",time:"19:50",end:"20:50",artist:"Texas Is The Reason"},
      {stage:"Plenitude",time:"19:30",end:"21:00",artist:"Powder"},
      {stage:"Auditori Rockdelux",time:"19:30",end:"20:30",artist:"Einstürzende Neubauten"},
      {stage:"Revolut",time:"21:00",end:"22:00",artist:"Addison Rae",headliner:true},
      {stage:"CUPRA",time:"20:55",end:"21:55",artist:"Ralphie Choo"},
      {stage:"Port",time:"21:00",end:"21:50",artist:"Water From Your Eyes"},
      {stage:"Occident",time:"22:00",end:"23:15",artist:"Role Model"},
      {stage:"Schwarzkopf",time:"22:05",end:"23:05",artist:"Disobey"},
      {stage:"Plenitude",time:"21:00",end:"22:30",artist:"Call Super"},
      {stage:"Auditori Rockdelux",time:"21:00",end:"22:00",artist:"Merzbow"},
      {stage:"The Levi's Warehouse",time:"22:00",end:"22:45",artist:"Joan La Barbara"},
      {stage:"Estrella Damm",time:"22:15",end:"00:45",artist:"The Cure",headliner:true},
      {stage:"The Levi's Warehouse",time:"22:50",end:"23:35",artist:"Matmos"},
      {stage:"Plenitude",time:"22:30",end:"00:00",artist:"DJ Koolt"},
      {stage:"CUPRA",time:"23:20",end:"00:20",artist:"Amaarae"},
      {stage:"Port",time:"23:15",end:"00:10",artist:"Shlohmo"},
      {stage:"Occident",time:"00:30",end:"01:30",artist:"Jade"},
      {stage:"Schwarzkopf",time:"00:25",end:"01:25",artist:"fakemink"},
      {stage:"The Levi's Warehouse",time:"23:40",end:"00:35",artist:"Rashad Becker"},
      {stage:"Revolut",time:"01:00",end:"02:30",artist:"Skrillex",headliner:true},
      {stage:"CUPRA",time:"01:45",end:"02:45",artist:"PinkPantheress"},
      {stage:"Port",time:"01:35",end:"02:25",artist:"Kylesa"},
      {stage:"Plenitude",time:"00:00",end:"01:00",artist:"Roza Terenzi Live"},
      {stage:"The Levi's Warehouse",time:"00:45",end:"02:15",artist:"Mohammad Reza Mortazavi"},
      {stage:"Schwarzkopf",time:"02:30",end:"03:10",artist:"Cara Delevingne"},
      {stage:"Occident",time:"02:55",end:"04:05",artist:"Viagra Boys"},
      {stage:"Port",time:"03:15",end:"04:00",artist:"Raya Diplomática"},
      {stage:"Plenitude",time:"01:00",end:"02:30",artist:"Aurora Halal"},
      {stage:"The Levi's Warehouse",time:"02:20",end:"03:50",artist:"Marc Piñol"},
      {stage:"Plenitude",time:"02:30",end:"05:00",artist:"Sama' Abdulhadi"},
      {stage:"The Levi's Warehouse",time:"03:55",end:"05:25",artist:"Iglooghost"},
      {stage:"CUPRA",time:"04:10",end:"06:00",artist:"KI/KI"},
      {stage:"Schwarzkopf",time:"04:05",end:"05:20",artist:"Underground Resistance"},
    ]
  },
  { key:"sat", label:"周六 6/6", sub:"Day 3", badge:"Gorillaz · The xx · MBV", badgeColor:"#7DCE82",
    shows:[
      {stage:"Auditori Rockdelux",time:"16:30",end:"17:30",artist:"st.frances"},
      {stage:"Schwarzkopf",time:"16:35",end:"17:15",artist:"Ven'nus"},
      {stage:"CUPRA",time:"17:10",end:"17:50",artist:"Jimena Amarillo"},
      {stage:"Port",time:"17:15",end:"18:00",artist:"Sofia"},
      {stage:"Revolut",time:"17:15",end:"18:00",artist:"Barry B"},
      {stage:"Occident",time:"17:50",end:"18:35",artist:"Bestia Bebé"},
      {stage:"Plenitude",time:"18:00",end:"19:30",artist:"M8NSE"},
      {stage:"Schwarzkopf",time:"18:00",end:"18:45",artist:"Depresión Sonora"},
      {stage:"CUPRA",time:"18:10",end:"18:55",artist:"Grace Ives"},
      {stage:"Revolut",time:"18:30",end:"19:30",artist:"Baxter Dury"},
      {stage:"Auditori Rockdelux",time:"18:00",end:"19:00",artist:"These New Puritans"},
      {stage:"Port",time:"18:50",end:"19:35",artist:"The Sophs"},
      {stage:"Estrella Damm",time:"19:40",end:"20:40",artist:"Big Thief"},
      {stage:"Occident",time:"19:00",end:"19:45",artist:"Sudan Archives"},
      {stage:"Schwarzkopf",time:"19:45",end:"20:45",artist:"Gelli Haha"},
      {stage:"Plenitude",time:"19:30",end:"21:35",artist:"Florentino b2b dj g2g"},
      {stage:"Auditori Rockdelux",time:"19:30",end:"20:30",artist:"Beverly Glenn-Copeland"},
      {stage:"Revolut",time:"20:50",end:"21:50",artist:"Little Simz"},
      {stage:"CUPRA",time:"21:15",end:"22:15",artist:"rusowsky"},
      {stage:"Port",time:"20:55",end:"21:55",artist:"Smerz"},
      {stage:"Occident",time:"20:15",end:"21:10",artist:"Ashnikko"},
      {stage:"Auditori Rockdelux",time:"21:00",end:"22:00",artist:"Anna von Hausswolff"},
      {stage:"Plenitude",time:"21:35",end:"22:30",artist:"Safety Trance Live AV"},
      {stage:"Estrella Damm",time:"22:05",end:"23:20",artist:"My Bloody Valentine",headliner:true},
      {stage:"Schwarzkopf",time:"22:00",end:"23:00",artist:"Touché Amoré"},
      {stage:"The Levi's Warehouse",time:"22:00",end:"23:00",artist:"res_"},
      {stage:"Plenitude",time:"22:30",end:"23:45",artist:"Lechuga Zafiro & Verraco"},
      {stage:"Revolut",time:"23:40",end:"00:55",artist:"The xx",headliner:true},
      {stage:"CUPRA",time:"23:20",end:"00:20",artist:"Dijon"},
      {stage:"Port",time:"23:10",end:"00:05",artist:"Lambrini Girls"},
      {stage:"Occident",time:"00:40",end:"01:40",artist:"Marina"},
      {stage:"Schwarzkopf",time:"00:25",end:"01:25",artist:"Joey Valence & Brae"},
      {stage:"The Levi's Warehouse",time:"23:00",end:"00:30",artist:"DJ Marcelle"},
      {stage:"Plenitude",time:"23:45",end:"01:15",artist:"mobilegirl"},
      {stage:"Estrella Damm",time:"01:15",end:"02:45",artist:"Gorillaz",headliner:true},
      {stage:"Port",time:"01:30",end:"02:30",artist:"Femtanyl"},
      {stage:"The Levi's Warehouse",time:"00:30",end:"01:30",artist:"Shackleton Live"},
      {stage:"Plenitude",time:"01:15",end:"02:05",artist:"Mechatok Live"},
      {stage:"Occident",time:"03:00",end:"04:15",artist:"Kneecap"},
      {stage:"Schwarzkopf",time:"02:50",end:"03:35",artist:"Nick León Live"},
      {stage:"The Levi's Warehouse",time:"01:30",end:"03:00",artist:"Beatrice M."},
      {stage:"Plenitude",time:"02:05",end:"02:55",artist:"u.r.trax Live"},
      {stage:"Port",time:"03:40",end:"04:30",artist:"Ninajirachi"},
      {stage:"The Levi's Warehouse",time:"03:00",end:"04:00",artist:"A Guy Called Gerald Live"},
      {stage:"Plenitude",time:"02:55",end:"05:00",artist:"JASSS"},
      {stage:"CUPRA",time:"04:15",end:"05:45",artist:"Peggy Gou",headliner:true},
      {stage:"Schwarzkopf",time:"04:35",end:"05:35",artist:"Ecco2k"},
      {stage:"The Levi's Warehouse",time:"04:00",end:"05:30",artist:"DJ Nobu"},
    ]
  },
  { key:"sun", label:"周日 6/7", sub:"Bits", badge:"Carl Cox · Closing", badgeColor:"#C084FC",
    shows:[
      {stage:"CUPRA",time:"15:00",end:"16:30",artist:"Greta"},
      {stage:"CUPRA",time:"16:30",end:"18:00",artist:"BLOND:ISH"},
      {stage:"CUPRA",time:"18:00",end:"20:00",artist:"Joseph Capriati"},
      {stage:"CUPRA",time:"20:00",end:"23:00",artist:"Carl Cox",headliner:true},
    ]
  },
];

function toMins(t) {
  const [h,m] = t.split(':').map(Number);
  return h < 8 ? h*60+m+1440 : h*60+m;
}

let activeDay = 'thu';
let activeStage = null;

function toggleMap() {
  const p = document.getElementById('map-panel');
  const b = document.getElementById('map-btn');
  const open = p.classList.toggle('open');
  b.classList.toggle('active', open);
  b.textContent = open ? '← 排班' : '场地图';
}

function render() {
  const day = DAYS.find(d => d.key === activeDay);
  const si = STAGES;

  // --- Day tabs ---
  document.getElementById('day-tabs').innerHTML = DAYS.map(d => {
    const active = d.key === activeDay;
    return `<button class="day-tab${active?' active':''}" onclick="setDay('${d.key}')"
      style="${active ? 'border-bottom-color:'+d.badgeColor+';' : ''}">
      <div class="dtop">${d.label}</div>
      <div class="dbot" style="color:${active ? d.badgeColor : '#2A2A2A'}">${d.sub}</div>
    </button>`;
  }).join('');

  // --- Filter bar ---
  const stages = [...new Set(day.shows.map(s => s.stage))];
  const count = activeStage
    ? day.shows.filter(s=>s.stage===activeStage).length
    : day.shows.length;

  document.getElementById('filter-bar').innerHTML = `
    <div class="day-badge" style="background:${day.badgeColor}18;border-color:${day.badgeColor}33;color:${day.badgeColor}">
      ★ ${day.badge}
    </div>
    <div class="stage-filters">
      <button class="sf-btn sf-all${!activeStage?' active':''}" onclick="setStage(null)">全部 (${count})</button>
      ${stages.map(s => {
        const info = si[s];
        if (!info) return '';
        const act = activeStage === s;
        return `<button class="sf-btn" onclick="setStage('${s.replace(/'/g,"\\'")}')"
          style="background:${act ? info.color : '#1C2030'};color:${act ? '#000' : info.color};border-color:${info.color}33">
          ${info.emoji} ${info.short}
        </button>`;
      }).join('')}
    </div>`;

  // --- Show list ---
  let shows = activeStage ? day.shows.filter(s=>s.stage===activeStage) : day.shows;
  shows = [...shows].sort((a,b) => toMins(a.time) - toMins(b.time));

  document.getElementById('show-list').innerHTML = shows.map(show => {
    const info = si[show.stage] || {color:'#888',bg:'#11111140',emoji:'🎵',short:'?'};
    const mins = toMins(show.time);
    const late = mins >= 1440;
    const veryLate = mins >= 1440+180;
    const timeColor = veryLate ? '#444' : late ? '#666' : '#DDD';

    return `<div class="show-item${show.headliner?' headliner':''}"
      style="background:${show.headliner ? info.bg : '#0E1017'}">
      ${show.headliner ? `<div class="hl-bar" style="background:${info.color}"></div>` : ''}
      <div class="show-time" style="padding-left:${show.headliner?'5px':'0'}">
        <div class="t-start" style="color:${timeColor}">${show.time}</div>
        <div class="t-end">–${show.end}</div>
        ${veryLate ? '<div class="t-late">凌晨</div>' : ''}
      </div>
      <div class="show-stage-pill"
        style="background:${info.color}18;border-color:${info.color}44;color:${info.color}">
        ${info.emoji} ${info.short}
      </div>
      <div class="show-artist">
        <div class="aname" style="font-size:${show.headliner?'15px':'13px'};font-weight:${show.headliner?'500':'400'};color:${show.headliner?info.color:'#B8B0A0'}">${show.artist}</div>
        ${show.headliner ? `<div class="hl-label" style="color:${info.color}">HEADLINER</div>` : ''}
      </div>
    </div>`;
  }).join('') + `<div class="footer-note">数据来源 Clashfinder · primaverasound.com · ${day.shows.length} 场演出</div>`;
}

function setDay(key) {
  activeDay = key;
  activeStage = null;
  render();
  document.getElementById('day-tabs').scrollIntoView({behavior:'smooth'});
}

function setStage(s) {
  activeStage = s;
  render();
}

render();
</script>
</body>
</html>
