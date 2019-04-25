var test = new utdanning("http://wildboy.uib.no/~tpe056/folk/85432.json");

function utdanning(url){
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
    var list3 = [];
    var list4 = [];
    var list5 = [];
    var list6 = [];
    var list7 = [];
    var list8 = [];
    var list9 = [];
    var list10 = [];
    var list11 = [];
    var list12 = [];

    for(i in data.elementer){
        if(kommunenummer == data.elementer[i].kommunenummer){
            list.push(data.elementer[i]["01"].Menn);
            list2.push(data.elementer[i]["01"].Kvinner);
            list3.push(data.elementer[i]["02a"].Menn);
            list4.push(data.elementer[i]["02a"].Kvinner);
            list5.push(data.elementer[i]["11"].Menn);
            list6.push(data.elementer[i]["11"].Kvinner);
            list7.push(data.elementer[i]["03a"].Menn);
            list8.push(data.elementer[i]["03a"].Kvinner);
            list9.push(data.elementer[i]["04a"].Menn);
            list10.push(data.elementer[i]["04a"].Kvinner);
            list11.push(data.elementer[i]["09a"].Menn);
            list12.push(data.elementer[i]["09a"].Kvinner);
        }
    }
    return [(list,list2),(list3,list4),(list5,list6),(list7,list8),(list9,list10),(list11,list12)];

}







