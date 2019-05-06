

var url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var xhr = new XMLHttpRequest();
var kommuner = document.getElementById("oversikt");
xhr.open("GET",url);
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4 && xhr.status===200){
		var responseObj = JSON.parse(xhr.responseText);
		for (i in responseObj.elementer) {
			var komstring = document.createElement("tr");
			var nrstring = document.createElement("td");
			var befolkstring = document.createElement("td");
			befolkstring.innerHTML = totaltInnbyggere(responseObj);
			nrstring.innerHTML = responseObj.elementer[i].kommunenummer;
			komstring.innerHTML = "<td>"+i+"</td>"+nrstring.innerHTML + "<td>"+ befolkstring.innerHTML;
			kommuner.appendChild(komstring);
		}
	}
}
xhr.send();

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

function hideFunction(button) {
  var a = document.getElementsByClassName("intro").item(0);
  var b = document.getElementsByClassName("oversikt").item(0);
  var c = document.getElementsByClassName("detaljer").item(0);
  var d = document.getElementsByClassName("sammenligning").item(0);

  if (button == "Introduksjon") {
  	a.style.display = "inline";
    b.style.display = "none";
    c.style.display = "none";
    d.style.display = "none";
  }
  else if(button == "Oversikt") {
    a.style.display = "none";
    b.style.display = "inline";
    c.style.display = "none";
    d.style.display = "none";
  }
  else if (button == "Detaljer"){
  	a.style.display = "none";
  	b.style.display = "none";
  	c.style.display = "inline";
  	d.style.display = "none";
  }
  else if (button == "Sammenligning"){
  	a.style.display = "none";
  	b.style.display = "none";
  	c.style.display = "none";
  	d.style.display = "inline";
  }
}
