var sysselsetting = new Sysselsetting("http://wildboy.uib.no/~tpe056/folk/100145.json");

function sammenlign(){
    var kommunenr1 = document.getElementById('kommunenr1').value;
    var kommunenr2 = document.getElementById('kommunenr2').value;
    var container = document.getElementsById('sammenligning');
    sysselsetting.onload = function (){
        

    }
    console.log(kommunenr1 + " " + kommunenr2);
    sysselsetting.load();
}
