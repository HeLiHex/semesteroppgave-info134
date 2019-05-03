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
                    var tabell = document.getElementById("utdanning");
                    var årstall = document.createElement("tr");
                    var grunnskole = document.createElement("td");
                    var vgs = document.createElement("td");
                    var fagskole = document.createElement("td");
                    var bachelor = document.createElement("td");
                    var master = document.createElement("td");
                    var ingen = document.createElement("td");

                    årstall.innerHTML = år;
                    grunnskole.innerHTML = utdanning.getInfo(kom).Grunnskole[år];
                    årstall.innerHTML += "<td>" + grunnskole.innerHTML + "</td>";
                    tabell.appendChild(årstall);
                  }



                  //document.getElementById("detaljer").innerHTML = kommunenamn[i]+" | "+ kommunenummer[i];
                  //temp må ligge lengst nede og lengst bak.. den er BROKEN!!
                  //document.getElementById("detaljer").innerHTML += " | " + antal +" | "+sysselkommun.Begge[2018] +" | "+ parseInt(antal*(sysselkommun.Begge[2018]/100)) + " | " + total +" | " + parseInt(antal*(total/100));

         }
        }
    }

  utdanning.load();
    }
 syssel.load();

}
