(function(){
  var S={
    en:{city:"Roskilde · Denmark · June–July 2026",disclaimer:'Unofficial fan-made guide.<br>Not affiliated with Roskilde Festival.<br>All trademarks belong to their respective owners.<br>Information for reference only; check the <a class="footer-link" href="https://www.roskilde-festival.dk/" target="_blank" rel="noopener">official site</a>.<br>Feedback or corrections:'},
    zh:{city:"丹麦 · 罗斯基勒 · 2026年6–7月",disclaimer:'非官方粉丝向指南。<br>与 Roskilde Festival 无任何关联。<br>所有商标归其各自所有者所有。<br>信息仅供参考，请以<a class="footer-link" href="https://www.roskilde-festival.dk/" target="_blank" rel="noopener">官方网站</a>为准。<br>意见或纠错：'},
    zht:{city:"丹麥 · 羅斯基勒 · 2026年6–7月",disclaimer:'非官方粉絲向指南。<br>與 Roskilde Festival 無任何關聯。<br>所有商標歸其各自所有者所有。<br>資訊僅供參考，請以<a class="footer-link" href="https://www.roskilde-festival.dk/" target="_blank" rel="noopener">官方網站</a>為準。<br>意見或糾錯：'},
    es:{city:"Roskilde · Dinamarca · Junio–Julio 2026",disclaimer:'Guía no oficial hecha por fans.<br>Sin afiliación con Roskilde Festival.<br>Todas las marcas pertenecen a sus respectivos propietarios.<br>Información orientativa; consulta el <a class="footer-link" href="https://www.roskilde-festival.dk/" target="_blank" rel="noopener">sitio oficial</a>.<br>Comentarios o correcciones:'},
    ca:{city:"Roskilde · Dinamarca · Juny–Juliol 2026",disclaimer:'Guia no oficial creada per fans.<br>Sense afiliació amb Roskilde Festival.<br>Totes les marques pertanyen als seus respectius propietaris.<br>Informació orientativa; consulta el <a class="footer-link" href="https://www.roskilde-festival.dk/" target="_blank" rel="noopener">lloc oficial</a>.<br>Comentaris o correccions:'},
    pt:{city:"Roskilde · Dinamarca · Junho–Julho 2026",disclaimer:'Guia não oficial feito por fãs.<br>Sem afiliação com o Roskilde Festival.<br>Todas as marcas pertencem aos seus respetivos proprietários.<br>Informação a título indicativo; consulta o <a class="footer-link" href="https://www.roskilde-festival.dk/" target="_blank" rel="noopener">site oficial</a>.<br>Sugestões ou correções:'},
  };
  for(var lang in S){
    if(!LANGS[lang])continue;
    for(var k in S[lang])LANGS[lang][k]=S[lang][k];
  }
})();
