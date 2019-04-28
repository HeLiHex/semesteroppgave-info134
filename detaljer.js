
function detaljer(kom) {
  var befolkmenn=0;
  var befolkkvinner=0;
   var kommunenr = kom;
   if (kommunenr != null) {
     var urlbefolk = "http://wildboy.uib.no/~tpe056/folk/104857.json";
     var xhr = new XMLHttpRequest();
     xhr.open("GET",urlbefolk);
     xhr.onreadystatechange = function(){
     	if(xhr.readyState == 4 && xhr.status===200){
     		var responseObj = JSON.parse(xhr.responseText);
     		for (i in responseObj.elementer) {
          if (responseObj.elementer[i].kommunenummer == kommunenr) {
            document.getElementById("detaljer").innerHTML = i + " | " +responseObj.elementer[i].kommunenummer + "  |  " + totaltInnbyggere(responseObj);
            befolkmenn=responseObj.elementer[i].Kvinner[2018]; // Får inte ut variabeln utanför req
            befolkkvinner=responseObj.elementer[i].Menn[2018];
          }
     		}

     	}
     }
     xhr.send();
   }
     if (kommunenr != null) {
     var urlsyssel = "http://wildboy.uib.no/~tpe056/folk/100145.json";
     var xhr2 = new XMLHttpRequest();
     xhr2.open("GET",urlsyssel);
     xhr2.onreadystatechange = function(){
      if(xhr2.readyState == 4 && xhr2.status===200){
        var responseObj = JSON.parse(xhr2.responseText);
        for (i in responseObj.elementer) {
          var sysselsettning = responseObj.elementer[i]["Begge kjønn"][2018];
          if (responseObj.elementer[i].kommunenummer == kommunenr) {
            document.getElementById("detaljer").innerHTML += " | "+sysselsettning;
          }
        }

      }
     }
     xhr2.send();
   }

    if (kommunenr != null) {
     var urlutdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json";
     var xhr3 = new XMLHttpRequest();
     xhr3.open("GET",urlutdanning);
     xhr3.onreadystatechange = function(){
      if(xhr3.readyState == 4 && xhr3.status===200){
        var responseObj = JSON.parse(xhr3.responseText);
        for (i in responseObj.elementer) {
          //console.log(responseObj.elementer[i]);
          if (responseObj.elementer[i].kommunenummer == kommunenr) {
            //document.getElementById("detaljer").innerHTML = i + " | " +responseObj.elementer[i].kommunenummer + "  |  " + totaltInnbyggere(responseObj);
          }
        }

      }
     }
     xhr3.send();
   }
}

function totaltInnbyggere(responseObj) {
  var innbyggere = 0;
 for (år in responseObj.elementer[i].Menn) {
   if (år == "2018") {
     innbyggere+= parseInt(responseObj.elementer[i].Menn[år]);
   }
 }
 for (år in responseObj.elementer[i].Kvinner) {
   if (år == "2018") {
     innbyggere+= parseInt(responseObj.elementer[i].Kvinner[år]);
   }
 }
 return innbyggere;
}
