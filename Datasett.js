var test = new Utdanning("http://wildboy.uib.no/~tpe056/folk/85432.json");


//de 3 konstruktørene
function Utdanning(url) {
	this.url = url;
	this.load = load(url, this);
	this.getNames = function() {
		return getNames(this.data);
	};
	this.getIDs = function() {
		return getIDs(this.data);
	};
	this.getInfo = function() {
		return getInfoUtdanning("0101", this.data);
	};
}

function Sysselsetting(url) {
	this.url = url;
	this.load = load(url, this);
	this.getNames = function() {
		return getNames(this.data);
	};
	this.getIDs = function() {
		return getIDs(this.data);
	};
	this.getInfo = function() {
		return getInfo("0101", this.data);
	};
}

function Befolkning(url) {
	this.url = url;
	this.load = load(url, this);
	this.getNames = function() {
		return getNames(this.data);
	};
	this.getIDs = function() {
		return getIDs(this.data);
	};
	this.getInfo = function() {
		return getInfo("0101", this.data);
	};
}



// funksjoner
function load(url, obj) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status === 200) {
			obj.data = JSON.parse(xhr.responseText);
		}
	};
	xhr.send();
}

function getNames(data) {
	var list = [];
	for (i in data.elementer) {
		list.push(i);
	}
	return list;
}

function getIDs(data) {
	var list = [];
	for (i in data.elementer) {
		list.push(data.elementer[i].kommunenummer);
	}
	return list;
}

function getInfo(kommunenummer,data){
    var list = [];
    var list2 = [];
    for(i in data.elementer){
        if(kommunenummer == data.elementer[i].kommunenummer){
            list.push(data.elementer[i].Menn);
            list2.push(data.elementer[i].Kvinner);
        }
    }
    return [list,list2];

}

function getInfoUtdanning(kommunenummer, data) {
	for (i in data.elementer) {
		if (kommunenummer == data.elementer[i].kommunenummer) {
			return (obj = {
				Grunnskole: data.elementer[i]["01"],
				Videregående: data.elementer[i]["02a"],
				Fagskole: data.elementer[i]["11"],
				Bachelor: data.elementer[i]["03a"],
				Master: data.elementer[i]["04a"],
				Ingen: data.elementer[i]["09a"]
			});
		}
	}
}
