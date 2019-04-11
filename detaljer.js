function detaljer() {
   var kommunenr = prompt("Hvilken kommune ønsker du å se detaljer om?", "Kommunenummer");

   if (kommunenr != null) {
     var url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
     var xhr = new XMLHttpRequest();
     xhr.open("GET",url);
     xhr.onreadystatechange = function(){
     	if(xhr.readyState == 4 && xhr.status===200){
     		var responseObj = JSON.parse(xhr.responseText);
     		for (i in responseObj.elementer) {
          if (responseObj.elementer[i].kommunenummer == kommunenr) {
            document.getElementById("detaljer").innerHTML = responseObj.elementer[i].kommunenummer + "  |  " + totaltInnbyggere(responseObj);

          }
     		}

     	}
     }
     xhr.send();

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
