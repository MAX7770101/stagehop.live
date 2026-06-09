(function(){
  var S={
    en:{
      city:"Porto · Parque da Cidade · June 2026",
      disclaimer:'Unofficial fan-made guide.<br>Not affiliated with Primavera Sound S.L.<br>All trademarks belong to their respective owners.<br>Information for reference only; check the <a class="footer-link" href="https://www.primaverasound.com/porto" target="_blank" rel="noopener">official site</a>.<br>Feedback or corrections:'
    },
    zh:{
      city:"波尔图 · Parque da Cidade · 2026年6月",
      disclaimer:'非官方粉丝向指南。<br>与 Primavera Sound S.L. 无任何关联。<br>所有商标归其各自所有者所有。<br>信息仅供参考，请以<a class="footer-link" href="https://www.primaverasound.com/porto" target="_blank" rel="noopener">官方网站</a>为准。<br>意见或纠错：'
    },
    zht:{
      city:"波爾圖 · Parque da Cidade · 2026年6月",
      disclaimer:'非官方粉絲向指南。<br>與 Primavera Sound S.L. 無任何關聯。<br>所有商標歸其各自所有者所有。<br>資訊僅供參考，請以<a class="footer-link" href="https://www.primaverasound.com/porto" target="_blank" rel="noopener">官方網站</a>為準。<br>意見或糾錯：'
    },
    es:{
      city:"Oporto · Parque da Cidade · Junio 2026",
      disclaimer:'Guía no oficial hecha por fans.<br>No afiliada con Primavera Sound S.L.<br>Todas las marcas pertenecen a sus respectivos propietarios.<br>Información orientativa; consulta el <a class="footer-link" href="https://www.primaverasound.com/porto" target="_blank" rel="noopener">sitio oficial</a>.<br>Comentarios o correcciones:'
    },
    ca:{
      city:"Porto · Parque da Cidade · Juny 2026",
      disclaimer:'Guia no oficial feta per fans.<br>No afiliada amb Primavera Sound S.L.<br>Totes les marques pertanyen als seus respectius propietaris.<br>Informació orientativa; consulta el <a class="footer-link" href="https://www.primaverasound.com/porto" target="_blank" rel="noopener">lloc oficial</a>.<br>Comentaris o correccions:'
    },
  };
  for(var lang in S){
    if(!LANGS[lang])continue;
    for(var k in S[lang])LANGS[lang][k]=S[lang][k];
  }
})();
