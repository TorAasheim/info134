//Kart til bryggen.html
function initMap1() {
       var bryggen = {lat: 60.397, lng: 5.324};
       var map = new google.maps.Map(document.getElementById('map1'), {
         zoom: 14,
         center: bryggen
       });
       var marker = new google.maps.Marker({
         position: bryggen,
         map: map
       });
     }

//henter JSON fil til både favoritt_toalett.html og toalettkart.html
var toalett_url = "https://hotell.difi.no/api/json/bergen/dokart?"
function loadJSON() {
  var req = new XMLHttpRequest();
    req.open("GET", toalett_url , true);
      req.onreadystatechange = function() {
  if (req.readyState === 4 && req.status === 200) {
    data = JSON.parse(req.responseText);
    if(document.title === "Toalettkart") { initTable(); }
    if(document.title === "Favoritt Toalett") { options(); loadLekeplass();}
    }
  }
  req.send()
}

//henter json-fil til rom_uib.html
var uib_url = "https://tp.data.uib.no/KEYxaje9avyx/ws/room/2.0/allrooms.php"
function loadUib() {
  var req = new XMLHttpRequest();
    req.open("GET", uib_url, true);
      req.onreadystatechange = function() {
  if (req.readyState === 4 && req.status === 200) {
    uib = JSON.parse(req.responseText);
    }
  }
  req.send()
}

//Henter json-fil til lekeplass.html, bli også brukt på favoritt_toalett.html
var lekeplass_url = "https://hotell.difi.no/api/json/bergen/lekeplasser?"
function loadLekeplass() {
  var req = new XMLHttpRequest();
    req.open("GET", lekeplass_url, true);
      req.onreadystatechange = function() {
  if (req.readyState === 4 && req.status === 200) {
    lekeplass = JSON.parse(req.responseText);
    if(document.title === "Lekeplass") { initLekeplassTable(); }

    }
  }
  req.send()
}


// Initialiserer tabellen på toalettkart.html ved å legge inn <li> taggs inne i eksisterende <ol> tag
function initTable(){
    for( var i=0; i < data.entries.length; ++i){
      document.getElementById("table").appendChild(document.createElement("LI")).innerHTML = data.entries[i].plassering ;
  }
  initMap2();
}

function initLekeplassTable(){
    for( var i=0; i < lekeplass.entries.length; ++i){
      document.getElementById("table1").appendChild(document.createElement("LI")).innerHTML = lekeplass.entries[i].navn ;
  }
  initMap3();
}
//sletter tabellen, brukes på rom_uib.html gjennom initTableUib()
function deleteTable(){
  var table = document.getElementsByTagName("li")
  for(var i=0; i < table.length; ++i ){
      i=0;
      table[i].remove();
  }
}

//Initialiserer tabellen på bakgrunn av hvilket fakultet(checkboks) som er merket av
function initTableUib(){
  var checkHfJus = document.getElementById('HF/JUS');
  var checkPsykSv = document.getElementById('PSYK/SV');
  var checkMn = document.getElementById('MN');
  var checkMed = document.getElementById('MED');
  var checkAndre = document.getElementById('ANDRE');
  deleteTable()

      for( var i=0; i < uib.data.length; ++i){
      if(checkHfJus.checked){
        if(uib.data[i].areaname === 'HF/JUS'){
          var link = "<a " + "href=" + (uib.data[i].roomurl) + ">" + "link" +"</a>"
          var roomId = "<p class=" + "p" + ">" + uib.data[i].id + "</p>"
            document.getElementById("romTable").appendChild(document.createElement("LI")).innerHTML = uib.data[i].name + " "  + roomId +" "+ link;
        }
      }
      if(checkPsykSv.checked){
        if(uib.data[i].areaname === 'PSYK/SV'){
          var link = "<a " + "href=" + (uib.data[i].roomurl) + ">" + "link" +"</a>"
          var roomId = "<p class=" + "p" + ">" + uib.data[i].id + "</p>"
              document.getElementById("romTable").appendChild(document.createElement("LI")).innerHTML = uib.data[i].name + " "  + roomId +" "+ link;
        }
      }
      if(checkMn.checked){
        if(uib.data[i].areaname === 'MN'){
          var link = "<a " + "href=" + (uib.data[i].roomurl) + ">" + "link" +"</a>"
          var roomId = "<p class=" + "p" + ">" + uib.data[i].id + "</p>"
                document.getElementById("romTable").appendChild(document.createElement("LI")).innerHTML = uib.data[i].name + " "  + roomId +" "+ link;
        }
      }
      if(checkMed.checked){
        if(uib.data[i].areaname === 'MED'){
          var link = "<a " + "href=" + (uib.data[i].roomurl) + ">" + "link" +"</a>"
        var roomId = "<p class=" + "p" + ">" + uib.data[i].id + "</p>"
              document.getElementById("romTable").appendChild(document.createElement("LI")).innerHTML = uib.data[i].name + " "  + roomId +" "+ link;
        }
      }
      if(checkAndre.checked){
        if(uib.data[i].areaname === 'Andre'){
          var link = "<a " + "href=" + (uib.data[i].roomurl) + ">" + "link" +"</a>"
          var roomId = "<p class=" + "p" + ">" + uib.data[i].id + "</p>"
                document.getElementById("romTable").appendChild(document.createElement("LI")).innerHTML = uib.data[i].name + " "  + roomId +" "+ link;
        }
      }
    }
  }


//Initialiserer kart, som brukes på toalettkart.html
function initMap2() {
    var table =  document.getElementById('table');
    var bryggen = {lat: 60.397, lng: 5.324};
      var map = new google.maps.Map(document.getElementById('map2'), {
         zoom: 14,
         center: bryggen
       });

       for(var x=0; x < document.getElementsByTagName("li").length; ++x ){ //For-løkken er for å gji label til markører som stemmer overens med listen, og for at pos() skal få en itterator-verdi som skal brukes til å sammenligninge listen og JSON filen
      var loc =  pos(x)
        var marker = new google.maps.Marker({
         position: loc,
         map: map,
         label: "" + (x+1)
       });
     }
   }

//Kart for lekeplass.html
function initMap3() {
    var table =  document.getElementById('table1');
    var bryggen = {lat: 60.397, lng: 5.324};
    var map = new google.maps.Map(document.getElementById('map3'), {
         zoom: 14,
         center: bryggen
       });
       for(var x=0; x < document.getElementsByTagName("li").length; ++x ){ //For-løkken er for å gji label til markører som stemmer overens med listen, og for at pos() skal få en itterator-verdi som skal brukes til å sammenligninge listen og JSON filen
      var loc =  lekePos(x)
        var marker = new google.maps.Marker({
         position: loc,
         map: map,
         label: "" + (x+1)
       });
     }
   }

   //Funksjonen sammenligner liste elementene med datasettet, og returnerer et objekt med lat og lang verdier som initMap2() kan bruke.
   function pos(x){
       for(var i = 0; i < data.entries.length; i++){
         if(document.getElementsByTagName("li")[x].innerHTML ===  data.entries[i].plassering){ //itterator verdi "x" er fra initMap2()
           plc = {lat: parseFloat(data.entries[i].latitude), lng: parseFloat(data.entries[i].longitude)};
       }
     }
       return  plc
     }

     //Se pos() for forklaring
   function lekePos(x){
       for(var i = 0; i < lekeplass.entries.length; i++){
         if(document.getElementsByTagName("li")[x].innerHTML ===  lekeplass.entries[i].navn){ //itterator verdi "x" er fra initMap2()
           plc = {lat: parseFloat(lekeplass.entries[i].latitude), lng: parseFloat(lekeplass.entries[i].longitude)};
       }
     }
       return  plc
     }



// Metodet som filtrerer tabellen bassert på tekst input. Må trykke på søkeknappen for at den virker. "Enter" i søkefeltet vil refreshe siden
function filterTable() {
  var  input = document.getElementById("input");
   var filter = input.value.toUpperCase();
   var table = document.getElementById('table');
    var field = document.getElementsByTagName("li")

    for (var i = 0; i < field.length; i++) {
        if (field[i].textContent.toUpperCase().indexOf(filter) > -1) {
        } else {
            table.removeChild(table.children[i]);
              filterTable() //"rekursivt" metodekall, slik at vi ikke hopper over noen <li> elementer etter de har endret posisjon i tabellen
    }
  }
  initMap2()
}

//Legger liste elementene inn i et array, for så å sortere alfabetisk og skrive listen ut på nytt.
function sorterEtterNavn(){
 var table = document.getElementsByTagName("li")
   arr = [];
  for(var i = 0; i < table.length; i++){
    arr.push(table[i].innerHTML);
  }
      for(var x = 0; x < i; x++){
      if(table.length != 0){
          x = 0; //slik at vi ikke hopper over noen når tabellen endrer størrelse
          table[x].remove();
      }
    }
  arr.sort();
  for(var j = 0; j < arr.length; j++){
    names = arr[j]
    document.getElementById("romTable").appendChild(document.createElement("LI")).innerHTML = names ;

  }
}



//Sletter rom som ikke er av samme type som er krysset av. Typen er hentet fra datasettet og ikke navnet på romet
function sorterRom(){
  var checkAuditorium = document.getElementById("sortAuditorium")
  var checkLesesal = document.getElementById("sortLesesal")
  var checkMoterom= document.getElementById("sortMoterom")
  var checkSeminar = document.getElementById("sortSeminar")
  var table = document.getElementById('table');
  var field = document.getElementsByTagName("li")
  var p = document.getElementsByClassName("p")

for(var i = 0; field.length > i; i++){

  if(checkAuditorium.checked){
      for(var x = 0; uib.data.length > x; x++){
      if((p[i].innerHTML === uib.data[x].id) && (uib.data[x].type != "Auditorium")){
        field[i].remove()
        }
      }
    }
  if(checkLesesal.checked){
      for(var x = 0; uib.data.length > x; x++){
      if((p[i].innerHTML === uib.data[x].id) && (uib.data[x].type != "Lesesal")){
        field[i].remove()
        }
      }
  }
  if(checkMoterom.checked){
      for(var x = 0; uib.data.length > x; x++){
      if((p[i].innerHTML === uib.data[x].id) && (uib.data[x].type != "Møterom")){
        field[i].remove()
        }
      }
  }
  if(checkSeminar.checked){
      for(var x = 0; uib.data.length > x; x++){
      if((p[i].innerHTML === uib.data[x].id) && (uib.data[x].type != "Seminarrom")){
        field[i].remove()
        }
      }
    }
  }
}


// objektet blir brukt ved checkboks søk og ved "hurtigsøk"
function sokeObj(){
  this.txt = "";
  this.kjon = undefined;
  this.stellerom = undefined;
  this.apentNa = undefined;
  this.apentKl = undefined;
  this.handicap = undefined;
  this.maxPris = undefined;
  this.gratis = undefined;

}
//Endrer tilstanded til søkeobjektet når string mathcer regex
sokeObj.prototype.setTxt = function sokeObjTxt(txt){
  var kjonSok = txt.match(this.kjonReg);
  var stelleromSok = txt.match(this.stelleromReg);
  var apentNaSok = txt.match(this.apentNaReg);
  var apentKlSok = txt.match(this.apentKlReg)
  var handicapSok = txt.match(this.handicapReg)
  var maxPrisSok = txt.match(this.maxPrisReg)
  var gratisSok = txt.match(this.gratisReg)

  if(kjonSok){
    this.kjon = kjonSok[1];
    txt = txt.replace(this.kjonReg, "");
  }else{
    this.kjon = undefined;
  }
  if(stelleromSok){
    this.stellerom = stelleromSok[1];
    txt = txt.replace(this.stelleromReg, "");
  }else{
    this.stellerom = undefined;
  }
  if(apentNaSok){
    this.apentNa = apentNaSok[1];
    txt = txt.replace(this.apentNaReg, "");
  }else{
    this.apentNa = undefined;
  } if(apentKlSok){
    this.apentKl = apentKlSok[1];
    txt = txt.replace(this.apentKlReg, "");
  }else{
    this.apentKl = undefined;
  }if(handicapSok){
      this.handicap = handicapSok[1];
      txt = txt.replace(this.handicapReg, "");
    }else{
      this.handicap = undefined;
    } if(maxPrisSok){
          this.maxPris = maxPrisSok[1];
          txt = txt.replace(this.maxPrisReg, "");
        }else{
          this.maxPris = undefined;
        }if(gratisSok){
                this.gratis = gratisSok[1];
                txt = txt.replace(this.gratisReg, "");
              }else{
                this.gratis = undefined;
                }
  this.txt = txt;
};
//regex som søkeobjektet skal matche på
sokeObj.prototype.kjonReg = /kjønn:(herre|dame)/i;
sokeObj.prototype.stelleromReg = /stellerom:(ja|nei)/i;
sokeObj.prototype.apentNaReg = /ÅpentNå:(ja|nei)/i;
sokeObj.prototype.apentKlReg= /ÅpentKl:(([01]?[0-9]|2[0-3]):[0-5][0-9])/i;
sokeObj.prototype.handicapReg = /handicap:(ja|nei)/i;
sokeObj.prototype.maxPrisReg = /maxPris:(ja|nei)/i;
sokeObj.prototype.gratisReg = /gratis:(ja|nei)/i;

var sok = new sokeObj();
//Metode for søkefelt som sender input til søkeobjekt
function scan(){
  var inputTxt = document.getElementById('inputReg').value;
  sok.setTxt(inputTxt);
  mainSok(sok);
}

//søkefunksjon som ser på søkeobjektet og filtrerer på bakgrunn av tilstanden
function mainSok(sok){
  var table = document.getElementById('table');
  var field = document.getElementsByTagName("li")
  var maxP = 0

  for (var i = 0; field.length > i; ++i) {

    if(sok.kjon == "herre"){
      for(var x = 0; x < data.entries.length; x++){
          if((document.getElementsByTagName("li")[i].innerHTML === data.entries[x].plassering) && data.entries[x].herre !== "1"){
            document.getElementsByTagName("li")[i].remove()
            i = 0 ;
          }
        }
      }
      if(sok.kjon == "dame"){
        for(var x = 0; x < data.entries.length; x++){
            if((document.getElementsByTagName("li")[i].innerHTML === data.entries[x].plassering) && data.entries[x].dame !== "1"){
              document.getElementsByTagName("li")[i].remove()
              i = 0 ;
            }
          }
        }
        if(sok.stellerom == "ja"){
          for(var x = 0; x < data.entries.length; x++){
            if((document.getElementsByTagName("li")[i].innerHTML === data.entries[x].plassering) && data.entries[x].stellerom !== "1"){
              document.getElementsByTagName("li")[i].remove()
              i = 0 ;
          }
        }
      }
      if(sok.stellerom == "nei"){
        for(var x = 0; x < data.entries.length; x++){
            if((document.getElementsByTagName("li")[i].innerHTML === data.entries[x].plassering) && data.entries[x].stellerom === "1"){
              document.getElementsByTagName("li")[i].remove()
              i = 0 ;
            }
          }
        }
        if(sok.handicap == "ja"){
          for(var x = 0; x < data.entries.length; x++){
              if((document.getElementsByTagName("li")[i].innerHTML === data.entries[x].plassering) && data.entries[x].rullestol !== "1"){
                document.getElementsByTagName("li")[i].remove()
                i = 0 ;
              }
            }
          }
          if(sok.handicap == "nei"){
            for(var x = 0; x < data.entries.length; x++){
                if((document.getElementsByTagName("li")[i].innerHTML === data.entries[x].plassering) && data.entries[x].rullestol === "1"){
                  document.getElementsByTagName("li")[i].remove()
                  i = 0 ;
                }
              }
            }
            if(sok.gratis == "ja"){
              for(var x = 0; x < data.entries.length; x++){
                  if((document.getElementsByTagName("li")[i].innerHTML === data.entries[x].plassering) && (data.entries[x].pris !== "0" && data.entries[x].pris !== "NULL")){
                    document.getElementsByTagName("li")[i].remove()
                    i = 0 ;
                  }
                }
              }
              if(sok.gratis == "nei"){
                for(var x = 0; x < data.entries.length; x++){
                    if((document.getElementsByTagName("li")[i].innerHTML === data.entries[x].plassering) && (data.entries[x].pris === "0" || data.entries[x].pris === "NULL")){
                      document.getElementsByTagName("li")[i].remove()
                      i = 0 ;
                    }
                  }
                }
                if(sok.maxPris == "ja"){

                  for (var x=0; x < data.entries.length; x++){
                    if ((document.getElementsByTagName("li")[i].innerHTML === data.entries[x].plassering) && (maxP < parseFloat(data.entries[x].pris))){
                      maxP = parseFloat(data.entries[x].pris)
                    }
                    if( (document.getElementsByTagName("li")[i].innerHTML === data.entries[x].plassering) && (maxP > data.entries[x].pris)){
                      document.getElementsByTagName("li")[i].remove()
                    }
                     if((document.getElementsByTagName("li")[i].innerHTML === data.entries[x].plassering) && (data.entries[x].pris === "NULL")){
                      document.getElementsByTagName("li")[i].remove()
                    }
                  }
              }

              if(sok.maxPris == "nei"){
                for (var x=0; x < data.entries.length; x++){
                  if ((document.getElementsByTagName("li")[i].innerHTML === data.entries[x].plassering) && (maxP < parseFloat(data.entries[x].pris))){
                    maxP = parseFloat(data.entries[x].pris)
                  }
                  if( (document.getElementsByTagName("li")[i].innerHTML === data.entries[x].plassering) && (maxP == data.entries[x].pris)){
                    document.getElementsByTagName("li")[i].remove()
                  }
                }
            }
            if(sok.apentNa == "ja"){
                  var currentDate = new Date();
                  var dateTime = parseFloat(currentDate.getHours() + ":" + currentDate.getMinutes());
                  var day = currentDate.getDay();

                  for(var x = 0; x < data.entries.length  ; x++){
                    if( day == 1 || day == 2 || day == 3 || day == 4 || day == 5){
                        var list = data.entries[x].plassering + "-" + data.entries[x].tid_hverdag;
                        list =  list.split("-");
                        var open = parseFloat(list[1])
                        var closed = parseFloat(list[2])

                        if((document.getElementsByTagName("li")[i].innerHTML === list[0]) && (dateTime < open || dateTime > closed)){
                          document.getElementsByTagName("li")[i].remove()
                       }
                       if (document.getElementsByTagName("li")[i].innerHTML === list[0] && list[1] === "NULL"){
                          document.getElementsByTagName("li")[i].remove()
                       }
                     }
                     if (day == 6){
                       var list = data.entries[x].plassering + "-" + data.entries[x].tid_lordag;
                       list =  list.split("-");
                       var open = parseFloat(list[1])
                       var closed = parseFloat(list[2])

                       if((document.getElementsByTagName("li")[i].innerHTML === list[0]) && (dateTime < open || dateTime > closed)){
                         document.getElementsByTagName("li")[i].remove()
                     }
                     if (document.getElementsByTagName("li")[i].innerHTML === list[0] && list[1] === "NULL"){
                        document.getElementsByTagName("li")[i].remove()
                     }
                  }
                  if (day == 0){
                    var list = data.entries[x].plassering + "-" + data.entries[x].tid_sondag;
                    list =  list.split("-");
                    var open = parseFloat(list[1])
                    var closed = parseFloat(list[2])
                        if((document.getElementsByTagName("li")[i].innerHTML === list[0]) && (dateTime < open || dateTime > closed)){
                          document.getElementsByTagName("li")[i].remove()
                  }
                    if (document.getElementsByTagName("li")[i].innerHTML === list[0] && list[1] === "NULL"){
                            document.getElementsByTagName("li")[i].remove()
                            }
                          }
                        }
                      }
                      if(sok.apentKl != undefined ){
                        var currentDate = new Date();
                        var dateTime = parseFloat(sok.apentKl);
                        var day = currentDate.getDay();

                      for(var x = 0; x < data.entries.length  ; x++){
                        if( day == 1 || day == 2 || day == 3 || day == 4 || day == 5){
                              var list = data.entries[x].plassering + "-" + data.entries[x].tid_hverdag;
                              list =  list.split("-");
                              var open = parseFloat(list[1])
                              var closed = parseFloat(list[2])


                              if((document.getElementsByTagName("li")[i].innerHTML === list[0]) && (dateTime < open || dateTime > closed)){
                                document.getElementsByTagName("li")[i].remove()

                         }
                         if (document.getElementsByTagName("li")[i].innerHTML === list[0] && list[1] === "NULL"){
                            document.getElementsByTagName("li")[i].remove()
                         }
                      }
                      if (day == 6){
                        var list = data.entries[x].plassering + "-" + data.entries[x].tid_lordag;
                        list =  list.split("-");
                        var open = parseFloat(list[1])
                        var closed = parseFloat(list[2])
                        
                      if((document.getElementsByTagName("li")[i].innerHTML === list[0]) && (dateTime < open || dateTime > closed)){
                        document.getElementsByTagName("li")[i].remove()
                    }
                    if (document.getElementsByTagName("li")[i].innerHTML === list[0] && list[1] === "NULL"){
                       document.getElementsByTagName("li")[i].remove()
                    }
                 }
                 if (day == 0){

                   var list = data.entries[x].plassering + "-" + data.entries[x].tid_sondag;
                   list =  list.split("-");
                   var open = parseFloat(list[1])
                   var closed = parseFloat(list[2])

                       if((document.getElementsByTagName("li")[i].innerHTML === list[0]) && (dateTime < open || dateTime > closed)){
                         document.getElementsByTagName("li")[i].remove()
                 }
                       if (document.getElementsByTagName("li")[i].innerHTML === list[0] && list[1] === "NULL"){
                           document.getElementsByTagName("li")[i].remove()
                      }
                   }
                  }
                }
              initMap2();
            }
          }
//Endrer søkeobj basert på hvilke checkbokser som er markert og kaller på mainSok() med det oppdaterte søkeobjektet
          function checkSok(){
            var checkKvinne = document.getElementById('Kvinne');
            var checkMann = document.getElementById('Mann');
            var checkStellerom = document.getElementById('Stellerom');
            var checkAapentNa = document.getElementById('aapentNa');
            var checkAapentKl = document.getElementById('aapenKl');
            var checkHandicap = document.getElementById('Handicap');
            var checkMaxPris = document.getElementById('MaxPris');
            var checkGratis = document.getElementById('Gratis');
            var table = document.getElementById('table');
            var field = document.getElementsByTagName("li")

              if(checkKvinne.checked){
                sok.kjon = "dame"
              }

              if(checkMann.checked){
                sok.kjon = "herre"
              }

              if(checkStellerom.checked){
                sok.stellerom = "ja"
              }

              if(checkAapentNa.checked){
                sok.apentNa = "ja"
              }

              if(checkAapentKl.checked){
                sok.apentKl = document.getElementById('aapenKL').value
              }

              if(checkHandicap.checked){
                sok.handicap = "ja"
              }

              if(checkMaxPris.checked){
                sok.maxPris = "ja"
              }
              if(checkGratis.checked){
                sok.gratis = "ja"
              }
            mainSok(sok)

          }


// Laster inn alle toalett plasseringen og plasserer de i et options element
function options(){
for(var i = 0; i < data.entries.length; i++ ){
  var elm = document.createElement("OPTION");
  var txt = document.createTextNode(data.entries[i].plassering)
  elm.appendChild(txt)
  document.getElementById("favoritt").appendChild(elm)
  }
}

//Funksjonen returnerer valgt element fra options elementet
function optionsSelected(){
  var id = document.getElementById("favoritt");
     var index = id.selectedIndex;
        var selected = id.options[index].text;
      return  selected;

  }


var marker1 = undefined;
var marker2 = undefined;
//Finner nærmeste lekeplass ved å sammenligne forskjellige lokasjoner helt til den med kortest avstand blir returnert.
function findClosest(){
  marker1 = optionsSelected()
  for(var i = 0; i < data.entries.length; i++){
    if(marker1 === data.entries[i].plassering){
      var markerlat1= data.entries[i].latitude
      var markerlong1= data.entries[i].longitude
      marker1 = {lat: parseFloat(markerlat1), lng: parseFloat(markerlong1)}
    var  marker1Plassering = data.entries[i].plassering
    var  marker1Hverdag = data.entries[i].tid_hverdag
    var  marker1Lordag = data.entries[i].tid_lordag
    var  marker1Sondag = data.entries[i].tid_sondag
    }
  }
for( var j = 0; j < lekeplass.entries.length; j++){
  var markerlat2= lekeplass.entries[j].latitude
  var markerlong2= lekeplass.entries[j].longitude
  marker2 = {lat: parseFloat(markerlat2), lng: parseFloat(markerlong2)}
  var distance = avstand(marker1, marker2);

  for(var x = 0; x < lekeplass.entries.length; x++){
    var newMarkerlat2= lekeplass.entries[x].latitude
    var newMarkerlong2= lekeplass.entries[x].longitude
    var newMarker2 = {lat: parseFloat(newMarkerlat2), lng: parseFloat(newMarkerlong2)}
    var newDistance = avstand(marker1, newMarker2);

      if(distance > newDistance){
        distance = newDistance;
        var navn = lekeplass.entries[x].navn
        marker2 = newMarker2
      }
    }
  }
  document.getElementById("Lekeplass_navn").innerHTML = navn;
    document.getElementById("Lekeplass_avstand").innerHTML = distance;
    document.getElementById("favorittPlassering").innerHTML = marker1Plassering;
      document.getElementById("apningHverdag").innerHTML = marker1Hverdag;
        document.getElementById("apningLordag").innerHTML = marker1Lordag;
          document.getElementById("apningSondag").innerHTML = marker1Sondag;
      initMapDistance(marker1, marker2);
}
//Laster inn kart etter avstand er målt.
function initMapDistance(marker1, marker2) {
      var bryggen = {lat: 60.397, lng: 5.324};
       var map = new google.maps.Map(document.getElementById('mapDistance'), {
         zoom: 14,
         center: bryggen
       });
       var marker1 = new google.maps.Marker({
         position: marker1,
         label: "Toalett",
         map: map
       });
       var marker = new google.maps.Marker({
         position: marker2,
         label: "Lekeplass",
         map: map
       });
     }
//måler avstand fra marker1 til marker2, baset på Spherical law of Cosines, med noen endringer
function avstand(marker1, marker2){
 var lat1 = Math.PI * marker1.lat/180;
 var lat2 = Math.PI * marker2.lat/180;
 var radth = Math.PI * (marker1.lng-marker2.lng)/180
  var dist = (Math.sin(lat1) * Math.sin(lat2)) + (Math.cos(lat1) * Math.cos(lat2)) * Math.cos(radth);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344
  return dist;
}
