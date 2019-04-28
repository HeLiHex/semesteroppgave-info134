

var url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
/*xhr.open("GET",url);
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
*/

var kommuner = document.getElementById("oversikt");
var befolk = new Befolkning(url);
	befolk.onload = function(){
	var kommunenummer = befolk.getIDs();

		for (i in kommunenummer) {
			var komstring = document.createElement("tr");
			var nrstring = document.createElement("td");
			var befolkstring = document.createElement("td");
			nrstring.innerHTML = kommunenummer[i];

			var temp = befolk.getInfo(kommunenummer[i]);
			befolkstring.innerHTML = temp.Kvinner[2018] + 0 + temp.Menn[2018];

			
			komstring.innerHTML = "<td>"+i+"</td>"+nrstring.innerHTML + "<td>"+ befolkstring.innerHTML;
			kommuner.appendChild(komstring);
		}



}
befolk.load();

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
