/*
Kandidatnummer:
193, 324,292
*/
var urlbefolk = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var urlsyssel = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var urlutdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json";

var syssel = new Sysselsetting(urlsyssel);
var utdanning = new Utdanning(urlutdanning);

        var input = document.getElementById("inputnummer");
        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("btnSearch").click();
    }
});

function detaljer(kom) {
       syssel.onload = function(){
        utdanning.onload = function(){
        var kommunenamn = befolk.getNames();
        var kommunenummer = befolk.getIDs();
        var sysselkommun = syssel.getInfo(kom);

        var table = document.getElementById("detaljer2");
        var tabellBefolk = document.getElementById("befolkning");
        var tabellSyssel = document.getElementById("sysselsatte");
        var tabellUtdanning = document.getElementById("utdanning");

        var utdanMen1 = utdanning.getInfo(kom).Bachelor.Menn[2017];
        var utdanMen2 = utdanning.getInfo(kom).Master.Menn[2017];
        var utdanMenTotal = parseInt(utdanMen1 + utdanMen2);

        var utdanKvinn1 = utdanning.getInfo(kom).Bachelor.Kvinner[2017];
        var utdanKvinn2 = utdanning.getInfo(kom).Master.Kvinner[2017];
        var utdanKvinnTotal = parseInt(utdanKvinn1 + utdanKvinn2);

        var total = utdanKvinnTotal + utdanMenTotal;

//funksjonalitet for å oppdatere tabellene når bruker setter inn ny kommune.
        updateTable(table);
        updateTable(tabellBefolk);
        updateTable(tabellSyssel);
        updateTable(tabellUtdanning);

        for (i in kommunenamn){
               if (kommunenummer[i] == kom) {
                  var rad = document.createElement("tr");
                  createTh(rad, "Kommune");
                  createTh(rad, "Kommunenummer");
                  createTh(rad, "Befolkning");
                  createTh(rad,"Sysselsettings%");
                  createTh(rad,"Antall sysselsatte");
                  createTh(rad,"Utdannings%");
                  createTh (rad,"Antall med høyere utdanning");

                  table.appendChild(rad);

                  var result = document.createElement("tr");
                  var namn = document.createElement("td");
                  var nummer = document.createElement("td");
                  var befolkning = document.createElement("td");
                  var sysselprocent = document.createElement("td");
                  var sysselantal = document.createElement("td");
                  var utdanningprocent = document.createElement("td");
                  var utdanningantal = document.createElement("td");

                  namn.innerHTML = kommunenamn[i];
                  nummer.innerHTML = kommunenummer[i];
                  var temp = befolk.getInfo(kommunenummer[i]);
                  var antal = temp.Kvinner[2018] + 0 + temp.Menn[2018];
                  befolkning.innerHTML = antal;
                  sysselprocent.innerHTML = sysselkommun.Begge[2018];
                  sysselantal.innerHTML = parseInt(antal*(sysselkommun.Begge[2018]/100));
                  utdanningprocent.innerHTML = total;
                  utdanningantal.innerHTML = parseInt(antal*(total/100));
                  result.appendChild(namn);
                  result.appendChild(nummer);
                  result.appendChild(befolkning);
                  result.appendChild(sysselprocent);
                  result.appendChild(sysselantal);
                  result.appendChild(utdanningprocent);
                  result.appendChild(utdanningantal);
                  table.appendChild(result);

                  //befolkningshistorikk
                  var rad1 = document.createElement("tr");

                  createTh(rad1,"Årstall");
                  createTh(rad1,"Kvinner");
                  createTh(rad1,"Menn");
                  createTh(rad1,"Total befolkning");

                  tabellBefolk.appendChild(rad1);

                  for (år in befolk.getInfo(kom).Menn) {
                      //befolkning
                      var årstall = document.createElement("tr");
                      var befolkning = document.createElement("td");
                      var kvinner = document.createElement("td");
                      var menn = document.createElement("td");

                      årstall.innerHTML = år;
                      kvinner.innerHTML = temp.Kvinner[år];
                      menn.innerHTML = temp.Menn[år];
                      befolkning.innerHTML =  temp.Kvinner[år] + 0 + temp.Menn[år];
                      årstall.innerHTML += "<td>" + kvinner.innerHTML + "</td>" + "<td>" + menn.innerHTML + "</td>" + "<td>"+ befolkning.innerHTML + "</td>";
                      tabellBefolk.appendChild(årstall);
                    }


                  //sysselhistorikk
                  var rad2 = document.createElement("tr");

                  createTh(rad2,"Årstall");
                  createTh(rad2,"Kvinner");
                  createTh(rad2,"Menn");
                  createTh(rad2,"Total sysselsatte");

                  tabellSyssel.appendChild(rad2);


                  //fyller informasjon i tabell for sysselsetting
                  for (år in befolk.getInfo(kom).Menn) {
                      //sysselsetting
                      var rad5 = document.createElement("tr");
                      rad5.innerHTML = år;

                      //oppretter td elementene i tabell for sysselsetting
                      createSyssel(syssel.getInfo(kom).Begge[år], rad5);
                      createSyssel(syssel.getInfo(kom).Kvinner[år], rad5);
                      createSyssel(syssel.getInfo(kom).Menn[år], rad5);

                      tabellSyssel.appendChild(rad5);
                  }

                  var rad3 = document.createElement("tr");

                  createTh(rad3,"Årstall");
                  createTh(rad3,"Grunnskole");
                  createTh(rad3,"Videregående skole");
                  createTh(rad3,"Fagskole");
                  createTh(rad3,"Bachelorgrad");
                  createTh(rad3,"Mastergrad");
                  createTh(rad3,"Ingen utdanning");

                  tabellUtdanning.appendChild(rad3);

                  for (år in befolk.getInfo(kom).Menn) {
                    //check for å få riktig antal år siden år slutter på 2017
                    if(år > 2017){
                      break;
                    }
                    var rad4 = document.createElement("tr");

                    befolkmennut = befolk.getInfo(kom).Menn[år];
                    befolkkvinnut = befolk.getInfo(kom).Kvinner[år];
                    befolktot = befolkmennut + befolkkvinnut;

                    rad4.innerHTML = år;
                    //setter in verdier for utdanningsnivåer
                    createUtd(utdanning.getInfo(kom).Grunnskole, år, befolkmennut, befolkkvinnut, befolktot, rad4);
                    createUtd(utdanning.getInfo(kom).Videregående, år, befolkmennut, befolkkvinnut, befolktot, rad4);
                    createUtd(utdanning.getInfo(kom).Fagskole, år, befolkmennut, befolkkvinnut, befolktot, rad4);
                    createUtd(utdanning.getInfo(kom).Bachelor, år, befolkmennut, befolkkvinnut, befolktot, rad4);
                    createUtd(utdanning.getInfo(kom).Master, år, befolkmennut, befolkkvinnut, befolktot, rad4);
                    createUtd(utdanning.getInfo(kom).Ingen, år, befolkmennut, befolkkvinnut, befolktot, rad4);


                    tabellUtdanning.appendChild(rad4);
                  }
         }
        }
    }

  utdanning.load();
    }
 syssel.load();

}

function createSyssel(data, rad5) {
  var sysselsatte = document.createElement("td");
  sysselsatte.innerHTML = data;
  rad5.appendChild(sysselsatte);

}

function createUtd(skolenivå, år, befolkmennut, befolkkvinnut, befolktot, årstall) {
  var skole = document.createElement("td");
  grunnskolemenn = skolenivå.Menn[år];
  grunnskolekvinner = skolenivå.Kvinner[år];
  num= ((((grunnskolemenn/100)*befolkmennut) + ((grunnskolekvinner/100)*befolkkvinnut))/befolktot)*100;
  skole.innerHTML = num.toFixed(1);
  årstall.appendChild(skole);
}

function updateTable(table){
  while(table.firstChild){
      table.removeChild(table.firstChild);
  }
}

function createTh(rad, string) {
  var element = document.createElement("th");
  element.innerHTML = string;
  rad.appendChild(element);
}
