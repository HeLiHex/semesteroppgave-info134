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

        årHeader.innerHTML = "År";
        kommune1HeaderMenn.innerHTML = "Menn i kommuen 1";
        kommune2HeaderMenn.innerHTML = "Menn i kommuen 2";
        kommune1HeaderKvinne.innerHTML = "Kvinner i kommuen 1";
        kommune2HeaderKvinne.innerHTML = "Kvinner i kommuen 2";

        row.appendChild(årHeader);
        row.appendChild(kommune1HeaderMenn);
        row.appendChild(kommune2HeaderMenn);
        row.appendChild(kommune1HeaderKvinne);
        row.appendChild(kommune2HeaderKvinne);

        table.appendChild(row);

        for (år in kommune1Info.Menn) {
            row = document.createElement("tr");
            var årstall = document.createElement("td");
			var prosentMennKommune1 = document.createElement("td");
            var prosentMennKommune2 = document.createElement("td");
            var prosentKvinneKommune1 = document.createElement("td");
            var prosentKvinneKommune2 = document.createElement("td");

			årstall.innerHTML = år;
			prosentMennKommune1.innerHTML = kommune1Info.Menn[år];
            prosentMennKommune2.innerHTML = kommune2Info.Menn[år];
            prosentKvinneKommune1.innerHTML = kommune1Info.Kvinner[år];
            prosentKvinneKommune2.innerHTML = kommune2Info.Kvinner[år];

            row.appendChild(årstall);
            row.appendChild(prosentMennKommune1);
            row.appendChild(prosentMennKommune2);
            row.appendChild(prosentKvinneKommune1);
            row.appendChild(prosentKvinneKommune2);

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
