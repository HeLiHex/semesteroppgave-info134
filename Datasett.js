//de 3 konstruktørene
function Utdanning(url) {
    this.url = url;
    this.onload = null;
    this.load = function() {
        return load(url, this, this.onload);
    };
    this.getNames = function() {
        return getNames(this.data);
    };
    this.getIDs = function() {
        return getIDs(this.data);
    };
    this.getInfo = function(kom) {
        return getInfoUtdanning(kom, this.data);
    };
}

function Sysselsetting(url) {
    this.url = url;
    this.onload = null;
    this.load = function() {
        return load(url, this, this.onload);
    };
<<<<<<< HEAD
    this.getNames = function() {
        return getNames(this.data);
    };
    this.getIDs = function() {
        return getIDs(this.data);
    };
    this.getInfo = function(kom) {
        return getInfosyssel(kom, this.data);
    };
=======
	this.getNames = function() {
		return getNames(this.data);
	};
	this.getIDs = function() {
		return getIDs(this.data);
	};
	this.getInfo = function(kom) {
		return getInfosyssel(kom, this.data);
	};
	this.getNamesKom = function(kom){
		return getNamesKom(kom,this.data);
	};
>>>>>>> 27619e77fda9c4f5692fe06e59879bc077e4b598
}

function Befolkning(url) {
    this.url = url;
    this.onload = null;
    this.getNames = function() {
        return getNames(this.data);
    };
    this.getIDs = function() {
        return getIDs(this.data);
    };
    this.getInfo = function(kom) {
        return getInfo(kom, this.data);
    };
    this.load = function() {
        return load(url, this, this.onload);
    };
}

// funksjoner
function load(url, obj, onload) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status === 200) {
            obj.data = JSON.parse(xhr.responseText);
            onload();
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

function getNamesKom(kommunenummer,data){
	for(i in data.elementer){
		if(kommunenummer == data.elementer[i].kommunenummer)
			return i;
	}

}

function getIDs(data) {
    var list = [];
    for (i in data.elementer) {
        list.push(data.elementer[i].kommunenummer);
    }
    return list;
}

<<<<<<< HEAD
function getInfo(kommunenummer, data) {
    var list = [];
    var list2 = [];
    for (i in data.elementer) {
        if (kommunenummer == data.elementer[i].kommunenummer) {
            return (obj = {
                Menn: data.elementer[i].Menn,
                Kvinner: data.elementer[i].Kvinner
            });
=======
function getInfo(kommunenummer,data){
    for(i in data.elementer){
    	if (kommunenummer == data.elementer[i].kommunenummer) {
        	    return (obj = {
				Menn: data.elementer[i].Menn,
				Kvinner: data.elementer[i].Kvinner,
			});
>>>>>>> 27619e77fda9c4f5692fe06e59879bc077e4b598
        }
    }
}

<<<<<<< HEAD
function getInfosyssel(kommunenummer, data) {
    var list = [];
    var list2 = [];
    for (i in data.elementer) {
        if (kommunenummer == data.elementer[i].kommunenummer) {
            return (obj = {
                Menn: data.elementer[i].Menn,
                Kvinner: data.elementer[i].Kvinner,
                Begge: data.elementer[i]["Begge kjønn"]
            });
=======
function getInfosyssel(kommunenummer,data){
    for(i in data.elementer){
    	if (kommunenummer == data.elementer[i].kommunenummer) {
        	    return (obj = {
				Menn: data.elementer[i].Menn,
				Kvinner: data.elementer[i].Kvinner,
				Begge: data.elementer[i]["Begge kjønn"]
			});
>>>>>>> 27619e77fda9c4f5692fe06e59879bc077e4b598
        }
    }
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
