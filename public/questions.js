function God(dscauhoi){
    this.Diem = 0;
    this.dscauhoi = dscauhoi;
    this.cauhoiso = 0;
    this.checksai = false;
}

God.prototype.Laycauhoiso = function(){
    return this.dscauhoi[this.cauhoiso];
}

God.prototype.Ketthuc = function(){
    return this.dscauhoi.length === this.cauhoiso || this.checksai == true;
}

God.prototype.DuDoan = function(Dapan){
    
    if(this.Laycauhoiso().Dapandung(Dapan)){
        this.Diem += 5;
    }
    else{
        this.Diem = this.Diem;
    }
    this.cauhoiso  += 1;
}