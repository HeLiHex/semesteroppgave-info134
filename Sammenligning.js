/*
Kandidatnummer:
193, 324,292
*/

var sysselsetting = new Sysselsetting("http://wildboy.uib.no/~tpe056/folk/100145.json");

addEnterPressListener();

function sammenlign() {
    var kommunenr1 = document.getElementById("kommunenr1").value;
    var kommunenr2 = document.getElementById("kommunenr2").value;
    var container = document.getElementById("sammenligning");
    var table = document.getElementById("sammenligningsTable");

    sysselsetting.onload = function() {
        var kommune1Info = sysselsetting.getInfo(kommunenr1);
        var kommune2Info = sysselsetting.getInfo(kommunenr2);

        clearTable(table);
        createHeader(table, kommunenr1, kommunenr2);
        createTable(table, kommune1Info, kommune2Info);
    };
    sysselsetting.load();
}

/*
samenlignerer to elementer og markerer den høyeste ved å assigne html klassen marked
dersom de er like blir begge markert
*/
function markHighest(one, two){
    if (parseFloat(one.innerHTML) > parseFloat(two.innerHTML)) {
        one.classList.add('marked');
    } else if (parseFloat(one.innerHTML) < parseFloat(two.innerHTML)) {
        two.classList.add('marked');
    } else {
        two.classList.add('markedEqual');
        one.classList.add('markedEqual');
    }
}

//Lager selve inholdet til tabellen ved å loope gjennom antall årstall og lage en rad med td elementer i som blir appendet til tabellen
function createTable(table, kommune1Info, kommune2Info){
    for (år in kommune1Info.Menn) {
        var row = document.createElement("tr");

        createTableElement(row, år, "td");
        createTableElement(row, kommune1Info.Menn[år], "td");
        createTableElement(row, kommune2Info.Menn[år], "td");
        createTableElement(row, kommune1Info.Kvinner[år], "td");
        createTableElement(row, kommune2Info.Kvinner[år], "td");

        if (år == "2005") {
            createTableElement(row, 0, "td");
            createTableElement(row, 0, "td");
            createTableElement(row, 0, "td");
            createTableElement(row, 0, "td");
        } else {
            var endringkommune1menn = createTableElement(row, (kommune1Info.Menn[år] - kommune1Info.Menn[år - 1]).toFixed(1), "td");
            var endringkommune2menn = createTableElement(row, (kommune2Info.Menn[år] - kommune2Info.Menn[år - 1]).toFixed(1), "td");
            markHighest(endringkommune1menn, endringkommune2menn);

            var endringkommune1kvinner = createTableElement(row, (kommune1Info.Kvinner[år] - kommune1Info.Kvinner[år - 1]).toFixed(1), "td");
            var endringkommune2kvinner = createTableElement(row, (kommune2Info.Kvinner[år] - kommune2Info.Kvinner[år - 1]).toFixed(1), "td");
            markHighest(endringkommune1kvinner, endringkommune2kvinner);
        }

        table.appendChild(row);
    }
}


//Lager headeren til tabellen ved å lage 9 th elementer i en rad og appender raden til tabellen
function createHeader(table, kom1, kom2) {
    var kommune1namn = sysselsetting.getNamesKom(kom1);
    var kommune2namn = sysselsetting.getNamesKom(kom2);

    var row = document.createElement("tr");

    createTableElement(row, "år", "th");
    createTableElement(row, "Menn i " + kommune1namn, "th");
    createTableElement(row, "Menn i " + kommune2namn, "th");
    createTableElement(row, "Kvinner i " + kommune1namn, "th");
    createTableElement(row, "Kvinner i " + kommune2namn, "th");
    createTableElement(row, "Endring " + kommune1namn + " menn", "th");
    createTableElement(row, "Endring " + kommune2namn + " menn", "th");
    createTableElement(row, "Endring " + kommune1namn + " kvinner", "th");
    createTableElement(row, "Endring " + kommune2namn + " kvinner", "th");

    table.appendChild(row);
}


/*
En funksjon som legger til en listener i de to inputfeltene.
Eventlistnerne lytter etter keyCode = 13 som er enter.
Når enter blir trykket vil sammenlignings knappen bli trykket
*/
function addEnterPressListener(){
    var input1 = document.getElementById("kommunenr1");
    var input2 = document.getElementById("kommunenr2");
    input2.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("sambutton").click();
        }
    });

    input1.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("sambutton").click();
        }
    });
}

//sletter alt i tabellen
function clearTable(table){
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}


/*
En funksjon som lager et htlm element av typen tag, setter innerHTML til string, og appender til en rad.
Funskjone blir brukt til å lage th og td-er som legges inn i en parameteret rad som er et tr element.
Funksjonen returnerer elementet, men blir bare brukt i tilfellene der et element skal markeres.
*/
function createTableElement(rad, string, tag){
    var element = document.createElement(tag);
    element.innerHTML = string;
    rad.appendChild(element);
    return element;
}
