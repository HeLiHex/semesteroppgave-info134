var sysselsetting = new Sysselsetting(
	"http://wildboy.uib.no/~tpe056/folk/100145.json"
);

function sammenlign() {
	var kommunenr1 = document.getElementById("kommunenr1").value;
	var kommunenr2 = document.getElementById("kommunenr2").value;
	var container = document.getElementById("sammenligning");
	var table = document.getElementById("sammenligningsTable");
	sysselsetting.onload = function() {
		var kommune1Info = sysselsetting.getInfo(kommunenr1);
		var kommune2Info = sysselsetting.getInfo(kommunenr2);

		var row = document.createElement("tr");

		var årHeader = document.createElement("th");
		var kommune1HeaderMenn = document.createElement("th");
		var kommune2HeaderMenn = document.createElement("th");
		var kommune1HeaderKvinne = document.createElement("th");
		var kommune2HeaderKvinne = document.createElement("th");
		var endringkommune1mennHeader = document.createElement("th");
		var endringkommune2mennHeader = document.createElement("th");
		var endringkommune1kvinnerHeader = document.createElement("th");
		var endringkommune2kvinnerHeader = document.createElement("th");

		årHeader.innerHTML = "År";
		kommune1HeaderMenn.innerHTML = "Menn i kommune 1";
		kommune2HeaderMenn.innerHTML = "Menn i kommune 2";
		kommune1HeaderKvinne.innerHTML = "Kvinner i kommune 1";
		kommune2HeaderKvinne.innerHTML = "Kvinner i kommune 2";
		endringkommune1mennHeader.innerHTML = "endring kommune 1 menn"
		endringkommune2mennHeader.innerHTML = "endring kommune 2 menn"
		endringkommune1kvinnerHeader.innerHTML = "endring kommune 1 kvinner"
		endringkommune2kvinnerHeader.innerHTML = "endring kommune 2 kvinner"

		row.appendChild(årHeader);
		row.appendChild(kommune1HeaderMenn);
		row.appendChild(endringkommune1mennHeader);
		row.appendChild(kommune2HeaderMenn);
		row.appendChild(endringkommune2mennHeader);
		row.appendChild(kommune1HeaderKvinne);
		row.appendChild(endringkommune1kvinnerHeader);
		row.appendChild(kommune2HeaderKvinne);
		row.appendChild(endringkommune2kvinnerHeader);

		table.appendChild(row);

		for (år in kommune1Info.Menn) {
			row = document.createElement("tr");
			var årstall = document.createElement("td");
			var prosentMennKommune1 = document.createElement("td");
			var prosentMennKommune2 = document.createElement("td");
			var prosentKvinneKommune1 = document.createElement("td");
			var prosentKvinneKommune2 = document.createElement("td");

			var endringkommune1menn = document.createElement("td");
			var endringkommune2menn = document.createElement("td");
			var endringkommune1kvinner = document.createElement("td");
			var endringkommune2kvinner = document.createElement("td");

			årstall.innerHTML = år;
			prosentMennKommune1.innerHTML = kommune1Info.Menn[år];
			prosentMennKommune2.innerHTML = kommune2Info.Menn[år];
			prosentKvinneKommune1.innerHTML = kommune1Info.Kvinner[år];
			prosentKvinneKommune2.innerHTML = kommune2Info.Kvinner[år];

			if (år == "2005") {
				endringkommune1menn.innerHTML =  0;
				endringkommune2menn.innerHTML =  0;
				endringkommune1kvinner.innerHTML = 0;
				endringkommune2kvinner.innerHTML = 0;
			} else {
				endringkommune1menn.innerHTML =  (kommune1Info.Menn[år] - kommune1Info.Menn[år-1]).toFixed(1);
				endringkommune2menn.innerHTML =  (kommune2Info.Menn[år] - kommune2Info.Menn[år-1]).toFixed(1);
				endringkommune1kvinner.innerHTML =  (kommune1Info.Kvinner[år] - kommune1Info.Kvinner[år-1]).toFixed(1);
				endringkommune2kvinner.innerHTML =  (kommune2Info.Kvinner[år] - kommune2Info.Kvinner[år-1]).toFixed(1);
			}

			row.appendChild(årstall);
			row.appendChild(prosentMennKommune1);
			row.appendChild(endringkommune1menn);
			row.appendChild(prosentMennKommune2);
			row.appendChild(endringkommune2menn);
			row.appendChild(prosentKvinneKommune1);
			row.appendChild(endringkommune1kvinner);
			row.appendChild(prosentKvinneKommune2);
			row.appendChild(endringkommune2kvinner);

			table.appendChild(row);
		}

		//Menn
		console.log(kommune1Info.Menn);
		console.log(kommune2Info.Menn);

		//Kvinner
		console.log(kommune1Info.Kvinner);
		console.log(kommune2Info.Kvinner);

		var rad = document.createElement("tr");
		var colonne = document.createElement("td");
	};
	console.log(kommunenr1 + " " + kommunenr2);
	sysselsetting.load();
}

function endring(forrige, nåværende) {
	return nåværende - current;
}
