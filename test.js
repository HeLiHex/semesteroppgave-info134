var test = new befolkning("http://wildboy.uib.no/~tpe056/folk/104857.json");

function befolkning(url){
    this.url = url;
    this.load = load(url, this);
    this.getNames = function () { return getNames(this.data); };
    this.getIDs = function () { return getIDs(this.data); };
    this.getInfo = function () { return getInfo("0101",this.data); };
}

    function load(url, obj){
    var xhr = new XMLHttpRequest();
    xhr.open("GET",url);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status===200){
            obj.data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
    }



function getNames(data) {
    var list = [];
    for (i in data.elementer){
        list.push(i);
    }
    return list;
};

function getIDs(data) {
    var list = [];
    for(i in data.elementer){
        list.push(data.elementer[i].kommunenummer)
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







