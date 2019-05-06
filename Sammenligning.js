var sysselsetting = new Sysselsetting(
	"http://wildboy.uib.no/~tpe056/folk/100145.json"
);

        var input = document.getElementById("kommunenr1");
        var input2 = document.getElementById("kommunenr2");

        input2.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("sambutton").click();
    }
});

        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("sambutton").click();
    }
});

function sammenlign() {
	var kommunenr1 = document.getElementById("kommunenr1").value;
	var kommunenr2 = document.getElementById("kommunenr2").value;
	var container = document.getElementById("sammenligning");
	var table = document.getElementById("sammenligningsTable");
	sysselsetting.onload = function() {
		var kommune1Info = sysselsetting.getInfo(kommunenr1);
		var kommune2Info = sysselsetting.getInfo(kommunenr2);

        createHeader(table);

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

			console.log(endringkommune1menn);
			if (parseFloat(endringkommune1menn.innerHTML) > parseFloat(endringkommune2menn.innerHTML)) {
				endringkommune1menn.classList.add('marked');
			} else if (parseFloat(endringkommune1menn.innerHTML) < parseFloat(endringkommune2menn.innerHTML)){
				endringkommune2menn.classList.add('marked');
			} else {
				endringkommune2menn.classList.add('marked');
				endringkommune1menn.classList.add('marked');
			}

			if (parseFloat(endringkommune1kvinner.innerHTML) > parseFloat(endringkommune2kvinner.innerHTML)) {
				endringkommune1kvinner.classList.add('marked');
			} else if (parseFloat(endringkommune1kvinner.innerHTML) < parseFloat(endringkommune2kvinner.innerHTML)){
				endringkommune2kvinner.classList.add('marked');
			} else {
				endringkommune2kvinner.classList.add('marked');
				endringkommune1kvinner.classList.add('marked');
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


		var rad = document.createElement("tr");
		var colonne = document.createElement("td");
	};
	sysselsetting.load();
}

function endring(forrige, nåværende) {
	return nåværende - current;
}


function createHeader(table){
    var kommune1namn = sysselsetting.getNamesKom(kommunenr1);
    var kommune2namn = sysselsetting.getNamesKom(kommunenr2);

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
    kommune1HeaderMenn.innerHTML = "Menn i " + kommune1namn;
    kommune2HeaderMenn.innerHTML = "Menn i " + kommune2namn;
    kommune1HeaderKvinne.innerHTML = "Kvinner i " + kommune1namn;
    kommune2HeaderKvinne.innerHTML = "Kvinner i " + kommune2namn;
    endringkommune1mennHeader.innerHTML = "Endring "+kommune1namn+" menn"
    endringkommune2mennHeader.innerHTML = "Endring "+kommune2namn+" menn"
    endringkommune1kvinnerHeader.innerHTML = "Endring "+kommune1namn+" kvinner"
    endringkommune2kvinnerHeader.innerHTML = "Endring "+kommune2namn+" kvinner"

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
}
