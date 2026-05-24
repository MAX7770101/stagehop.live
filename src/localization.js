// ── I18N ──
var LANGS={
  zh:{
    city:"Barcelona · Parc del Fòrum · Junio 2026",
    now:"▶ 正在演出",next:"⏭ 下一场",remaining:"剩余",startsIn:"后开始",
    sort:"排序",byTime:"时间",byName:"名称",
    favs:"💖 我的收藏",noFavs:"还没有收藏的艺人",
    headliner:"HEADLINER",live:"● LIVE",
    mapHint:"双指缩放 · 点击舞台查看演出",reset:"复位",noShows:"今天暂无演出",
    myEmpty:"💖 收藏艺人后\n在这里查看你的专属行程",myTitle:"我的行程",conflict:"时间冲突",
    opening:"开幕日",day1:"第一天",day2:"第二天",day3:"第三天",bits:"Bits",free:"免费",
    infoTitle:"实用信息",
    doorsH:"开门时间",doorsBody:"主场地 Parc del Fòrum 每天约 16:00 开门，演出持续至次日 05:00–06:00。周三开幕日（6/3）为免费活动，约 17:00 起，地点在 Parc del Fòrum 海滨舞台。",
    transitH:"交通",metroLine:"地铁 L4（黄线）",metroStop:"El Maresme | Fòrum 站",
    nightbus:"夜巴士 N6",nightbusDesc:"凌晨收班后运营，约 15 分钟一班，可达市中心",
    bikeDesc:"场地内有免费单车停放区",metroHours:"周一至四 05:00–00:00 · 周五 05:00–02:00 · 周六 24小时连续运营",tramLine:"电车 T4 线",tramStop:"Fòrum 站 · 节日期间增加班次",daybus:"日间公交 H16 / H14 / 143 / 7 / 36",daybusDesc:"从市中心各区直达，运营时间 06:30–23:15",shuttle:"官方摆渡车",shuttleDesc:"午夜至早晨约€2，Passeig Taulat → Plaça Catalunya，AccessTicket App 可预约",walkDesc:"从市中心沿海滨步行约60分钟，地中海美景相伴",
    banH:"禁带物品",
    banItems:["玻璃瓶/金属罐","专业摄影设备（长焦镜头）","自拍杆","无人机","宠物","外带食物饮料（水除外）"],
    allowItems:["小型手提包（A4 大小以内）","可重复使用水瓶（空）","雨衣/防晒霜","处方药（携带证明）"],
    banLabel:"禁止携带",allowLabel:"允许携带",
    weatherH:"天气预报（巴塞罗那六月初）",
    weatherNote:"六月初巴塞罗那通常晴朗，日间 25–30°C，夜间 18–22°C。建议携带防晒霜和轻便外套（凌晨场较凉）。",
    tipsH:"实用小贴士",
    tips:["AccessTicket 手环需在入口激活，请留出排队时间","现金充值点分布在场地各处（仅 AccessTicket 消费）","免费饮水站全场分布，自带空瓶可节省开支","场内有无障碍区域，需提前联系主办方","Nobody Is Normal 安全站提供紧急援助"],
    navSchedule:"排班",navMap:"地图",navInfo:"实用信息",navTheme:"主题",navLang:"语言",
    showPast:"场已结束",hidePast:"隐藏已结束",more:"更多",collapse:"收起",
    disclaimer:"本站为乐迷自制的非官方指南，与 Primavera Sound S.L. 无任何关联。所有商标归各自所有者所有。演出信息仅供参考，请以<a class=\"footer-link\" href=\"https://www.primaverasound.com/es/barcelona\" target=\"_blank\" rel=\"noopener\">官方网站</a>为准。反馈或纠错请联系：",
  },
  es:{
    city:"Barcelona · Parc del Fòrum · Junio 2026",
    now:"▶ EN ESCENA",next:"⏭ PRÓXIMO",remaining:"restante",startsIn:"para empezar",
    sort:"Orden",byTime:"Hora",byName:"Nombre",
    favs:"💖 Mis favoritos",noFavs:"Aún no tienes favoritos",
    headliner:"HEADLINER",live:"● EN DIRECTO",
    mapHint:"Pellizca para zoom · Toca el escenario",reset:"Reset",noShows:"Sin conciertos hoy",
    myEmpty:"💖 Guarda artistas\npara ver tu itinerario personal",myTitle:"Mi agenda",conflict:"Conflicto",
    opening:"Apertura",day1:"Día 1",day2:"Día 2",day3:"Día 3",bits:"Bits",free:"Gratis",
    infoTitle:"Info práctica",
    doorsH:"Horarios de apertura",doorsBody:"El Parc del Fòrum abre cada día sobre las 16:00, los conciertos siguen hasta las 05:00–06:00. El miércoles de apertura (3/6) es gratuito desde las ~17:00 en el escenario junto al mar.",
    transitH:"Transporte",metroLine:"Metro L4 (línea amarilla)",metroStop:"Parada El Maresme | Fòrum",
    nightbus:"Autobús nocturno N6",nightbusDesc:"Servicio nocturno tras el cierre del metro, cada ~15 min hasta el centro",
    bikeDesc:"Aparcamiento de bicicletas gratuito en el recinto",metroHours:"L-J 05:00–00:00 · V 05:00–02:00 · S servicio continuo 24h",tramLine:"Tranvía T4",tramStop:"Parada Fòrum · Servicio reforzado durante el festival",daybus:"Autobús diurno H16 / H14 / 143 / 7 / 36",daybusDesc:"Desde distintas zonas del centro, 06:30–23:15",shuttle:"Bus lanzadera oficial",shuttleDesc:"~€2 por trayecto de medianoche al amanecer, Passeig Taulat → Plaça Catalunya. Reserva en AccessTicket app",walkDesc:"Paseo de ~60 min desde el centro por el Passeig Marítim con vistas al Mediterráneo",
    banH:"Objetos prohibidos",
    banItems:["Botellas de vidrio / latas metálicas","Equipo fotográfico profesional (teleobjetivos)","Palos selfie","Drones","Mascotas","Comida y bebida exterior (excepto agua)"],
    allowItems:["Bolso pequeño (tamaño A4)","Botella reutilizable (vacía)","Chubasquero / protector solar","Medicación con receta (con justificante)"],
    banLabel:"Prohibido",allowLabel:"Permitido",
    weatherH:"Previsión meteorológica (Barcelona, junio)",
    weatherNote:"Principios de junio en Barcelona suele ser soleado, 25–30°C de día, 18–22°C de noche. Lleva protector solar y una chaqueta ligera para las sesiones de madrugada.",
    tipsH:"Consejos prácticos",
    tips:["La pulsera AccessTicket debe activarse en la entrada; deja tiempo para la cola","Puntos de recarga de efectivo distribuidos por el recinto (solo pago con AccessTicket)","Fuentes de agua gratuitas en todo el recinto","Zona accesible disponible; contacta al organizador con antelación","El punto Nobody Is Normal ofrece asistencia de emergencia"],
    navSchedule:"Horario",navMap:"Mapa",navInfo:"Info",navTheme:"Tema",navLang:"Idioma",
    showPast:"terminados",hidePast:"Ocultar pasados",more:"más",collapse:"colapsar",
    disclaimer:"Sitio no oficial creado por fans. Sin afiliación con Primavera Sound S.L. Todas las marcas pertenecen a sus respectivos propietarios. Información orientativa; consulta la <a class=\"footer-link\" href=\"https://www.primaverasound.com/es/barcelona\" target=\"_blank\" rel=\"noopener\">web oficial</a>. Sugerencias o correcciones:",
  },
  en:{
    city:"Barcelona · Parc del Fòrum · June 2026",
    now:"▶ NOW PLAYING",next:"⏭ UP NEXT",remaining:"left",startsIn:"to start",
    sort:"Sort",byTime:"Time",byName:"Name",
    favs:"💖 My Favourites",noFavs:"No saved artists yet",
    headliner:"HEADLINER",live:"● LIVE",
    mapHint:"Pinch to zoom · Tap stage to see shows",reset:"Reset",noShows:"No shows today",
    myEmpty:"💖 Save artists\nto see your personal lineup here",myTitle:"My lineup",conflict:"Clash",
    opening:"Opening",day1:"Day 1",day2:"Day 2",day3:"Day 3",bits:"Bits",free:"Free",
    infoTitle:"Practical Info",
    doorsH:"Opening hours",doorsBody:"Parc del Fòrum opens daily around 16:00, with sets running until 05:00–06:00. Wednesday opening day (3 June) is free from ~17:00 at the seafront stage.",
    transitH:"Getting there",metroLine:"Metro L4 (Yellow line)",metroStop:"El Maresme | Fòrum stop",
    nightbus:"Night bus N6",nightbusDesc:"Runs after metro closes, every ~15 min to city centre",
    bikeDesc:"Free bike parking inside the venue",metroHours:"Mon–Thu 05:00–00:00 · Fri 05:00–02:00 · Sat 24h continuous",tramLine:"Tram T4",tramStop:"Fòrum stop · Extra services during festival days",daybus:"Day buses H16 / H14 / 143 / 7 / 36",daybusDesc:"From various city districts, 06:30–23:15",shuttle:"Official shuttle bus",shuttleDesc:"~€2/trip midnight to dawn, Passeig Taulat → Plaça Catalunya. Book via AccessTicket app",walkDesc:"~60 min walk from city centre along the beach promenade with sea views",
    banH:"Prohibited items",
    banItems:["Glass bottles / metal cans","Professional camera equipment (telephoto lenses)","Selfie sticks","Drones","Pets","Outside food & drink (water allowed)"],
    allowItems:["Small bag (up to A4 size)","Reusable water bottle (empty)","Raincoat / sunscreen","Prescription medication (with documentation)"],
    banLabel:"Not allowed",allowLabel:"Allowed",
    weatherH:"Weather forecast (Barcelona, early June)",
    weatherNote:"Early June in Barcelona is typically sunny, 25–30°C during the day and 18–22°C at night. Bring sunscreen and a light jacket for late-night sets.",
    tipsH:"Practical tips",
    tips:["Your AccessTicket wristband must be activated at the entrance — allow time to queue","Cash reload points are scattered around the venue (AccessTicket payment only)","Free water points throughout the venue — bring an empty reusable bottle","Accessible areas available; contact the organiser in advance","Nobody Is Normal safe space provides emergency assistance"],
    navSchedule:"Schedule",navMap:"Map",navInfo:"Info",navTheme:"Theme",navLang:"Language",
    showPast:"ended",hidePast:"Hide ended",more:"more",collapse:"collapse",
    disclaimer:"Unofficial fan-made guide. Not affiliated with Primavera Sound S.L. All trademarks belong to their respective owners. Information for reference only; check the <a class=\"footer-link\" href=\"https://www.primaverasound.com/es/barcelona\" target=\"_blank\" rel=\"noopener\">official site</a>. Feedback or corrections:",
  }
};

var curLang=localStorage.getItem("ps26_lang")||"zh";
function t(k){return LANGS[curLang][k]||LANGS.zh[k]||k;}
function setLang(l){
  curLang=l;localStorage.setItem("ps26_lang",l);
  document.querySelectorAll(".lang-btn").forEach(function(b){b.classList.remove("on");});
  document.querySelectorAll(".lang-btn[data-lang='"+l+"']").forEach(function(b){b.classList.add("on");});
  applyLang();
  renderDayTabs();
  render();
  updateNowPlaying();
}
function applyLang(){
  document.getElementById("lbl-city").textContent=t("city");
  document.getElementById("lbl-mapHint").textContent=t("mapHint");
  document.getElementById("lbl-reset").textContent=t("reset");
  document.getElementById("lbl-favs").textContent=t("favs");
  document.getElementById("lbl-sort").textContent=t("sort");
  document.querySelectorAll("[data-i]").forEach(function(el){el.textContent=t(el.dataset.i);});
  var footer=document.getElementById("app-footer");
  if(footer)footer.innerHTML=t("disclaimer")+' <a class="footer-mail" href="mailto:maxx7770101@gmail.com">maxx7770101@gmail.com</a>';
  if(curView==="info")renderInfo();
}