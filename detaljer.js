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
        var tabell2 = document.getElementById("utdanning");

        var utdanMen1 = utdanning.getInfo(kom).Bachelor.Menn[2017];
        var utdanMen2 = utdanning.getInfo(kom).Master.Menn[2017];
        var utdanMenTotal = parseInt(utdanMen1 + utdanMen2);

        var utdanKvinn1 = utdanning.getInfo(kom).Bachelor.Kvinner[2017];
        var utdanKvinn2 = utdanning.getInfo(kom).Master.Kvinner[2017];
        var utdanKvinnTotal = parseInt(utdanKvinn1 + utdanKvinn2);

        var total = utdanKvinnTotal + utdanMenTotal;

      while(table.firstChild){
      table.removeChild(table.firstChild);
    }
          while(tabellBefolk.firstChild){
      tabellBefolk.removeChild(tabellBefolk.firstChild);
    }

          while(tabellSyssel.firstChild){
      tabellSyssel.removeChild(tabellSyssel.firstChild);
    }

              while(tabell2.firstChild){
      tabell2.removeChild(tabell2.firstChild);
    }

        for (i in kommunenamn){
               if (kommunenummer[i] == kom) {
                  var rad = document.createElement("tr");
                  var kommuneHeader = document.createElement("th");
                  var kommunenrHeader = document.createElement("th");
                  var befolkningHeader = document.createElement("th");
                  var sysselsettingHeader = document.createElement("th");
                  var sysselsettingantallHeader = document.createElement("th");
                  var utdanningHeader = document.createElement("th");
                  var utdanningantallHeader= document.createElement("th");

                  kommuneHeader.innerHTML = "Kommune";
                  kommunenrHeader.innerHTML = "Kommunenummer";
                  befolkningHeader.innerHTML = "Befolkning";
                  sysselsettingHeader.innerHTML = "Sysselsettings%";
                  sysselsettingantallHeader.innerHTML = "Antall sysselsatte";
                  utdanningHeader.innerHTML = "Utdannings%";
                  utdanningantallHeader.innerHTML = "Antall med høyere utdanning";

                  rad.appendChild(kommuneHeader);
                  rad.appendChild(kommunenrHeader);
                  rad.appendChild(befolkningHeader);
                  rad.appendChild(sysselsettingHeader);
                  rad.appendChild(sysselsettingantallHeader);
                  rad.appendChild(utdanningHeader);
                  rad.appendChild(utdanningantallHeader);

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
                  var årHeader = document.createElement("th");
                  var kvinnerHeader = document.createElement("th");
                  var mennHeader = document.createElement("th");
                  var totalHeader = document.createElement("th");

                  årHeader.innerHTML = "Årstall";
                  kvinnerHeader.innerHTML = "Kvinner";
                  mennHeader.innerHTML = "Menn";
                  totalHeader.innerHTML = "Total befolkning";

                  rad1.appendChild(årHeader);
                  rad1.appendChild(kvinnerHeader);
                  rad1.appendChild(mennHeader);
                  rad1.appendChild(totalHeader);
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
                  var årHeader = document.createElement("th");
                  var kvinnerHeader = document.createElement("th");
                  var mennHeader = document.createElement("th");
                  var totalHeader = document.createElement("th");

                  årHeader.innerHTML = "Årstall";
                  kvinnerHeader.innerHTML = "Kvinner";
                  mennHeader.innerHTML = "Menn";
                  totalHeader.innerHTML = "Totalt sysselsatte";

                  rad2.appendChild(årHeader);
                  rad2.appendChild(kvinnerHeader);
                  rad2.appendChild(mennHeader);
                  rad2.appendChild(totalHeader);
                  tabellSyssel.appendChild(rad2);

                  for (år in befolk.getInfo(kom).Menn) {
                      //sysselsetting
                      var årstallSyssel = document.createElement("tr");
                      var sysselsatte = document.createElement("td");
                      var kvinnerSyssel = document.createElement("td");
                      var mennSyssel = document.createElement("td");

                      årstallSyssel.innerHTML = år;
                      sysselsatte.innerHTML = syssel.getInfo(kom).Begge[år];
                      kvinnerSyssel.innerHTML = syssel.getInfo(kom).Kvinner[år];
                      mennSyssel.innerHTML = syssel.getInfo(kom).Menn[år];
                      årstallSyssel.innerHTML += "<td>" + kvinnerSyssel.innerHTML + "</td>" + "<td>" + mennSyssel.innerHTML + "</td>" + "<td>" + sysselsatte.innerHTML + "</td>";
                      tabellSyssel.appendChild(årstallSyssel);
                  }


                  var rad3 = document.createElement("tr");
                  var årHeader = document.createElement("th");
                  var grunnskoleHeader = document.createElement("th");
                  var vgsHeader = document.createElement("th");
                  var fagskoleHeader = document.createElement("th");
                  var bachelorHeader = document.createElement("th");
                  var masterHeader = document.createElement("th");
                  var ingenUtdHeader = document.createElement("th");

                  årHeader.innerHTML = "Årstall";
                  grunnskoleHeader.innerHTML = "Grunnskole";
                  vgsHeader.innerHTML = "Videregående skole";
                  fagskoleHeader.innerHTML = "Fagskole";
                  bachelorHeader.innerHTML = "Bachelorgrad";
                  masterHeader.innerHTML = "Mastergrad";
                  ingenUtdHeader.innerHTML = "Ingen utdanning";

                  rad3.appendChild(årHeader);
                  rad3.appendChild(grunnskoleHeader);
                  rad3.appendChild(vgsHeader);
                  rad3.appendChild(fagskoleHeader);
                  rad3.appendChild(bachelorHeader);
                  rad3.appendChild(masterHeader);
                  rad3.appendChild(ingenUtdHeader);

                  tabell2.appendChild(rad3);

                  for (år in befolk.getInfo(kom).Menn) {
                    //utdanning
                    if(år > 2017){
                      break;
                    }

                    var årstall = document.createElement("tr");
                    var grunnskole = document.createElement("td");
                    var vgs = document.createElement("td");
                    var fagskole = document.createElement("td");
                    var bachelor = document.createElement("td");
                    var master = document.createElement("td");
                    var ingen = document.createElement("td");

                    befolkmennut = befolk.getInfo(kom).Menn[år];
                    befolkkvinnut = befolk.getInfo(kom).Kvinner[år];
                    befolktot = befolkmennut + befolkkvinnut;

                    årstall.innerHTML = år;
                    grunnskolemenn = utdanning.getInfo(kom).Grunnskole.Menn[år];
                    grunnskolekvinner = utdanning.getInfo(kom).Grunnskole.Kvinner[år];
                    num= ((((grunnskolemenn/100)*befolkmennut) + ((grunnskolekvinner/100)*befolkkvinnut))/befolktot)*100;
                    grunnskole.innerHTML =  num.toFixed(1);

                    vgsmenn = utdanning.getInfo(kom).Videregående.Menn[år];
                    vgskvinner = utdanning.getInfo(kom).Videregående.Kvinner[år];
                    num2= ((((vgsmenn/100)*befolkmennut) + ((vgskvinner/100)*befolkkvinnut))/befolktot)*100;
                    vgs.innerHTML = num2.toFixed(1);

                    fagskolemenn = utdanning.getInfo(kom).Fagskole.Menn[år];
                    fagskolekvinner = utdanning.getInfo(kom).Fagskole.Kvinner[år];
                    num3 = ((((fagskolemenn/100)*befolkmennut) + ((fagskolekvinner/100)*befolkkvinnut))/befolktot)*100;
                    fagskole.innerHTML = num3.toFixed(1);

                    bachelormenn = utdanning.getInfo(kom).Bachelor.Menn[år];
                    bachelorkvinner = utdanning.getInfo(kom).Bachelor.Kvinner[år];
                    num4 = ((((bachelormenn/100)*befolkmennut) + ((bachelorkvinner/100)*befolkkvinnut))/befolktot)*100;
                    bachelor.innerHTML = num4.toFixed(1);

                    mastermenn = utdanning.getInfo(kom).Master.Menn[år];
                    masterkvinner = utdanning.getInfo(kom).Master.Kvinner[år];
                    num5 = ((((mastermenn/100)*befolkmennut) + ((masterkvinner/100)*befolkkvinnut))/befolktot)*100;
                    master.innerHTML = num5.toFixed(1);

                    ingenmenn = utdanning.getInfo(kom).Ingen.Menn[år];
                    ingenkvinner = utdanning.getInfo(kom).Ingen.Kvinner[år];
                    num6 = ((((ingenmenn/100)*befolkmennut) + ((ingenkvinner/100)*befolkkvinnut))/befolktot)*100;
                    ingen.innerHTML = num6.toFixed(1);

                    årstall.innerHTML += "<td>" + grunnskole.innerHTML + "</td>" +  "<td>" + vgs.innerHTML + "</td>" +  "<td>" + fagskole.innerHTML + "</td>"+  "<td>" + bachelor.innerHTML + "</td>" +"<td>" + master.innerHTML + "</td>" +"<td>" + ingen.innerHTML + "</td>";
                    tabell2.appendChild(årstall);
                  }
         }
        }
    }

  utdanning.load();
    }
 syssel.load();

}
