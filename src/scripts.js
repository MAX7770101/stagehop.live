// ── UTILS ──
function toMins(t){var p=t.split(":");return parseInt(p[0])<8?parseInt(p[0])*60+parseInt(p[1])+1440:parseInt(p[0])*60+parseInt(p[1]);}

function _localDs(d){var p=function(n){return n<10?"0"+n:String(n);};return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate());}
function _effectiveDate(){var d=new Date();if(d.getHours()<8){d=new Date(d.getTime()-864e5);}return d;}
function getNow(){var n=new Date(),h=n.getHours(),m=n.getMinutes();return h*60+m+(h<8?1440:0);}
function getDay(){return DAYS.find(function(day){return day.date===_localDs(_effectiveDate());})||null;}
function isLive(show){var n=getNow();return n>=toMins(show.time)&&n<toMins(show.end);}

// ── ANALYTICS ──
function vaTrack(name,data){try{if(typeof window.va==='function')window.va('event',data?{name:name,data:data}:{name:name});}catch(e){}}

// ── FAVORITES ──
var favs=new Set(JSON.parse(localStorage.getItem("ps26_favs")||"[]"));
function saveFavs(){localStorage.setItem("ps26_favs",JSON.stringify([...favs]));}

// Heart pop state: tracks which artists have the animation active across re-renders
var _heartPop=new Set();

function toggleFavAnim(a,btn){
  var wasOff=!favs.has(a);
  if(wasOff)_heartPop.add(a);
  toggleFav(a);
  if(wasOff){setTimeout(function(){_heartPop.delete(a);},460);}
}

function toggleFav(a){
  if(favs.has(a)){favs.delete(a);}else{favs.add(a);vaTrack('favorite_artist');}
  saveFavs();render();updateFavHead();updateNowPlaying();
  if(curView==="map"&&_selStage)openStagePop(_selStage);
}

// Update favorites count badge in tab bar and favorites screen subtitle
function updateFavHead(){
  var cnt=favs.size;
  // tab badge
  var ic=document.getElementById("fav-tab-ic");
  if(ic){
    var badge=ic.querySelector(".tab-badge");
    if(cnt>0){
      if(!badge){badge=document.createElement("span");badge.className="tab-badge";ic.appendChild(badge);}
      badge.textContent=cnt;
    }else{
      if(badge)badge.remove();
    }
  }
  // favorites screen subtitle
  var el=document.getElementById("lbl-fav-count");
  if(el)el.textContent=cnt+" SAVED ♥";
  // screen title
  var titleEl=document.getElementById("lbl-fav-title");
  if(titleEl)titleEl.textContent=t("navFavs")||"我的收藏";
}

// renderFavBar kept as stub for backward compat (called from localization setLang)
function renderFavBar(){updateFavHead();}
function toggleFavBar(){/* replaced by tab-based favorites view */}

// ── CONFLICT DETECTION ──
function getConflicts(shows){
  var c=new Set(),fs=shows.filter(function(s){return favs.has(s.artist)&&!s.cancelled;});
  for(var i=0;i<fs.length;i++)for(var j=i+1;j<fs.length;j++){
    var a=fs[i],b=fs[j];
    if(toMins(a.time)<toMins(b.end)&&toMins(a.end)>toMins(b.time)){c.add(a.artist);c.add(b.artist);}
  }
  return c;
}

// ── NOW PLAYING / UP NEXT ──
var _npExpanded=false,_npToShow=[];
function updateNowPlaying(){
  var today=getDay(),np=document.getElementById("now-playing");
  if(!np)return;
  if(curView==="home"||!today){np.style.display="none";refreshMapGlow();return;}
  var nowM=getNow();
  var newToShow;
  if(favs.size){
    var upFavs=today.shows
      .filter(function(s){return favs.has(s.artist)&&!s.cancelled&&toMins(s.time)>=nowM;})
      .sort(function(a,b){return toMins(a.time)-toMins(b.time)||a.artist.localeCompare(b.artist);});
    if(!upFavs.length){np.style.display="none";refreshMapGlow();return;}
    var pivot=upFavs[0];
    newToShow=upFavs.filter(function(s){
      return toMins(pivot.time)<toMins(s.end)&&toMins(s.time)<toMins(pivot.end);
    });
  }else{
    var upAll=today.shows
      .filter(function(s){return !s.cancelled&&toMins(s.time)>=nowM;})
      .sort(function(a,b){return toMins(a.time)-toMins(b.time)||a.artist.localeCompare(b.artist);});
    if(!upAll.length){np.style.display="none";refreshMapGlow();return;}
    var pivot=upAll[0];
    if(toMins(pivot.time)-nowM>60){np.style.display="none";refreshMapGlow();return;}
    newToShow=upAll.filter(function(s){return toMins(s.time)===toMins(pivot.time);});
  }
  var changed=newToShow.length!==_npToShow.length||newToShow.some(function(s,i){return s.artist!==(_npToShow[i]&&_npToShow[i].artist);});
  if(changed)_npExpanded=false;
  _npToShow=newToShow;
  np.style.display="block";
  renderNpRows();
  refreshMapGlow();
}
function npToggleExpand(){_npExpanded=!_npExpanded;renderNpRows();}
function renderNpRows(){
  var today=getDay();
  var nowM=getNow();
  var visible=_npExpanded?_npToShow:_npToShow.slice(0,3);
  var groups=[];
  visible.forEach(function(s){
    var last=groups[groups.length-1];
    if(last&&last[0].time===s.time){last.push(s);}else{groups.push([s]);}
  });
  var dateLabel=today&&_wxDateLabel[today.date]?_wxDateLabel[today.date].toUpperCase():"";
  var hdr='<div class="np-header">UP NEXT · '+dateLabel+'</div>';
  document.getElementById("np-rows").innerHTML=hdr+groups.map(function(group){
    var mins=toMins(group[0].time)-nowM;
    var isNow=mins<=0;
    var ct=isNow?"NOW":mins<60?mins+"m":Math.floor(mins/60)+"h"+(mins%60<10?"0":"")+mins%60;
    var tc=isNow?"var(--accent-text)":"var(--dim)";
    return '<div class="np-group">'+
      '<div class="np-group-artists">'+
      group.map(function(s){
        var si=ST[s.stage]||{color:"#888",e:"🎵",s:"?"};
        return '<div class="np-row">'+
          '<div class="spill" style="background:'+si.color+'22;border-color:'+si.color+'44;color:'+si.color+'">'+si.e+" "+si.s+'</div>'+
          '<div class="np-name">'+s.artist+'</div>'+
          '</div>';
      }).join("")+
      '</div>'+
      '<div class="np-time" style="color:'+tc+';font-weight:400">'+ct+'</div>'+
      '</div>';
  }).join("");
  var more=document.getElementById("np-more");
  if(!_npExpanded&&_npToShow.length>3){
    more.innerHTML='<span class="np-more-link" onclick="npToggleExpand()">+ '+(_npToShow.length-3)+" "+t("more")+' ▾</span>';
  }else if(_npExpanded&&_npToShow.length>3){
    more.innerHTML='<span class="np-more-link" onclick="npToggleExpand()">'+t("collapse")+' ▴</span>';
  }else{more.innerHTML="";}
}
function refreshMapGlow(){
  var stages=new Set(_npToShow.map(function(s){return s.stage;}));
  document.querySelectorAll(".hs").forEach(function(el){
    var s=el.dataset.stage,si=ST[s]||{color:"#888"};
    var anim=el.style.animation||"";
    if(anim.indexOf("hsglow")!==-1)return;
    if(stages.has(s)){
      el.style.setProperty("--gc",si.color);
      el.style.animation="upnextglow 3s ease-in-out infinite";
    }else{
      if(anim.indexOf("upnextglow")!==-1)el.style.animation="";
    }
  });
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
    return '<div class="weather-day"><div class="wd-date">'+(_wxDateLabel[w.date]||w.date.slice(5))+'</div><div class="wd-icon">'+info.icon+'</div><div class="wd-temp">'+w.max+'°</div><div class="wd-desc">'+info.desc+'</div></div>';
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
var curDay="thu",curView="home",curStage=null,curSort="time",activeStageFilter=null,curFavFilter=false,curShowPast=false;
var curTab=parseInt(localStorage.getItem("sh.tab")||"0");
var TAB_VIEWS=["home","schedule","map","my","info"];

// ── HOME SCREEN ──
var _langMenuOpen=false;
var _homeNpExpanded=false;
function toggleHomeNp(){_homeNpExpanded=!_homeNpExpanded;renderHome();}
function toggleLangMenu(e){
  e.stopPropagation();
  _langMenuOpen=!_langMenuOpen;
  var d=document.getElementById("lang-dd");
  if(d)d.classList.toggle("open",_langMenuOpen);
  var a=document.getElementById("lang-dd-arrow");
  if(a)a.textContent=_langMenuOpen?"▴":"▾";
  if(_langMenuOpen)setTimeout(function(){document.addEventListener("click",closeLangMenu,{once:true});},0);
}
function closeLangMenu(){
  _langMenuOpen=false;
  var d=document.getElementById("lang-dd");if(d)d.classList.remove("open");
  var a=document.getElementById("lang-dd-arrow");if(a)a.textContent="▾";
}
function renderHome(){
  var body=document.getElementById("home-body");
  if(!body)return;
  var festStart=new Date("2026-06-03T00:00:00");
  var today=new Date();today.setHours(0,0,0,0);
  var days=Math.ceil((festStart-today)/86400000);
  var daysStr=days>0?(days<10?"0"+days:String(days)):"0";
  var isZh=curLang==="zh"||curLang==="zht";
  var daysUnit=isZh?" 天":curLang==="es"?" días":curLang==="ca"?" dies":" days";
  var isDark=document.body.getAttribute("data-theme")==="dark";
  var toggleIcon=isDark?"☾":"☀";
  var toggleLbl=getThemeLbl(isDark);
  var festDateRange=curLang==="zht"?"6月 3—7 日":isZh?"6月 3—7 日":curLang==="es"?"3—7 JUN":curLang==="ca"?"3—7 JUN":"JUN 3—7";
  var festDuration=isZh?"5 天":curLang==="es"?"5 días":curLang==="ca"?"5 dies":"5 days";
  // Festival day: build "Up Next" card; pre-festival: countdown
  var todayFest=getDay();
  var homeCard;
  if(todayFest){
    var nowMH=getNow(),upFestShows=[],upHdr="UP NEXT";
    if(favs.size){
      var upFavsH=todayFest.shows
        .filter(function(s){return favs.has(s.artist)&&!s.cancelled&&toMins(s.time)>=nowMH;})
        .sort(function(a,b){return toMins(a.time)-toMins(b.time);});
      if(upFavsH.length){
        var pivH=upFavsH[0];
        upFestShows=upFavsH.filter(function(s){return toMins(pivH.time)<toMins(s.end)&&toMins(s.time)<toMins(pivH.end);});
      }
    }
    if(!upFestShows.length){
      var liveH=todayFest.shows
        .filter(function(s){return !s.cancelled&&isLive(s);})
        .sort(function(a,b){return toMins(a.time)-toMins(b.time);});
      if(liveH.length){
        upFestShows=liveH;
        upHdr="NOW PLAYING";
      } else {
        upFestShows=todayFest.shows
          .filter(function(s){return s.hl&&!s.cancelled&&toMins(s.time)>=nowMH;})
          .sort(function(a,b){return toMins(a.time)-toMins(b.time);})
          .slice(0,1);
      }
    }
    if(upFestShows.length){
      var minsH=toMins(upFestShows[0].time)-nowMH;
      var ctH=minsH<=0?"NOW":minsH<60?minsH+"m":Math.floor(minsH/60)+"h"+(minsH%60<10?"0":"")+minsH%60;
      var visH=_homeNpExpanded?upFestShows:upFestShows.slice(0,3);
      var extraH=upFestShows.length-3;
      homeCard='<div class="home-upnext-card">'+
        '<div class="home-upnext-hdr">'+upHdr+' · '+todayFest.label.toUpperCase()+'</div>'+
        visH.map(function(s){
          var si2=ST[s.stage]||{color:"#888",e:"🎵",s:"?"};
          return '<div class="np-row">'+
            '<div class="spill" style="background:'+si2.color+'22;border-color:'+si2.color+'44;color:'+si2.color+'">'+si2.e+" "+si2.s+'</div>'+
            '<div class="np-name">'+s.artist+'</div>'+
            '<div class="np-time" style="color:var(--dim);font-size:12px;font-weight:400">'+ctH+'</div>'+
            '</div>';
        }).join("")+
        (!_homeNpExpanded&&extraH>0?'<span class="np-more-link" onclick="toggleHomeNp()">+ '+extraH+' '+t("more")+' ▾</span>':"")+
        (_homeNpExpanded&&upFestShows.length>3?'<span class="np-more-link" onclick="toggleHomeNp()">'+t("collapse")+' ▴</span>':"")+
        '</div>';
    }else{homeCard='';}
  }else{
    homeCard='<div class="countdown-card">'+
      '<div>'+
        '<div class="countdown-label mono">COUNTDOWN</div>'+
        '<div class="countdown-days syne">'+daysStr+'<span class="countdown-days-unit dim">'+daysUnit+'</span></div>'+
      '</div>'+
      '<div class="countdown-dates mono">'+festDateRange+'<br>'+festDuration+'</div>'+
      '</div>';
  }
  var navItemsData=[
    [curLang==="zht"?"演出 & 撞期":isZh?"演出 & 撞车检测":curLang==="es"?"Horario & choques":curLang==="ca"?"Horari & xocs":"Schedule & clashes",
     curLang==="zht"?"5日 · 19舞台 · 撞期":isZh?"5天 · 19舞台 · 撞车检测":curLang==="es"?"5 días · 19 escenarios · solapamientos":curLang==="ca"?"5 dies · 19 escenaris · solapaments":"5 days · 19 stages · clash detection",1],
    [curLang==="zht"?"場地地圖":isZh?"场地地图":curLang==="es"?"Mapa del recinto":curLang==="ca"?"Mapa del recinte":"Venue map",
     curLang==="zht"?"場地熱圖 · 舞台位置":isZh?"场地热图 · 舞台位置":curLang==="es"?"Plano del recinto y escenarios":curLang==="ca"?"Plànol del recinte i escenaris":"Stage locations & venue",2],
    [curLang==="zht"?"我嘅最愛":isZh?"我的收藏":curLang==="es"?"Mis favoritos":curLang==="ca"?"Els meus favorits":"My Favorites",
     curLang==="zht"?"收藏藝人 · 睇我嘅行程":isZh?"收藏艺人 · 查看我的行程":curLang==="es"?"Artistas guardados · tu agenda personal":curLang==="ca"?"Artistes desats · la teva agenda":"Saved artists & your itinerary",3],
    [curLang==="zht"?"實用資訊":isZh?"实用信息":curLang==="es"?"Info práctica":curLang==="ca"?"Info pràctica":"Practical info",
     curLang==="zht"?"交通 · 禁帶 · 實用貼士":isZh?"交通 · 禁带 · 实用贴士":curLang==="es"?"Transporte, normas y consejos":curLang==="ca"?"Transport, normes i consells":"Know before you go",4]
  ];
  var langs=[["简中","zh"],["繁中","zht"],["Español","es"],["Català","ca"],["English","en"]];
  var langShort={zh:"中",zht:"繁",es:"ES",ca:"CA",en:"EN"};
  body.innerHTML=
    '<div class="home-top">'+
      '<div class="home-brand-label mono">春日之声 · Unofficial</div>'+
      '<div class="home-top-controls">'+
        '<button class="theme-toggle" onclick="toggleTheme(event)">'+
          '<span class="theme-toggle-icon">'+toggleIcon+'</span>'+
          '<span class="theme-toggle-lbl">'+toggleLbl+'</span>'+
        '</button>'+
        '<div class="lang-menu" onclick="event.stopPropagation()">'+
          '<button class="lang-menu-btn" onclick="toggleLangMenu(event)">'+
            langShort[curLang]+
            ' <span class="lang-menu-arrow" id="lang-dd-arrow">▾</span>'+
          '</button>'+
          '<div class="lang-menu-dd" id="lang-dd">'+
            langs.map(function(l){
              return '<button class="lang-menu-item'+(curLang===l[1]?" on":"")+'" onclick="closeLangMenu();setLang(\''+l[1]+'\')">'+l[0]+'</button>';
            }).join("")+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="home-wordmark syne">stage<br>hop<span class="dot" style="width:12px;height:12px;vertical-align:middle;margin-left:2px;display:inline-block"></span></div>'+
    '<div class="home-ps-title syne">PRIMAVERA SOUND 2026</div>'+
    '<div class="home-location mono">Barcelona · Parc del Fòrum</div>'+
    homeCard+
    (function(){var m={"en":"☀️ Jun 5 — weather's looking better today. Yesterday's communication from the festival was not great. Finding out shows were cancelled via Twitter rather than any on-site announcement is not okay for a festival this size. Anyway. Today: The Cure, The xx, Gorillaz. Let's go 🖤<br>Stay hydrated, check your favourites for any remaining time changes.<br>I will be at the venue, but I have bribed my partner to do the updates at home, so blame him for slow updates XD","es":"☀️ 5 jun — el tiempo pinta mejor hoy. La comunicación del festival ayer fue bastante penosa. Enterarse de las cancelaciones por Twitter en vez de anuncios en el recinto no está bien para un festival de este tamaño.<br>En fin. Hoy: The Cure, The xx, Gorillaz. ¡Vamos 🖤<br>Manteneos hidratados y revisad vuestros favoritos por si quedan cambios de horario.<br>Estaré en el recinto, pero he sobornado a mi pareja para que haga las actualizaciones desde casa, así que culpad a mi chico si van lentas XD","ca":"☀️ 5 jun — avui el temps millora. La comunicació del festival ahir va ser bastant decepcionant. Assabentar-se de les <span style='white-space:nowrap'>cancel·lacions</span> per Twitter en comptes d'anuncis al recinte no és acceptable per a un festival d'aquesta mida.<br>En fi. Avui: The Cure, The xx, Gorillaz. Anem 🖤<br>Hidrateu-vos i reviseu els vostres favorits per si queden canvis d'horari.<br>Seré al recinte, però he subornat la meva parella perquè faci les actualitzacions des de casa, així que culpeu-lo a ell si van lentes XD","zh":"☀️ 6月5日 — 今天天气好多了。<br>昨天音乐节的信息发布实在太差了。这么大的音乐节，大家都是靠推特才知道演出取消的，不是现场通知，真的说不过去。<br>不管了，今天：The Cure、The xx、Gorillaz冲冲冲！<br>注意补水，看看你的收藏有没有剩余的时间变动。<br>我会在现场，但我收买了我男朋友在家帮忙更新，慢的话怪他 XD","zht":"☀️ 6月5日 — 今日天氣好多了。昨日音樂節嘅資訊發放實在唔係咁好。咁大嘅音樂節，觀眾要靠Twitter先知道演出取消，而唔係現場廣播，真係唔應該。唔理住，今日：The Cure、The xx、Gorillaz，出發喇 🖤<br>記得補水，睇下你收藏嘅演出有冇剩餘時間變動。<br>我會喺現場，不過我已經賄賂咗我男友喺屋企幫手更新，更新慢嘅話去怪佢囉 &lt;3"};return'<div class="home-banner">'+(m[curLang]||m.en)+'</div>';})()+
    (function(){var m={"en":"📢 Refund update from PS official — Thursday single-day ticket holders will be refunded. Three-day pass holders are not included.🤡 @#$%&!!<br>Details on Monday.","es":"📢 Actualización oficial de PS — Los poseedores de entrada de un día del jueves serán reembolsados. Los abonos de tres días no están incluidos.🤡 @#$%&!!<br>Detalles el lunes.","ca":"📢 Actualització oficial de PS — Els posseïdors d'entrada d'un dia del dijous seran reemborsats. Els abonaments de tres dies no hi estan inclosos.🤡 @#$%&!!<br>Detalls el dilluns.","zh":"📢 PS官方退票更新 — 周四单日票持有者将获退款。三日通票持有者不在退款范围内。🤡 @#$%&!!<br>详情周一公布。","zht":"📢 PS官方退票更新 — 周四單日票持有者將獲退款。三日通票持有者不在退款範圍內。🤡 @#$%&!!<br>詳情周一公布。"};return'<div class="home-banner">'+(m[curLang]||m.en)+'</div>';})()+
    '<div class="home-nav">'+
    navItemsData.map(function(item,i){
      return '<div class="home-nav-item" onclick="setTab('+item[2]+')">'+
        '<div>'+
          '<div class="home-nav-title">'+item[0]+'</div>'+
          '<div class="home-nav-sub mono">'+item[1]+'</div>'+
        '</div>'+
        '<span class="home-nav-arrow dim">›</span>'+
      '</div>';
    }).join("")+
    '</div>'+
    '<div class="home-spacer"></div>'+
    sharedFooterHtml();
}

// ── TAB NAVIGATION ──
function setTab(n){
  if(n<0||n>4)n=0;
  curTab=n;
  localStorage.setItem("sh.tab",n);
  var v=TAB_VIEWS[n];
  // hide all views
  ["vhome","vschedule","vmap","vmy","vinfo"].forEach(function(id){
    var el=document.getElementById(id);
    if(!el)return;
    el.classList.remove("on","screen-anim");
  });
  // show target with entrance animation
  var target=document.getElementById("v"+v);
  if(target){
    void target.offsetWidth; // force reflow
    target.classList.add("on","screen-anim");
  }
  // update tab buttons
  document.querySelectorAll(".tab-btn").forEach(function(btn,i){
    btn.classList.toggle("on",i===n);
  });
  // slide indicator dot
  var ind=document.getElementById("tab-ind");
  if(ind)ind.style.left="calc("+n+" * 20% + 10%)";
  // sync curView for compat
  curView=v;
  curStage=null;
  vaTrack("view_tab",{tab:n,view:v});
  // render view
  if(v==="home"){renderHome();updateNowPlaying();}
  else if(v==="schedule"){renderDayTabs();renderSchedule();updateNowPlaying();}
  else if(v==="map"){renderDayTabs();renderMap();setTimeout(initMapGestures,200);updateNowPlaying();}
  else if(v==="my"){renderMyLineup();updateFavHead();updateNowPlaying();}
  else if(v==="info"){renderInfo();updateNowPlaying();}
}

// Legacy setView kept for internal callers (setDay, render, etc.)
function setView(v){
  var idx=TAB_VIEWS.indexOf(v);
  if(idx<0){
    // Map old view names to tab indices
    if(v==="schedule")idx=1;
    else if(v==="map")idx=2;
    else if(v==="my")idx=3;
    else if(v==="info")idx=4;
    else idx=0;
  }
  // Only update curView and re-render, don't animate (setView is for internal calls)
  curView=v;
  if(v==="schedule")renderSchedule();
  else if(v==="my")renderMyLineup();
  else if(v==="info")renderInfo();
  else if(v==="map"){renderDayTabs();renderMap();setTimeout(initMapGestures,200);}
}

// ── RENDER ──
function renderDayTabs(){
  var html=DAYS.map(function(d){
    var on=d.key===curDay;
    var shortLabel=d.label.split(" ")[0];
    return '<button class="dtab'+(on?" on":"")+'" onclick="setDay(\''+d.key+'\')">' +
      '<div class="dl">'+shortLabel+'</div>'+
    '</button>';
  }).join("");
  ["dtabs","dtabs-map"].forEach(function(id){
    var el=document.getElementById(id);
    if(el)el.innerHTML=html;
  });
}

function renderSchedule(){
  var day=DAYS.find(function(d){return d.key===curDay;});
  // Update schedule screen subtitle
  var subEl=document.getElementById("sched-sub");
  if(subEl)subEl.textContent=day.label+" · "+day.shows.length+" ACTS";

  var stages=[...new Set(day.shows.map(function(s){return s.stage;}))];
  var shows=curStage?day.shows.filter(function(s){return s.stage===curStage;}):day.shows;
  if(curFavFilter)shows=shows.filter(function(s){return favs.has(s.artist);});
  var sorted=[...shows].sort(function(a,b){return curSort==="az"?a.artist.localeCompare(b.artist):toMins(a.time)-toMins(b.time);});
  var todayDs=_localDs(_effectiveDate());
  var isPastDay=day.date<todayDs;
  var isToday=!isPastDay&&getDay()&&getDay().key===curDay;
  var conflicts=getConflicts(day.shows);

  // Filter bar
  var allLbl=(curLang==="zh"||curLang==="zht")?"全部":curLang==="es"?"Todo":curLang==="ca"?"Tot":"All";
  document.getElementById("fbar").innerHTML=
    '<div class="sfs"><button class="sfb all'+(curStage?"":" on")+'" onclick="setStage(null)">'+allLbl+'</button>'+
    stages.map(function(s){var si=ST[s];if(!si)return"";var on=curStage===s;
      return '<button class="sfb" onclick="setStage(\''+s.replace(/'/g,"\\'")+'\')" style="background:'+(on?si.color:"var(--surface)")+';color:'+(on?"#000":si.color)+';border-color:'+si.color+(on?"cc":"55")+'">'+si.e+" "+si.s+'</button>';
    }).join("")+'</div>';

  document.getElementById("srt-time").classList.toggle("on",curSort==="time");
  document.getElementById("srt-az").classList.toggle("on",curSort==="az");
  document.getElementById("srt-fav").classList.toggle("on",curFavFilter);

  // Split past / upcoming
  var pastShows=[],upcomingShows=sorted;
  if(isPastDay){
    pastShows=sorted;
    upcomingShows=[];
  } else if(isToday){
    var nowM=getNow();
    pastShows=sorted.filter(function(s){return toMins(s.end)<=nowM;});
    upcomingShows=sorted.filter(function(s){return toMins(s.end)>nowM;});
  }

  var cardHtml=function(show,isPast){
    var si=ST[show.stage]||{color:"#888",e:"🎵",s:"?"};
    var isCancelled=show.cancelled===true;
    var isRescheduled=!!show.origTime;
    var live=isToday&&!isPast&&!isCancelled&&isLive(show);
    var faved=favs.has(show.artist);
    var conflict=conflicts.has(show.artist)&&faved&&!isCancelled;
    var pop=_heartPop.has(show.artist);
    var dim=isPast||isCancelled;
    var timeColor=conflict?"var(--conflict)":live?"var(--accent-text)":"var(--text)";
    var cardBorder=live?"border-color:var(--accent-soft);box-shadow:inset 3px 0 0 "+si.color
      :conflict?"border-color:var(--conflict-soft);box-shadow:inset 3px 0 0 var(--conflict)":"";
    var startHtml=isRescheduled?'<s class="orig-time">'+show.origTime+'</s><br><b>'+show.time+'</b>':show.time;
    var endHtml=isRescheduled?'<s class="orig-time">'+show.origEnd+'</s><br><b>'+show.end+'</b>':show.end;
    return '<div class="si'+(live?" current-set":"")+(faved?" faved":"")+(isPast?" past":"")+(isCancelled?" cancelled":"")+'" style="'+cardBorder+'" >'+
      '<div class="stime">'+
        '<div class="tstart mono" style="color:'+(dim?"var(--dim)":timeColor)+'">'+startHtml+'</div>'+
        '<div class="tend">'+endHtml+'</div>'+
        (live?'<div class="scur mono">LIVE</div>':"")+
      '</div>'+
      '<div class="sartist">'+
        '<div class="aname" style="color:'+(dim?"var(--dim)":live?si.color:"var(--text)")+'">'+show.artist+(show.hl&&!isCancelled?' <span class="hl-badge">Headliner</span>':'')+(isCancelled?' <span class="cancelled-badge">cancelled</span>':'')+' </div>'+
        '<div class="sc-stage-lbl mono" style="color:'+(dim?"var(--dim)":si.color)+'">'+si.e+" "+si.s+(conflict?' <span style="color:var(--conflict)">· '+t("conflict")+'</span>':"")+
        '</div>'+
      '</div>'+
      (isCancelled?'<div class="heart-btn" style="opacity:0.25;pointer-events:none"><span class="glyph">♡</span></div>':
      '<button class="heart-btn'+(faved?" on":"")+(pop?" pop":"")+'" onclick="toggleFavAnim(\''+show.artist.replace(/'/g,"\\'")+'\',this)">'+
        '<span class="ring"></span><span class="glyph">'+(faved?"♥":"♡")+'</span>'+
      '</button>')+
    '</div>';
  };

  var pastBtn="";
  if(isToday&&pastShows.length){
    pastBtn='<button class="past-toggle'+(curShowPast?" on":"")+'" onclick="toggleShowPast()">'+
      (curShowPast?"▲ "+t("hidePast"):"▼ "+pastShows.length+" "+t("showPast"))+'</button>';
  }
  var html=pastBtn;
  if(isPastDay){
    html+=pastShows.map(function(s){return cardHtml(s,true);}).join("");
  } else {
    if(isToday&&curShowPast&&pastShows.length){
      html+=pastShows.map(function(s){return cardHtml(s,true);}).join("")+'<div class="past-sep"></div>';
    }
    html+=upcomingShows.map(function(s){return cardHtml(s,false);}).join("");
  }
  html+='<div class="foot">'+day.shows.length+' shows · '+day.label+'</div>';
  document.getElementById("slist").innerHTML=html;
}

function renderMyLineup(){
  var container=document.getElementById("mylist");
  if(!favs.size){
    container.innerHTML='<div class="my-empty">'+
      '<div class="my-empty-heart">♡</div>'+
      '<div class="my-empty-text">'+t("myEmpty").replace("\n","<br>")+'</div>'+
    '</div>';
    return;
  }
  var html="";
  DAYS.forEach(function(day){
    var myShows=day.shows.filter(function(s){return favs.has(s.artist);});
    if(!myShows.length)return;
    var sorted=myShows.sort(function(a,b){return toMins(a.time)-toMins(b.time);});
    var conflicts=getConflicts(day.shows);
    var isToday=getDay()&&getDay().key===day.key;
    html+='<div class="my-day-header">'+day.label+'</div>';
    sorted.forEach(function(show){
      var si=ST[show.stage]||{color:"#888",e:"🎵",s:"?"};
      var isCancelled=show.cancelled===true;
      var isRescheduled=!!show.origTime;
      var live=isToday&&!isCancelled&&isLive(show);
      var conflict=conflicts.has(show.artist)&&!isCancelled;
      var pop=_heartPop.has(show.artist);
      var startHtml=isRescheduled?'<s class="orig-time">'+show.origTime+'</s><br><b>'+show.time+'</b>':show.time;
      html+='<div class="my-item'+(conflict?" conflict":"")+(live?" current-set":"")+(isCancelled?" cancelled":"")+'">' +
        '<div class="stime">'+
          '<div class="tstart mono" style="color:'+(isCancelled?"var(--dim)":live?si.color:conflict?"var(--conflict)":"var(--text)")+'">'+startHtml+'</div>'+
          (live?'<div class="scur mono">LIVE</div>':"")+
        '</div>'+
        '<div class="sartist">'+
          '<div class="aname" style="color:'+(isCancelled?"var(--dim)":live?si.color:"var(--text)")+'">'+show.artist+(isCancelled?' <span class="cancelled-badge">cancelled</span>':'')+' </div>'+
          '<div class="sc-stage-lbl mono" style="color:'+(isCancelled?"var(--dim)":"")+'">'+si.e+" "+si.s+'</div>'+
          (conflict?'<div class="my-conflict-label">⚠ '+t("conflict")+'</div>':"")+
        '</div>'+
        (isCancelled?'<div class="heart-btn on" style="opacity:0.25;pointer-events:none"><span class="glyph">♥</span></div>':
        '<button class="heart-btn on'+(pop?" pop":"")+'" onclick="toggleFavAnim(\''+show.artist.replace(/'/g,"\\'")+'\',this)">'+
          '<span class="ring"></span><span class="glyph">♥</span>'+
        '</button>')+
      '</div>';
    });
  });
  container.innerHTML=html;
}

// ── SHARED FOOTER ──
function sharedFooterHtml(){
  return '<div class="info-footer">'+
    '<p class="info-disclaimer">'+t("disclaimer")+' <a class="footer-mail" href="mailto:maxx7770101@gmail.com">maxx7770101@gmail.com</a></p>'+
    '<p class="info-made">'+t("madeBy")+'</p>'+
    '<p class="info-made"><a class="footer-link" href="https://ko-fi.com/max7770101" target="_blank" rel="noopener">'+t("kofi")+'</a></p>'+
    '</div>';
}

// ── INFO ──
function renderInfo(){
  var L=LANGS[curLang];
  var wxHtml=_wxCache?_wxRowHtml(_wxCache):'<div style="padding:18px 0;text-align:center;color:var(--dim);font-size:18px">⏳</div>';
  var target=document.getElementById("info-body");
  if(!target)return;
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
      '<div class="info-row"><div class="info-icon">🟡</div><div class="info-text"><strong>'+L.metroLine+'</strong><br>'+L.metroStop+'<br><span style="font-size:10px;color:var(--dim)">'+L.metroHours+'</span></div></div>'+
      '<div class="info-row"><div class="info-icon">🚋</div><div class="info-text"><strong>'+L.tramLine+'</strong><br>'+L.tramStop+'</div></div>'+
      '<div class="info-row"><div class="info-icon">🚌</div><div class="info-text"><strong>'+L.daybus+'</strong><br>'+L.daybusDesc+'</div></div>'+
      '<div class="info-row"><div class="info-icon">🌙</div><div class="info-text"><strong>'+L.nightbus+'</strong><br>'+L.nightbusDesc+'</div></div>'+
      '<div class="info-row"><div class="info-icon">🚌</div><div class="info-text"><strong>'+L.shuttle+'</strong><br>'+L.shuttleDesc.replace(/\n/g,"<br>")+'</div></div>'+
      '<div class="info-row"><div class="info-icon">🚲</div><div class="info-text"><strong>'+L.bicing+'</strong><br>'+L.bicingDesc+'</div></div>'+
      '<div class="info-row"><div class="info-icon">🅿️</div><div class="info-text"><strong>'+L.bikeH+'</strong><br>'+L.bikeDesc.replace(/\n/g,"<br>")+'</div></div>'+
      '<div class="info-row"><div class="info-icon">🚕</div><div class="info-text"><strong>'+L.taxi+'</strong><br>'+L.taxiDesc+'</div></div>'+
      '<div class="info-row"><div class="info-icon">🚶</div><div class="info-text">'+L.walkDesc+'</div></div>'+
    '</div>'+
    '<div class="info-section">'+
      '<div class="info-h">🚫 '+L.banH+'</div>'+
      '<div style="margin-bottom:8px"><div style="font-size:9px;font-family:\'Space Mono\',monospace;color:var(--dim);letter-spacing:.1em;margin-bottom:6px">'+L.banLabel.toUpperCase()+'</div>'+
      L.banItems.map(function(i){return '<span class="info-chip red">✕ '+i+'</span>';}).join("")+'</div>'+
      '<div><div style="font-size:9px;font-family:\'Space Mono\',monospace;color:var(--dim);letter-spacing:.1em;margin-bottom:6px">'+L.allowLabel.toUpperCase()+'</div>'+
      L.allowItems.map(function(i){return '<span class="info-chip green">✓ '+i+'</span>';}).join("")+'</div>'+
    '</div>'+
    '<div class="info-section">'+
      '<div class="info-h">💡 '+L.tipsH+'</div>'+
      L.tips.map(function(tip){return '<div class="info-row"><div class="info-icon">→</div><div class="info-text">'+tip+'</div></div>';}).join("")+
    '</div>'+
    '<div class="info-section">'+
      '<div class="info-h">🆘 '+L.emergH+'</div>'+
      L.emergItems.map(function(i){return '<div class="info-row"><div class="info-icon">·</div><div class="info-text">'+i+'</div></div>';}).join("")+
    '</div>'+
    '<div class="info-section">'+
      '<div class="info-h">🎟️ '+L.ticketsH+'</div>'+
      '<div class="info-row"><div class="info-icon">🛒</div><div class="info-text">'+L.ticketSalesBody+'</div></div>'+
      '<div class="info-row"><div class="info-icon">📅</div><div class="info-text">'+L.ticketTypesBody+'</div></div>'+
      '<div class="info-row"><div class="info-icon">⚠</div><div class="info-text">'+L.ticketQRBody+'</div></div>'+
    '</div>'+
    '<div class="info-section">'+
      '<div class="info-h">👶 '+L.minorsH+'</div>'+
      '<div class="info-row"><div class="info-icon">·</div><div class="info-text">'+L.minor12+'</div></div>'+
      '<div class="info-row"><div class="info-icon">·</div><div class="info-text">'+L.minor1315+'</div></div>'+
      '<div class="info-row"><div class="info-icon">·</div><div class="info-text">'+L.minor1617+'</div></div>'+
    '</div>'+
    '<div class="info-section">'+
      '<div class="info-h">♿ '+L.accessH+'</div>'+
      '<div class="info-row"><div class="info-icon">·</div><div class="info-text">'+L.accessBody+'</div></div>'+
      '<div class="info-row"><div class="info-icon">✉</div><div class="info-text"><a class="footer-link" href="mailto:'+L.accessEmail+'">'+L.accessEmail+'</a></div></div>'+
    '</div>'+
    '<div class="info-section">'+
      '<div class="info-h">💳 '+L.payH+'</div>'+
      '<div class="info-row"><div class="info-icon">·</div><div class="info-text">'+L.payBody+'</div></div>'+
    '</div>'+
    '<div class="info-section">'+
      '<div class="info-h">🔍 '+L.lostH+'</div>'+
      '<div class="info-row"><div class="info-icon">·</div><div class="info-text">'+L.lostBody+'</div></div>'+
    '</div>'+
    '<div class="info-section" style="text-align:center">'+
      '<a style="font-family:\'Syne\',sans-serif;font-size:14px;font-weight:700;color:var(--accent-text);text-decoration:none" href="https://www.primaverasound.com/barcelona/primavera-sound-barcelona-frequently-asked-questions-faqs" target="_blank" rel="noopener">🔗 '+L.faqH+' ↗</a>'+
    '</div>'+
    '<div style="font-family:\'Space Mono\',monospace;font-size:8px;letter-spacing:.06em;color:var(--dim);padding:8px 0 4px;text-align:center">OFFLINE-READY PWA · DATA STORED LOCALLY</div>'+
    '<div class="info-footer">'+
      '<p class="info-disclaimer">'+t("disclaimer")+' <a class="footer-mail" href="mailto:maxx7770101@gmail.com">maxx7770101@gmail.com</a></p>'+
      '<p class="info-made">'+t("madeBy")+'</p>'+
      '<p class="info-made"><a class="footer-link" href="https://ko-fi.com/max7770101" target="_blank" rel="noopener">'+t("kofi")+'</a></p>'+
      '<p class="info-privacy">This site uses Vercel Web Analytics to collect anonymous visitor metrics. Favorites and preferences are stored locally on your device only.</p>'+
    '</div>';
  target.innerHTML=html;
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
      el.style.transformOrigin="center center";
      var fs=getFitScale();
      var bpx=Math.max(1,Math.round(2/fs));
      el.style.background=hasShows?si.color+"22":"rgba(0,0,0,0)";
      el.style.borderRadius=Math.round(6/fs)+"px";
      var bv=bpx+"px solid "+(hasShows?si.color+(hasLive?"ff":"77"):"rgba(255,255,255,0.1)");
      el.style.border=bv;
      el.dataset.border=bv;
      if(hasLive){el.style.setProperty("--gc",si.color);el.style.animation="hsglow 2s ease-in-out infinite";}
      var lbl=document.createElement("div");
      lbl.className="hs-label";
      lbl.style.color=hasShows?si.color:"rgba(255,255,255,0.2)";
      lbl.textContent=si.e+" "+si.s;
      lbl.style.fontSize=Math.round(11/fs)+"px";
      lbl.style.padding=Math.round(2/fs)+"px "+Math.round(6/fs)+"px";
      lbl.style.borderRadius=Math.round(3/fs)+"px";
      el.appendChild(lbl);
      if(hasShows){el.addEventListener("click",function(e){e.stopPropagation();openStagePop(stage);});}
      inner.appendChild(el);
    });
    refreshMapGlow();
  }
  if(img.complete&&img.naturalWidth){place();}else{img.onload=place;}
  var pop=document.getElementById("stagepop");
  pop.style.display="none";pop.classList.remove("visible");
  var disc=document.getElementById("map-disc");
  if(disc)disc.innerHTML=sharedFooterHtml();
  mapReset();
}

function openStagePop(stage){
  vaTrack('tap_stage',{stage:stage});
  var day=DAYS.find(function(d){return d.key===curDay;});
  var si=ST[stage];
  var shows=day.shows.filter(function(s){return s.stage===stage;}).sort(function(a,b){return toMins(a.time)-toMins(b.time);});
  var isToday=getDay()&&getDay().key===curDay;
  document.querySelectorAll(".hs.selected").forEach(function(el){
    el.classList.remove("selected");
    el.style.boxShadow="";
    el.style.border=el.dataset.border||"";
    var sn=el.dataset.stage;
    if(day.shows.some(function(s){return s.stage===sn&&isLive(s);}))
      el.style.animation="hsglow 2s ease-in-out infinite";
  });
  _selStage=stage;
  var newEl=document.querySelector('.hs[data-stage="'+stage+'"]');
  if(newEl){
    newEl.classList.add("selected");
    newEl.style.animation="";
    newEl.style.boxShadow="0 0 14px 4px "+si.color+"aa, 0 0 28px 8px "+si.color+"55";
    newEl.style.borderColor=si.color;
    newEl.style.borderWidth="2px";
  }
  var pop=document.getElementById("stagepop");
  pop.style.display="block";pop.classList.remove("visible");
  setTimeout(function(){pop.classList.add("visible");},10);
  var html='<div class="pop-head"><div class="pop-stage" style="color:'+si.color+'">'+si.e+" "+stage+'</div><button class="pop-close" onclick="closePop()">×</button></div><div>';
  if(!shows.length){html+='<div class="pop-empty">'+t("noShows")+'</div>';}
  else{shows.forEach(function(s){
    var live=isToday&&isLive(s),faved=favs.has(s.artist);
    var conflicts=getConflicts(day.shows);
    html+='<div class="pop-show'+(live?" live-row":"")+'">'+
      '<div class="pop-time" style="color:'+(live?si.color:"var(--dim)")+'">'+s.time+'</div>'+
      '<div class="pop-artist'+(s.hl?" hl":"")+'" style="color:'+(s.hl?si.color:"var(--text)")+'">'+s.artist+(live?'<span class="pop-cur">● LIVE</span>':"")+
      (conflicts.has(s.artist)&&faved?' <span style="color:var(--conflict)">⚠</span>':"")+
      '</div>'+
      '<div class="pop-fav'+(faved?" on":"")+'" onclick="toggleFav(\''+s.artist.replace(/'/g,"\\'")+'\')">'+(faved?"♥":"♡")+'</div>'+
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
  document.querySelectorAll(".hs").forEach(function(el){
    el.classList.remove("selected");
    el.style.boxShadow="";
    el.style.border=el.dataset.border||"";
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
var MAP_W=2000,MAP_H=1345;
function getFitScale(){var wrap=document.getElementById("mapwrap");return wrap?wrap.offsetWidth/MAP_W:0.18;}
function applyMapTransform(){
  var wrap=document.getElementById("mapwrap"),inner=document.getElementById("mapinner");
  if(!wrap||!inner)return;
  var fit=getFitScale();
  mapState.scale=Math.min(5,Math.max(fit,mapState.scale));
  var iw=MAP_W*mapState.scale,ih=MAP_H*mapState.scale;
  var ww=wrap.offsetWidth,wh=wrap.offsetHeight;
  mapState.x=Math.min(0,Math.max(Math.min(0,ww-iw),mapState.x));
  mapState.y=Math.min(0,Math.max(Math.min(0,wh-ih),mapState.y));
  inner.style.transformOrigin="0 0";
  inner.style.transform="translate("+mapState.x+"px,"+mapState.y+"px) scale("+mapState.scale+")";
  var invScale=fit/mapState.scale;
  inner.querySelectorAll(".hs").forEach(function(el){el.style.transform="scale("+invScale+")";});
}
function mapZoom(f){var wrap=document.getElementById("mapwrap");var cx=wrap.offsetWidth/2,cy=wrap.offsetHeight/2;mapState.x=cx-(cx-mapState.x)*f;mapState.y=cy-(cy-mapState.y)*f;mapState.scale*=f;applyMapTransform();}
function mapReset(){mapState={scale:getFitScale(),x:0,y:0};applyMapTransform();}
function initMapGestures(){
  var wrap=document.getElementById("mapwrap");
  if(!wrap||wrap._gi)return;wrap._gi=true;
  wrap.addEventListener("touchstart",function(e){
    if(e.touches.length===2){gesture.active=true;gesture.dragging=false;gesture.startDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);gesture.startScale=mapState.scale;gesture.startMidX=(e.touches[0].clientX+e.touches[1].clientX)/2;gesture.startMidY=(e.touches[0].clientY+e.touches[1].clientY)/2;gesture.startPanX=mapState.x;gesture.startPanY=mapState.y;e.preventDefault();}
    else if(e.touches.length===1&&!gesture.active){gesture.dragging=true;gesture.dragStartX=e.touches[0].clientX-mapState.x;gesture.dragStartY=e.touches[0].clientY-mapState.y;}
  },{passive:false});
  wrap.addEventListener("touchmove",function(e){
    if(e.touches.length===2&&gesture.active){e.preventDefault();var dist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);var ns=Math.min(5,Math.max(getFitScale(),gesture.startScale*(dist/gesture.startDist)));var midX=(e.touches[0].clientX+e.touches[1].clientX)/2,midY=(e.touches[0].clientY+e.touches[1].clientY)/2;var rect=wrap.getBoundingClientRect();var ox=midX-rect.left,oy=midY-rect.top;mapState.x=ox-(ox-gesture.startPanX)*(ns/gesture.startScale)+(midX-gesture.startMidX);mapState.y=oy-(oy-gesture.startPanY)*(ns/gesture.startScale)+(midY-gesture.startMidY);mapState.scale=ns;applyMapTransform();}
    else if(e.touches.length===1&&gesture.dragging){e.preventDefault();mapState.x=e.touches[0].clientX-gesture.dragStartX;mapState.y=e.touches[0].clientY-gesture.dragStartY;applyMapTransform();}
  },{passive:false});
  wrap.addEventListener("touchend",function(e){if(e.touches.length<2)gesture.active=false;if(e.touches.length===0)gesture.dragging=false;});
}

// ── SORT / FILTER / DAY ──
function toggleShowPast(){curShowPast=!curShowPast;renderSchedule();}
function setDay(k){
  vaTrack('switch_day',{day:k});
  curDay=k;curStage=null;curShowPast=false;
  renderDayTabs();
  if(curView==="schedule")renderSchedule();
  else if(curView==="my")renderMyLineup();
  else if(curView==="map"){renderMap();setTimeout(initMapGestures,200);}
}
function setStage(s){curStage=s;renderSchedule();}
function setSort(s){curSort=s;renderSchedule();}
function toggleFavFilter(){curFavFilter=!curFavFilter;renderSchedule();}
function render(){
  if(curView==="schedule")renderSchedule();
  else if(curView==="my")renderMyLineup();
  else if(curView==="info")renderInfo();
  else if(curView==="home")renderHome();
}

// ── THEME ──
function toggleTheme(e){
  var body=document.body;
  var isDark=body.getAttribute("data-theme")==="dark";
  var next=isDark?"light":"dark";
  var x=(e&&e.clientX)||window.innerWidth/2;
  var y=(e&&e.clientY)||70;
  document.documentElement.style.setProperty("--vt-x",x+"px");
  document.documentElement.style.setProperty("--vt-y",y+"px");
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var tc=document.querySelector("meta[name='theme-color']");
  if(tc)tc.setAttribute("content",next==="dark"?"#0E1017":"#EDE5D0");
  var apply=function(){
    body.setAttribute("data-theme",next);
    localStorage.setItem("ps26_theme",next);
    updateThemeToggleUI();
    if(curView==="home")renderHome();
  };
  if(!document.startViewTransition||reduce){apply();return;}
  var vt=document.startViewTransition(apply);
  if(vt.ready)vt.ready.catch(function(){});
  if(vt.finished)vt.finished.catch(function(){});
}

var THEME_LABELS={
  zh:{light:"日间",dark:"夜间"},
  zht:{light:"日間",dark:"夜間"},
  en:{light:"Light",dark:"Dark"},
  es:{light:"Claro",dark:"Oscuro"},
  ca:{light:"Clar",dark:"Fosc"},
};
function getThemeLbl(isDark){var m=THEME_LABELS[curLang]||THEME_LABELS.en;return isDark?m.dark:m.light;}
function updateThemeToggleUI(){
  var isDark=document.body.getAttribute("data-theme")==="dark";
  var icon=isDark?"☾":"☀";
  var lbl=getThemeLbl(isDark);
  document.querySelectorAll(".theme-toggle-icon").forEach(function(el){el.textContent=icon;});
  document.querySelectorAll(".theme-toggle-lbl").forEach(function(el){el.textContent=lbl;});
}

// ── INIT ──
(function(){
  // Restore theme
  var savedTheme=localStorage.getItem("ps26_theme")||(window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");
  document.body.setAttribute("data-theme",savedTheme);
  var tcMeta=document.querySelector("meta[name='theme-color']");
  if(tcMeta)tcMeta.setAttribute("content",savedTheme==="dark"?"#0E1017":"#EDE5D0");

  // Restore saved tab
  var savedTab=parseInt(localStorage.getItem("sh.tab")||"0");
  if(isNaN(savedTab)||savedTab<0||savedTab>4)savedTab=0;
  curTab=savedTab;

  // Init localization (calls applyLang from localization.js)
  applyLang();
  updateThemeToggleUI();

  // Set initial default day to today if festival is running, else first day
  var today=getDay();
  if(today)curDay=today.key;

  // Show starting tab (home initially, then restore)
  // First show home (tab 0) with no animation, then jump to saved tab
  document.querySelectorAll(".view").forEach(function(el){el.classList.remove("on");});
  var startView=TAB_VIEWS[savedTab];
  var startEl=document.getElementById("v"+startView);
  if(startEl)startEl.classList.add("on");
  document.querySelectorAll(".tab-btn").forEach(function(btn,i){btn.classList.toggle("on",i===savedTab);});
  var ind=document.getElementById("tab-ind");
  if(ind)ind.style.left="calc("+savedTab+" * 20% + 10%)";
  curView=startView;

  // Render the starting view
  if(startView==="home")renderHome();
  else if(startView==="schedule"){renderDayTabs();renderSchedule();}
  else if(startView==="map"){renderDayTabs();renderMap();setTimeout(initMapGestures,200);}
  else if(startView==="my"){renderMyLineup();updateFavHead();}
  else if(startView==="info")renderInfo();

  // Always also render home lazily for subsequent visit
  if(startView!=="home")renderHome();

  updateFavHead();
  updateNowPlaying();

  // Track header/np height for --hdr-h compat (now-playing top sticky)
  var npEl=document.getElementById("now-playing");
  if(window.ResizeObserver&&npEl){
    new ResizeObserver(function(e){
      var s=e[0].borderBoxSize;
      document.documentElement.style.setProperty("--np-h",(s?s[0].blockSize:e[0].contentRect.height)+"px");
    }).observe(npEl);
  }

  window.addEventListener("resize",function(){
    // nothing needed — layout is flex, no sticky heights to track
  });
})();
