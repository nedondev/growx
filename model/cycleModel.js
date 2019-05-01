'user strict';
var sql = require('../db.js');

var Cycle = function(cycle){
    this.from_time = cycle.from_time;
    this.to_time = cycle.to_time;
    this.type = cycle.type;
    this.value = cycle.value;
    this.farm_id = cycle.farm_id;
};

Cycle.createCycle = function(newCycle, result){
    sql.query("INSERT INTO cycle_config set ?", newCycle, function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            console.log(res);
            result(null, res);
        }
    });
};

Cycle.preCreateCycle = function(newCycle, result){
    var preCycle = [];
    sql.query("SELECT * FROM cycle_config WHERE from_time >= ? and from_time < ? and to_time > ? and type = ?", [newCycle.from_time, newCycle.to_time, newCycle.to_time, newCycle.type], function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            //console.log(res);
            preCycle.push(res);
            sql.query("SELECT * FROM cycle_config WHERE from_time >= ? and to_time <= ? and type = ?", [newCycle.from_time, newCycle.to_time, newCycle.type], function(err, res){
                if(err){
                    console.log("error ", err);
                    result(err, null);
                }
                else{
                    //console.log(res);
                    preCycle.push(res);
                    sql.query("SELECT * FROM cycle_config WHERE to_time >= ? and to_time < ? and from_time < ? and type = ?", [newCycle.from_time, newCycle.to_time, newCycle.from_time, newCycle.type], function(err, res){
                        if(err){
                            console.log("error ", err);
                            result(err, null);
                        }
                        else{
                            //console.log(res);
                            preCycle.push(res)
                            result(null, preCycle);
                        }
                    });
                }
            });
        }
    });
}

Cycle.getCycleByFarmId = function(cycle, result){
    if(cycle.type){
        sql.query("SELECT * FROM cycle_config WHERE farm_id = ? and type = ?", [cycle.farm_id, cycle.type], function(err, res){
            if(err){
                console.log("error ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });
    }
    else{
        sql.query("SELECT * FROM cycle_config WHERE farm_id = ?", cycle.farm_id, function(err, res){
            if(err){
                console.log("error ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });
    }
};


Cycle.getCycleByCycleId = function(cycle_id, result){
    sql.query("SELECT * FROM cycle_config WHERE from_time = ? and type =? and farm_id = ?", 
        [cycle_id.from_time, cycle_id.type, cycle_id.farm_id],
        function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    
    });
};

Cycle.getAllCycle = function(result){
    sql.query("SELECT * FROM cycle_config", function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            console.log('Cycle: ',res);
            result(null, res);
        }
    });
};

Cycle.changeValue = function(cycle, result){
        sql.query("UPDATE cycle_config SET value = ? WHERE from_time = ? and type =? and farm_id = ?", 
            [cycle.value, cycle.from_time, cycle.type, cycle.farm_id],
             function(err, res){
            if(err){
                console.log("error ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });
};

Cycle.update = function(time, cycle, result){
    if(!time.from_time){
        //update base to_time to from_time
        sql.query("UPDATE cycle_config SET from_time = ? WHERE from_time = ? and type =? and farm_id = ?", 
            [time.to_time, cycle.from_time, cycle.type, cycle.farm_id],
             function(err, res){
            if(err){
                console.log("error ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });
    }
    else {//if(!time.to_time){
        //update base from_time to to_time
        sql.query("UPDATE cycle_config SET to_time = ? WHERE from_time = ? and type =? and farm_id = ?", 
            [time.from_time, cycle.from_time, cycle.type, cycle.farm_id],
             function(err, res){
            if(err){
                console.log("error ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });
    }
};

Cycle.remove = function(cycle, result){
    sql.query("DELETE FROM cycle_config WHERE from_time = ? and type =? and farm_id = ?", 
        [cycle.from_time, cycle.type, cycle.farm_id],
         function(err, res){
        if(err){
            console.log("error ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = Cycle;
