// ── UTILS ──
function toMins(t){var p=t.split(":");return parseInt(p[0])<8?parseInt(p[0])*60+parseInt(p[1])+1440:parseInt(p[0])*60+parseInt(p[1]);}
function getNow(){var n=new Date(),h=n.getHours(),m=n.getMinutes();return h*60+m+(h<8?1440:0);}
function getDay(){var d=new Date(),ds=d.toISOString().slice(0,10);return DAYS.find(function(day){return day.date===ds;})||null;}
function isLive(show){var n=getNow();return n>=toMins(show.time)&&n<toMins(show.end);}

// ── FAVORITES ──
var favs=new Set(JSON.parse(localStorage.getItem("ps26_favs")||"[]"));
function saveFavs(){localStorage.setItem("ps26_favs",JSON.stringify([...favs]));}
function toggleFav(a){if(favs.has(a)){favs.delete(a);}else{favs.add(a);}saveFavs();render();renderFavBar();}
function toggleFavBar(){document.getElementById("fav-bar").classList.toggle("on");renderFavBar();}
function renderFavBar(){
  var list=document.getElementById("fav-list");
  document.getElementById("lbl-favs").textContent=t("favs");
  if(!favs.size){list.innerHTML='<div class="fav-empty">'+t("noFavs")+'</div>';return;}
  list.innerHTML=[...favs].sort().map(function(a){
    return '<div class="fav-chip">'+a+'<span class="rm" onclick="toggleFav(\''+a.replace(/'/g,"\\'")+'\')">\u00d7</span></div>';
  }).join("");
}

// ── CONFLICT DETECTION ──
function getConflicts(shows){
  var c=new Set(),fs=shows.filter(function(s){return favs.has(s.artist);});
  for(var i=0;i<fs.length;i++)for(var j=i+1;j<fs.length;j++){
    var a=fs[i],b=fs[j];
    if(toMins(a.time)<toMins(b.end)&&toMins(a.end)>toMins(b.time)){c.add(a.artist);c.add(b.artist);}
  }
  return c;
}

// ── NOW PLAYING ──
function updateNowPlaying(){
  var today=getDay(),np=document.getElementById("now-playing");
  if(!today){np.style.display="none";return;}
  var nowM=getNow(),cur=null,nxt=null;
  today.shows.forEach(function(s){var sm=toMins(s.time),em=toMins(s.end);if(nowM>=sm&&nowM<em){if(!cur||sm>toMins(cur.time))cur=s;}});
  if(!cur){var up=today.shows.filter(function(s){return toMins(s.time)>nowM;}).sort(function(a,b){return toMins(a.time)-toMins(b.time);});if(up.length)nxt=up[0];}
  if(!cur&&!nxt){np.style.display="none";return;}
  np.style.display="block";
  var show=cur||nxt,si=ST[show.stage]||{color:"#888",e:"🎵",s:show.stage};
  document.getElementById("np-artist").textContent=show.artist;
  document.getElementById("np-artist").style.color=si.color;
  document.getElementById("np-stage").textContent=si.e+" "+show.stage;
  if(cur){var rem=toMins(cur.end)-nowM;document.getElementById("np-countdown").textContent=Math.floor(rem/60)+":"+(rem%60<10?"0":"")+rem%60;document.getElementById("np-until").textContent=t("remaining");document.getElementById("np-label").textContent=t("now");}
  else{var rem2=toMins(nxt.time)-nowM;document.getElementById("np-countdown").textContent=rem2<60?rem2+"min":Math.floor(rem2/60)+"h"+(rem2%60<10?"0":"")+rem2%60;document.getElementById("np-until").textContent=t("startsIn");document.getElementById("np-label").textContent=t("next");}
}
setInterval(updateNowPlaying,30000);

// ── WEATHER ──
var _wxCache=null;
var _wxFallback=[
  {date:"2026-06-03",code:0,max:27,min:19},
  {date:"2026-06-04",code:1,max:26,min:18},
  {date:"2026-06-05",code:0,max:28,min:19},
  {date:"2026-06-06",code:2,max:25,min:18},
  {date:"2026-06-07",code:0,max:27,min:19}
];
var _wxDateLabel={"2026-06-03":"Wed 6/3","2026-06-04":"Thu 6/4","2026-06-05":"Fri 6/5","2026-06-06":"Sat 6/6","2026-06-07":"Sun 6/7"};
function _wxInfo(code,lang){
  var m=[
    [0,"☀️","晴天","Despejado","Clear"],
    [1,"🌤️","晴间多云","Mainly clear","Mainly clear"],
    [2,"⛅","多云","Parcialmente nublado","Partly cloudy"],
    [3,"☁️","阴天","Nublado","Overcast"],
    [45,"🌫️","雾","Niebla","Fog"],[48,"🌫️","冻雾","Niebla helada","Icy fog"],
    [51,"🌦️","小毛毛雨","Llovizna ligera","Light drizzle"],[53,"🌦️","毛毛雨","Llovizna","Drizzle"],[55,"🌦️","浓毛毛雨","Llovizna intensa","Heavy drizzle"],
    [61,"🌧️","小雨","Lluvia ligera","Light rain"],[63,"🌧️","中雨","Lluvia","Rain"],[65,"🌧️","大雨","Lluvia fuerte","Heavy rain"],
    [80,"🌦️","阵雨","Chubascos","Showers"],[81,"🌦️","阵雨","Chubascos","Showers"],[82,"⛈️","强阵雨","Chubascos fuertes","Heavy showers"],
    [95,"⛈️","雷暴","Tormenta","Thunderstorm"],[96,"⛈️","冰雹雷暴","Tormenta c/ granizo","Hail storm"],[99,"⛈️","冰雹雷暴","Tormenta c/ granizo","Hail storm"]
  ];
  var e=m.find(function(r){return r[0]===code;})||[code,"🌡️","未知","Desconocido","Unknown"];
  return {icon:e[1],desc:lang==="zh"?e[2]:lang==="es"?e[3]:e[4]};
}
function _wxRowHtml(data){
  return '<div class="weather-row">'+data.map(function(w){
    var info=_wxInfo(w.code,curLang);
    return '<div class="weather-day"><div class="wd-date">'+(_wxDateLabel[w.date]||w.date.slice(5))+'</div><div class="wd-icon">'+info.icon+'</div><div class="wd-temp">'+w.max+'°C</div><div class="wd-desc">'+info.desc+'</div></div>';
  }).join("")+'</div>';
}
function fetchWeather(cb){
  if(_wxCache){cb(_wxCache);return;}
  var xhr=new XMLHttpRequest();
  xhr.open("GET","https://api.open-meteo.com/v1/forecast?latitude=41.3874&longitude=2.1686&daily=weather_code,temperature_2m_max&timezone=Europe%2FMadrid&start_date=2026-06-03&end_date=2026-06-07");
  xhr.onload=function(){
    if(xhr.status===200){
      try{
        var d=JSON.parse(xhr.responseText).daily;
        _wxCache=d.time.map(function(date,i){return{date:date,code:d.weather_code[i],max:Math.round(d.temperature_2m_max[i])};});
      }catch(e){_wxCache=_wxFallback;}
    }else{_wxCache=_wxFallback;}
    cb(_wxCache);
  };
  xhr.onerror=function(){_wxCache=_wxFallback;cb(_wxCache);};
  xhr.send();
}

// ── STATE ──
var curDay="thu",curView="schedule",curStage=null,curSort="time",activeStageFilter=null,curFavFilter=false;

// ── RENDER ──
function renderDayTabs(){
  document.getElementById("dtabs").innerHTML=DAYS.map(function(d){
    var on=d.key===curDay;
    return '<button class="dtab'+(on?" on":"")+'" onclick="setDay(\''+d.key+'\')" style="'+(on?"border-bottom-color:"+d.bc:"")+'"><div class="dl">'+d.label+'</div><div class="ds" style="color:'+(on?d.bc:"#333")+'">'+t(d.sub)+'</div></button>';
  }).join("");
}

function renderSchedule(){
  var day=DAYS.find(function(d){return d.key===curDay;});
  var stages=[...new Set(day.shows.map(function(s){return s.stage;}))];
  var shows=curStage?day.shows.filter(function(s){return s.stage===curStage;}):day.shows;
  if(curFavFilter)shows=shows.filter(function(s){return favs.has(s.artist);});
  var sorted=[...shows].sort(function(a,b){return curSort==="az"?a.artist.localeCompare(b.artist):toMins(a.time)-toMins(b.time);});
  var isToday=getDay()&&getDay().key===curDay;
  var conflicts=getConflicts(day.shows);
  document.getElementById("fbar").innerHTML=
    
    '<div class="sfs"><button class="sfb all'+(curStage?"":" on")+'" onclick="setStage(null)" data-i="byTime"></button>'+
    stages.map(function(s){var si=ST[s];if(!si)return"";var on=curStage===s;
      return '<button class="sfb" onclick="setStage(\''+s.replace(/'/g,"\\'")+'\')" style="background:'+(on?si.color:"var(--bg3)")+';color:'+(on?"#000":si.color)+';border-color:'+si.color+(on?"cc":"55")+'">'+si.e+" "+si.s+'</button>';
    }).join("")+'</div>';
  var allBtn=document.querySelector('#fbar .sfb.all');if(allBtn)allBtn.textContent=curLang==="zh"?"全部":(curLang==="es"?"Todo":"All");
  document.getElementById("srt-time").classList.toggle("on",curSort==="time");
  document.getElementById("srt-az").classList.toggle("on",curSort==="az");
  document.getElementById("srt-fav").classList.toggle("on",curFavFilter);
  document.getElementById("slist").innerHTML=sorted.map(function(show){
    var si=ST[show.stage]||{color:"#888",bg:"var(--bg)",e:"🎵",s:"?"};
    var m=toMins(show.time),late=m>=1440,vl=m>=1620;
    var live=isToday&&isLive(show),faved=favs.has(show.artist),conflict=conflicts.has(show.artist);
    var tc=vl?"var(--dim)":late?"var(--muted)":"var(--text)";
    return '<div class="si'+(live?" current-set":"")+(faved?" faved":"")+'" style="background:'+(live?"#1A1A00":"var(--bg)")+'">'+
      (show.hl||live?'<div class="hlbar'+(live?" live":"")+'" style="background:'+si.color+'"></div>':"")+
      '<div class="stime" style="padding-left:'+(show.hl||live?"5px":"0")+'">'+
        '<div class="tstart" style="color:'+(live?si.color:tc)+'">'+show.time+'</div>'+
        '<div class="tend">–'+show.end+'</div>'+
        (live?'<div class="scur">'+t("live")+'</div>':vl?'<div class="tlate">AM</div>':"")+
      '</div>'+
      '<div class="spill" style="background:'+si.color+'18;border-color:'+si.color+'44;color:'+si.color+'">'+si.e+" "+si.s+'</div>'+
      '<div class="sartist">'+
        '<div class="aname" style="font-size:'+(show.hl?"15px":"13px")+';font-weight:'+(show.hl?500:400)+';color:'+(live?si.color:show.hl?si.color:"var(--text)")+'">'+show.artist+'</div>'+
        (show.hl?'<div class="hllabel" style="color:'+si.color+'99">'+t("headliner")+'</div>':"")+
        (conflict&&faved?'<div class="conflict-badge">⚠ '+t("conflict")+'</div>':"")+
      '</div>'+
      '<div class="fav-star" onclick="toggleFav(\''+show.artist.replace(/'/g,"\\'")+'\')">'+(faved?"💖":"🤍")+'</div>'+
    '</div>';
  }).join('')+'<div class="foot">'+day.shows.length+' shows · '+day.label+'</div>';
}

function renderMyLineup(){
  var container=document.getElementById("mylist");
  if(!favs.size){container.innerHTML='<div class="my-empty">'+t("myEmpty").replace("\n","<br>")+'</div>';return;}
  var html="";
  DAYS.forEach(function(day){
    var myShows=day.shows.filter(function(s){return favs.has(s.artist);});
    if(!myShows.length)return;
    var sorted=myShows.sort(function(a,b){return toMins(a.time)-toMins(b.time);});
    var conflicts=getConflicts(day.shows);
    var isToday=getDay()&&getDay().key===day.key;
    html+='<div class="my-day-header">'+day.label+' · '+t(day.sub)+'</div>';
    sorted.forEach(function(show){
      var si=ST[show.stage]||{color:"#888",bg:"var(--bg)",e:"🎵",s:"?"};
      var live=isToday&&isLive(show),conflict=conflicts.has(show.artist);
      html+='<div class="my-item'+(conflict?" conflict":"")+(live?" current-set":"")+'" style="background:'+(live?"#1A1A00":conflict?"#3A1000":"var(--bg)")+'">'+
        (live?'<div class="hlbar live" style="background:'+si.color+'"></div>':"")+
        '<div class="stime"><div class="tstart" style="color:'+(live?si.color:"#DDD")+'">'+show.time+'</div><div class="tend">–'+show.end+'</div>'+(live?'<div class="scur">'+t("live")+'</div>':"")+'</div>'+
        '<div class="spill" style="background:'+si.color+'18;border-color:'+si.color+'44;color:'+si.color+'">'+si.e+" "+si.s+'</div>'+
        '<div class="sartist"><div class="aname" style="color:'+(live?si.color:show.hl?si.color:"var(--text)")+'">'+show.artist+'</div>'+
        (conflict?'<div class="my-conflict-label">⚠ '+t("conflict")+'</div>':"")+
        '</div><div class="fav-star on" onclick="toggleFav(\''+show.artist.replace(/'/g,"\\'")+'\')" style="color:var(--gold)">💖</div></div>';
    });
  });
  document.getElementById("mylist").innerHTML=html;
}

// ── INFO ──
function renderInfo(){
  var L=LANGS[curLang];
  var wxHtml=_wxCache?_wxRowHtml(_wxCache):'<div class="weather-loading">'+(_wxCache===null?"⏳ …":"")+'</div>';
  var html=
    '<div class="info-section">'+
      '<div class="info-h">🌤️ '+L.weatherH+'</div>'+
      '<div id="weather-data">'+wxHtml+'</div>'+
      '<div class="info-row" style="margin-top:10px"><div class="info-icon">💡</div><div class="info-text">'+L.weatherNote+'</div></div>'+
    '</div>'+
    '<div class="info-section">'+
      '<div class="info-h">🕐 '+L.doorsH+'</div>'+
      '<div class="info-row"><div class="info-icon">🚪</div><div class="info-text">'+L.doorsBody+'</div></div>'+
    '</div>'+
    '<div class="info-section">'+
      '<div class="info-h">🚇 '+L.transitH+'</div>'+
      '<div class="info-row"><div class="info-icon">🟡</div><div class="info-text"><strong>'+L.metroLine+'</strong><br>'+L.metroStop+'<br><span style="font-size:10px;color:var(--muted)">'+L.metroHours+'</span></div></div>'+
      '<div class="info-row"><div class="info-icon">🚋</div><div class="info-text"><strong>'+L.tramLine+'</strong><br>'+L.tramStop+'</div></div>'+
      '<div class="info-row"><div class="info-icon">🚌</div><div class="info-text"><strong>'+L.daybus+'</strong><br>'+L.daybusDesc+'</div></div>'+
      '<div class="info-row"><div class="info-icon">🌙</div><div class="info-text"><strong>'+L.nightbus+'</strong><br>'+L.nightbusDesc+'</div></div>'+
      '<div class="info-row"><div class="info-icon">🚌</div><div class="info-text"><strong>'+L.shuttle+'</strong><br>'+L.shuttleDesc+'</div></div>'+
      '<div class="info-row"><div class="info-icon">🚲</div><div class="info-text">'+L.bikeDesc+'</div></div>'+
      '<div class="info-row"><div class="info-icon">🚶</div><div class="info-text">'+L.walkDesc+'</div></div>'+
    '</div>'+
    '<div class="info-section">'+
      '<div class="info-h">🚫 '+L.banH+'</div>'+
      '<div style="margin-bottom:8px"><div style="font-size:9px;color:var(--muted);letter-spacing:.1em;margin-bottom:6px">'+L.banLabel.toUpperCase()+'</div>'+
      L.banItems.map(function(i){return '<span class="info-chip red">✕ '+i+'</span>';}).join("")+'</div>'+
      '<div><div style="font-size:9px;color:var(--muted);letter-spacing:.1em;margin-bottom:6px">'+L.allowLabel.toUpperCase()+'</div>'+
      L.allowItems.map(function(i){return '<span class="info-chip green">✓ '+i+'</span>';}).join("")+'</div>'+
    '</div>'+
    '<div class="info-section">'+
      '<div class="info-h">💡 '+L.tipsH+'</div>'+
      L.tips.map(function(tip){return '<div class="info-row"><div class="info-icon">→</div><div class="info-text">'+tip+'</div></div>';}).join("")+
    '</div>';
  document.getElementById("vinfo").innerHTML=html;
  if(!_wxCache){
    fetchWeather(function(){
      var el=document.getElementById("weather-data");
      if(el)el.innerHTML=_wxRowHtml(_wxCache);
    });
  }
}

// ── MAP ──
var _selStage=null;
function renderMap(){
  var day=DAYS.find(function(d){return d.key===curDay;});
  document.getElementById("mapfoot").textContent=day.label+" · "+t("mapHint");
  var inner=document.getElementById("mapinner");
  inner.querySelectorAll(".hs").forEach(function(e){e.remove();});
  _selStage=null;
  var img=document.getElementById("mapimg");
  function place(){
    var liveStages=new Set();
    day.shows.forEach(function(s){if(isLive(s))liveStages.add(s.stage);});
    Object.entries(HOTSPOTS).forEach(function(entry){
      var stage=entry[0],coords=entry[1];
      var l=coords[0],top=coords[1],sw=coords[2],sh=coords[3];
      var si=ST[stage];if(!si)return;
      var hasShows=day.shows.some(function(s){return s.stage===stage;});
      var hasLive=liveStages.has(stage);
      var el=document.createElement("div");
      el.className="hs";
      el.dataset.stage=stage;
      el.style.left=l+"%";el.style.top=top+"%";
      el.style.width=sw+"%";el.style.height=sh+"%";
      el.style.background=hasShows?si.color+"22":"rgba(0,0,0,0)";
      el.style.border=(hasShows?"2px":"1px")+" solid "+(hasShows?si.color+(hasLive?"ff":"77"):"rgba(255,255,255,0.1)");
      if(hasLive){el.style.setProperty("--gc",si.color);el.style.animation="hsglow 2s ease-in-out infinite";}
      var lbl=document.createElement("div");
      lbl.className="hs-label";
      lbl.style.color=hasShows?si.color:"rgba(255,255,255,0.2)";
      lbl.style.fontSize="clamp(8px,2vw,11px)";
      lbl.textContent=si.e+" "+si.s;
      el.appendChild(lbl);
      if(hasShows){el.addEventListener("click",function(e){e.stopPropagation();openStagePop(stage);});}
      inner.appendChild(el);
    });
  }
  if(img.complete&&img.naturalWidth){place();}else{img.onload=place;}
  var pop=document.getElementById("stagepop");
  pop.style.display="none";pop.classList.remove("visible");
}

function dimOthers(s){/* no dimming */}

function openStagePop(stage){
  var day=DAYS.find(function(d){return d.key===curDay;});
  var si=ST[stage];
  var shows=day.shows.filter(function(s){return s.stage===stage;}).sort(function(a,b){return toMins(a.time)-toMins(b.time);});
  var isToday=getDay()&&getDay().key===curDay;
  _selStage=stage;
  document.querySelectorAll(".hs").forEach(function(el){
    el.classList.remove("selected");
    el.style.animation="";
    el.style.boxShadow="";
    if(el.dataset.stage===stage){
      el.classList.add("selected");
      // Direct box-shadow with stage color for guaranteed glow effect
      el.style.boxShadow="0 0 14px 4px "+si.color+"aa, 0 0 28px 8px "+si.color+"55";
      el.style.borderColor=si.color;
      el.style.borderWidth="2px";
    } else {
      el.style.borderColor="";
      el.style.borderWidth="";
    }
  });
  dimOthers(stage);
  var pop=document.getElementById("stagepop");
  pop.style.display="block";pop.classList.remove("visible");
  setTimeout(function(){pop.classList.add("visible");},10);
  var html='<div class="pop-head"><div class="pop-stage" style="color:'+si.color+'">'+si.e+" "+stage+'</div><button class="pop-close" onclick="closePop()">×</button></div><div>';
  if(!shows.length){html+='<div class="pop-empty">'+t("noShows")+'</div>';}
  else{shows.forEach(function(s){
    var live=isToday&&isLive(s),faved=favs.has(s.artist);
    var conflicts=getConflicts(day.shows);
    html+='<div class="pop-show'+(live?" live-row":"")+'">'+
      '<div class="pop-time" style="color:'+(live?si.color:"var(--muted)")+'">'+s.time+'</div>'+
      '<div class="pop-artist'+(s.hl?" hl":"")+'" style="color:'+(s.hl?si.color:"var(--text)")+'">'+s.artist+(live?'<span class="pop-cur">● LIVE</span>':"")+
      (conflicts.has(s.artist)&&faved?' <span style="color:#FF5722">⚠</span>':"")+
      '</div>'+
      '<div class="pop-fav'+(faved?" on":"")+'" onclick="toggleFav(\''+s.artist.replace(/'/g,"\\'")+'\')">'+(faved?"💖":"🤍")+'</div>'+
    '</div>';
  });}
  html+='</div>';pop.innerHTML=html;
  pop.scrollIntoView({behavior:"smooth",block:"nearest"});
}

function closePop(){
  var pop=document.getElementById("stagepop");
  pop.classList.remove("visible");
  setTimeout(function(){pop.style.display="none";},250);
  _selStage=null;
  // Restore default state - re-render map to restore live animations
  document.querySelectorAll(".hs").forEach(function(el){
    el.classList.remove("selected");
    el.style.boxShadow="";
    el.style.borderColor="";
    el.style.borderWidth="";
    // re-apply live glow if needed
    var stageName=el.dataset.stage;
    var day=DAYS.find(function(d){return d.key===curDay;});
    if(day&&day.shows.some(function(s){return s.stage===stageName&&isLive(s);})){
      el.style.animation="hsglow 2s ease-in-out infinite";
    }
  });
}

// ── PINCH-ZOOM ──
var mapState={scale:1,x:0,y:0};
var gesture={active:false,startDist:0,startScale:1,startMidX:0,startMidY:0,startPanX:0,startPanY:0,dragging:false,dragStartX:0,dragStartY:0};
function applyMapTransform(){
  mapState.scale=Math.min(5,Math.max(0.8,mapState.scale));
  var inner=document.getElementById("mapinner"),wrap=document.getElementById("mapwrap");
  var iw=inner.offsetWidth*mapState.scale,ih=inner.offsetHeight*mapState.scale;
  var ww=wrap.offsetWidth,wh=wrap.offsetHeight;
  mapState.x=Math.min(0,Math.max(Math.min(0,ww-iw),mapState.x));
  mapState.y=Math.min(0,Math.max(Math.min(0,wh-ih),mapState.y));
  inner.style.transformOrigin="0 0";
  inner.style.transform="translate("+mapState.x+"px,"+mapState.y+"px) scale("+mapState.scale+")";
}
function mapZoom(f){var wrap=document.getElementById("mapwrap");var cx=wrap.offsetWidth/2,cy=wrap.offsetHeight/2;mapState.x=cx-(cx-mapState.x)*f;mapState.y=cy-(cy-mapState.y)*f;mapState.scale*=f;applyMapTransform();}
function mapReset(){mapState={scale:1,x:0,y:0};var inner=document.getElementById("mapinner");inner.style.transform="";}
function initMapGestures(){
  var wrap=document.getElementById("mapwrap");
  if(!wrap||wrap._gi)return;wrap._gi=true;
  wrap.addEventListener("touchstart",function(e){
    if(e.touches.length===2){gesture.active=true;gesture.dragging=false;gesture.startDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);gesture.startScale=mapState.scale;gesture.startMidX=(e.touches[0].clientX+e.touches[1].clientX)/2;gesture.startMidY=(e.touches[0].clientY+e.touches[1].clientY)/2;gesture.startPanX=mapState.x;gesture.startPanY=mapState.y;e.preventDefault();}
    else if(e.touches.length===1&&!gesture.active){gesture.dragging=true;gesture.dragStartX=e.touches[0].clientX-mapState.x;gesture.dragStartY=e.touches[0].clientY-mapState.y;}
  },{passive:false});
  wrap.addEventListener("touchmove",function(e){
    if(e.touches.length===2&&gesture.active){e.preventDefault();var dist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);var ns=gesture.startScale*(dist/gesture.startDist);var midX=(e.touches[0].clientX+e.touches[1].clientX)/2,midY=(e.touches[0].clientY+e.touches[1].clientY)/2;var rect=wrap.getBoundingClientRect();var ox=midX-rect.left,oy=midY-rect.top;mapState.x=ox-(ox-gesture.startPanX)*(ns/gesture.startScale)+(midX-gesture.startMidX);mapState.y=oy-(oy-gesture.startPanY)*(ns/gesture.startScale)+(midY-gesture.startMidY);mapState.scale=ns;applyMapTransform();}
    else if(e.touches.length===1&&gesture.dragging){e.preventDefault();mapState.x=e.touches[0].clientX-gesture.dragStartX;mapState.y=e.touches[0].clientY-gesture.dragStartY;applyMapTransform();}
  },{passive:false});
  wrap.addEventListener("touchend",function(e){if(e.touches.length<2)gesture.active=false;if(e.touches.length===0)gesture.dragging=false;});
}

// ── NAV ──
function setView(v,btn){
  curView=v;curStage=null;
  document.querySelectorAll(".view").forEach(function(el){el.classList.remove("on");});
  document.getElementById("v"+v).classList.add("on");
  document.querySelectorAll(".vt").forEach(function(el){el.classList.remove("on");});
  if(btn)btn.classList.add("on");
  // hide day tabs for info view
  var dtabs=document.getElementById("dtabs");
  if(v==="info"){dtabs.style.display="none";}else{dtabs.style.display="";}
  if(v==="schedule")renderSchedule();
  else if(v==="my")renderMyLineup();
  else if(v==="info")renderInfo();
  else{renderMap();setTimeout(initMapGestures,200);}
}
function setDay(k){
  curDay=k;curStage=null;
  renderDayTabs();
  if(curView==="schedule")renderSchedule();
  else if(curView==="my")renderMyLineup();
  else if(curView==="map"){renderMap();setTimeout(initMapGestures,200);}
  window.scrollTo({top:0,behavior:"smooth"});
}
function setStage(s){curStage=s;renderSchedule();}
function setSort(s){curSort=s;renderSchedule();}
function toggleFavFilter(){curFavFilter=!curFavFilter;renderSchedule();}
function render(){
  if(curView==="schedule")renderSchedule();
  else if(curView==="my")renderMyLineup();
  else if(curView==="info")renderInfo();
  renderFavBar();
}

// ── THEME ──
function toggleTheme(){
  var body=document.body;
  var btn=document.getElementById("theme-btn");
  if(body.classList.contains("light-mode")){
    body.classList.remove("light-mode");
    document.documentElement.classList.remove("light-mode");
    btn.textContent="🌙";
    localStorage.setItem("ps26_theme","dark");
  } else {
    body.classList.add("light-mode");
    document.documentElement.classList.add("light-mode");
    btn.textContent="☀️";
    localStorage.setItem("ps26_theme","light");
  }
}
// restore saved theme
(function(){
  var saved=localStorage.getItem("ps26_theme");
  if(saved==="light"){document.body.classList.add("light-mode");document.documentElement.classList.add("light-mode");document.getElementById("theme-btn").textContent="☀️";}
})();

// ── INIT ──
renderDayTabs();
renderSchedule();
renderFavBar();
updateNowPlaying();
(function(){
  var hdr=document.getElementById("hdr");
  function syncHdrH(){document.documentElement.style.setProperty("--hdr-h",hdr.offsetHeight+"px");}
  syncHdrH();
  if(window.ResizeObserver){new ResizeObserver(syncHdrH).observe(hdr);}
  else{window.addEventListener("resize",syncHdrH);}
})();