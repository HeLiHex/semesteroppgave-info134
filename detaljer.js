var urlbefolk = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var urlsyssel = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var urlutdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json";

var syssel = new Sysselsetting(urlsyssel);
var utdanning = new Utdanning(urlutdanning);

function detaljer(kom) {
       syssel.onload = function(){
      utdanning.onload = function(){
        var kommunenamn = befolk.getNames();
        var kommunenummer = befolk.getIDs();
        var sysselkommun = syssel.getInfo(kom)

        var utdanMen1 = utdanning.getInfo(kom).Bachelor.Menn[2017];
        var utdanMen2 = utdanning.getInfo(kom).Master.Menn[2017];
        var utdanMenTotal = parseInt(utdanMen1 + utdanMen2);

        var utdanKvinn1 = utdanning.getInfo(kom).Bachelor.Kvinner[2017];
        var utdanKvinn2 = utdanning.getInfo(kom).Master.Kvinner[2017];
        var utdanKvinnTotal = parseInt(utdanKvinn1 + utdanKvinn2);

        var total = utdanKvinnTotal + utdanMenTotal;

        for (i in kommunenamn){
               if (kommunenummer[i] == kom) {
                  table = document.getElementById("detaljer2");
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



                  for (år in befolk.getInfo(kom).Menn) {

                      //befolkning
                      var tabell = document.getElementById("befolkning");
                      var årstall = document.createElement("tr");
                      var befolkning = document.createElement("td");
                      var kvinner = document.createElement("td");
                      var menn = document.createElement("td");

                      årstall.innerHTML = år;
                      kvinner.innerHTML = temp.Kvinner[år];
                      menn.innerHTML = temp.Menn[år];
                      befolkning.innerHTML =  temp.Kvinner[år] + 0 + temp.Menn[år];
                      årstall.innerHTML += "<td>" + kvinner.innerHTML + "</td>" + "<td>" + menn.innerHTML + "</td>" + "<td>"+ befolkning.innerHTML + "</td>";
                      tabell.appendChild(årstall);

                      //sysselsetting
                      var tabellSyssel = document.getElementById("sysselsatte");
                      var årstallSyssel = document.createElement("tr");
                      var sysselsatte = document.createElement("td");
                      var kvinnerSyssel = document.createElement("td");
                      var mennSyssel = document.createElement("td");

                      årstallSyssel.innerHTML = år;
                      sysselsatte.innerHTML = syssel.getInfo(kom).Begge[år];
                      kvinnerSyssel.innerHTML = syssel.getInfo(kom).Kvinner[år];
                      mennSyssel.innerHTML = syssel.getInfo(kom).Menn[år];
                      årstallSyssel.innerHTML += "<td>" + kvinnerSyssel.innerHTML + "</td>" +"<td>" + mennSyssel.innerHTML + "</td>" +"<td>" + sysselsatte.innerHTML + "</td>";
                      tabellSyssel.appendChild(årstallSyssel);
                  }

                  for (år in befolk.getInfo(kom).Menn) {
                    if(år > 2017){
                      break;
                    }

                    var tabell = document.getElementById("utdanning");
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
                    tabell.appendChild(årstall);
                  }
         }
        }
    }

  utdanning.load();
    }
 syssel.load();

}
