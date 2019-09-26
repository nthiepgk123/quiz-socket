function Cauhoi(text,luachon,dapan){
    this.text = text;
    this.luachon = luachon;
    this.dapan = dapan;
}

Cauhoi.prototype.Dapandung = function(luachon){
    return luachon === this.dapan;
}
