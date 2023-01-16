
var pos=0.02;
// function alias getgetElementById use one the two method
//function g(id) { return document.getElementById(id); };
var g = document.getElementById.bind(document);//bind method see :https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

setInterval(function(){datetimer();},1000);

function datetimer() {
    // time display
    var d = new Date();
    var dHours = d.getHours ( );
    var dMinutes = d.getMinutes ( );
    var dSeconds = d.getSeconds ( );
    var dday=d.getDate();
    var dmonth=d.getMonth();

    // Pad the minutes and seconds with leading zeros, if required
    dMinutes = ( dMinutes < 10 ? "0" : "" ) + dMinutes;
    dSeconds = ( dSeconds < 10 ? "0" : "" ) + dSeconds;
    dday = ( dday < 10 ? "0" : "" ) + dday;
    dmonth = ( dmonth < 10 ? "0" : "" ) + (dmonth +1);
    var time=dHours+":"+dMinutes+":"+dSeconds;

    //document.getElementById("datetime").innerHTML = (dday+"/"+dmonth+"/"+d.getFullYear())+"<br>"+time+"<br>pick up the mushrooms";
    g("datetime").innerHTML = (dday+"/"+dmonth+"/"+d.getFullYear())+"<br>"+time;
}

///////////////// function to Play sound ////////////////////////
var soundfx=true;
var soundbg=true;
var vollevel=0.05;
var soundshoot = new Audio('./asset/sound/LaserShoot14.ogg');
    soundshoot.volume=0.2;
var soundenemyexplode = new Audio('./asset/sound/bangSmall.ogg');
    soundenemyexplode.volume=0.3;
var soundrubypick = new Audio('./asset/sound/PickupRuby2.ogg');
    soundrubypick.volume=0.1;
var soundstart = new Audio('./asset/sound/Movement-NEO_Soundstart.ogg');
    soundstart.volume=0.2;
var soundrestart = new Audio('./asset/sound/LiftMe.ogg');
    soundrestart.volume=0.3;
//var soundbglevel01 = new Audio('./asset/sound/Goa.ogg');
var soundbglevel01 = g("bgs");
    soundbglevel01.volume=vollevel;

function turnonoffsoundfx() {
    if (soundfx){
        soundenemyexplode.muted = true;
        soundshoot.muted = true;
        soundrubypick.muted = true;
        soundfx=false;
        g("soundfx").innerHTML ="sound FX OFF";
    }
    else {
        soundenemyexplode.muted = false;
        soundshoot.muted = false;
        soundrubypick.muted = false;
        soundfx=true;
        g("soundfx").innerHTML ="sound FX ON";  
    }
}

function turnonoffsoundbg() {
    if (soundbg){
        soundbglevel01.muted = true;
        soundbg=false;
        g("soundbg").innerHTML ="sound BG OFF";
    }
    else {
        soundbglevel01.muted = false;
        soundbg=true;
        g("soundbg").innerHTML ="sound BG ON";  
    }
}

g("soundfx").onclick= function() {
    turnonoffsoundfx();    
};
g("soundbg").onclick= function() {
    turnonoffsoundbg();    
};
/////////////////////////////////////////////////////////////////////
var sepiaKernelMatrix = BABYLON.Matrix.FromValues(
                    0.393, 0.349, 0.272, 0,
                    0.769, 0.686, 0.534, 0,
                    0.189, 0.168, 0.131, 0,
                    0, 0, 0, 0
);
                
var canvas = document.getElementById("renderCanvas"); 
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine); 
    scene.clearColor = new BABYLON.Color3(0.46, 0.81, 0.95);//Default Background Color into scene

var camselect = 0;

var camera = new BABYLON.ArcRotateCamera("maCamera", 1, 1.7, 5, new BABYLON.Vector3(0, 0, 0), scene);//target view

/*
var freeCamera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 300, 10), scene);//FPS view
    freeCamera.rotation = new BABYLON.Vector3(1.57,0,0);
    freeCamera.fov = 0.1;
*/
// Real ORTHOGRAPHIC CAMERA;
var freeCamera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 0, 10), scene);
    freeCamera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    freeCamera.rotation = new BABYLON.Vector3(1.2,0,0);
    //freeCamera.rotation = new BABYLON.Vector3(0.6,0.8,0);//this one for iso view
    freeCamera.orthoTop = 14;
    freeCamera.orthoBottom = -14;
    freeCamera.orthoLeft = -11;
    freeCamera.orthoRight = 11;
    
var camfixe = new BABYLON.ArcRotateCamera("maCamera",  -(Math.PI/2), 0, 15, new BABYLON.Vector3(0, 8, 5), scene);//target view
    camfixe.fov = 1.5;
    
var sepiaPostProcess = new BABYLON.FilterPostProcess("Sepia", sepiaKernelMatrix, 1.0, camfixe);

var filterplan = BABYLON.Mesh.CreatePlane("FilterPlan", 1.0, scene);
filterplan.material = new BABYLON.StandardMaterial("matplanfilter1",scene);
//filterplan.material.diffuseTexture = new BABYLON.Texture("rt/filter1D.png", scene);
filterplan.material.opacityTexture = new BABYLON.Texture("asset/filter1v2min.png", scene);
filterplan.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
filterplan.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
filterplan.material.specularColor = new BABYLON.Color3(0, 0, 0);
filterplan.scaling.x = 1.27;//largeur
filterplan.scaling.y = 1.7;//hauteur
filterplan.position.z=2;
filterplan.material.alpha = 0.5;
//filterplan.isVisible=false;
//filterplan.material.backFaceCulling = true;
filterplan.parent = camera;

g("cam1").onclick= function () {
    camselect=0;
    filterplan.isVisible=true;
    //scene.activeCamera.detachControl(canvas);
};
g("cam2").onclick= function () {
    camselect=1;
    filterplan.isVisible=false;
};
g("cam3").onclick= function () {
    camselect=2;
    filterplan.isVisible=false;
};

scene.activeCamera.attachControl(canvas);
/////////////  light creation  ///////////////
//var light = new BABYLON.PointLight("pointLumineux1", new BABYLON.Vector3(-10, 10, -5), scene);
var light = new BABYLON.DirectionalLight("pointLumineux1", new BABYLON.Vector3(20, -30, 10), scene);//x;y;z
light.diffuse = new BABYLON.Color3(1,1,1);
light.specular = new BABYLON.Color3(0.5, 0.5, 0.5);
light.intensity = 1;
//////////////////////////////////////////////
var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
light0.diffuse = new BABYLON.Color3(1, 1, 1);
light0.specular = new BABYLON.Color3(0.8, 0.8, 0.8);
light0.groundColor = new BABYLON.Color3(0.4, 0.1, 0);
light0.intensity = 0.3;
/*var lightback = new BABYLON.DirectionalLight("pointLumineux2", new BABYLON.Vector3(0, -5, 5), scene);
lightback.diffuse = new BABYLON.Color3(0.3, 0, 0);
lightback.specular = new BABYLON.Color3(1, 0, 0);*/
//lightback.specular = new BABYLON.Color3(1, 0, 0);
/////// repere visuelle attache a la lumiere principale ////////////
var pligth = BABYLON.Mesh.CreateSphere("pLumineux1", 12, 0.3, scene);
pligth.material = new BABYLON.StandardMaterial("matligth",scene);
pligth.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
pligth.material.specularColor = new BABYLON.Color3(0, 0, 0);
pligth.material.emissiveColor = new BABYLON.Color3(0.96,0.91,0.11);
pligth.parent = light;
var pcylinder = BABYLON.Mesh.CreateCylinder("pcylinder", 2, 3, 3, 18, scene, false);
pcylinder.material = new BABYLON.StandardMaterial("matpligth",scene);
pcylinder.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
pcylinder.material.emissiveColor = new BABYLON.Color3(0.5,0.5,0.5);
pcylinder.material.alpha = 0.5;
pcylinder.material.wireframe = true;
pcylinder.parent = light;
pcylinder.rotation.x=1.57;
pcylinder.position.z=1;

var GameScore = function() {
    var s;
    this.endstage=false;
    this.score=0;
    this.timescreen=0;
    this.enemytotalcreate=0;
    this.patternAlreadycreate=false;
    this.patternA2lreadycreate=false;
    this.rubytotalcreate=0;
    this.rubytotalcapture=0;
    this.enemydown=0;
    this.displayscore=function(){
        var tmp = this.score.toString(); 
        if (tmp.length>3 && tmp.length<=6) {//1,000        
            var slice1=tmp.slice((tmp.length-3),tmp.length);
            var slice2=tmp.slice(0,(tmp.length-3));
               s = slice2+","+slice1;
        }
        else if (tmp.length>6 && tmp.length<=9) {//1,000,000
            var slice1=tmp.slice((tmp.length-3),tmp.length);
            var slice2=tmp.slice((tmp.length-6),(tmp.length-3));
            var slice3=tmp.slice(0,(tmp.length-6));
               s = slice3+","+slice2+","+slice1;      
        }
        else if (tmp.length>9 && tmp.length<=12) {//1,000,000,000
            var slice1=tmp.slice((tmp.length-3),tmp.length);
            var slice2=tmp.slice((tmp.length-6),(tmp.length-3));
            var slice3=tmp.slice((tmp.length-9),(tmp.length-6));
            var slice4=tmp.slice(0,(tmp.length-9));
               s = slice4+","+slice3+","+slice2+","+slice1;         
        }
        else if (tmp.length>12) {
            s="999,999,999,999";
        }
        else { 
           s=this.score;
        }
        g("score").innerHTML = s;
    };
};
var gamescoring = new GameScore();

var player=[];
var shipbody,shipshellfront,shipshellback,shipabdomen;
BABYLON.SceneLoader.ImportMesh("", "asset/ship2/", "shipR3.babylon", scene, function (newMeshes, particleSystems) {

    shipbody = scene.getMeshByName("ShipBodyLowBeauty");
    shipshellfront = scene.getMeshByName("ShipFrontLowBeauty");
    shipshellback = scene.getMeshByName("ShipBackLowBeauty");
    shipabdomen = scene.getMeshByName("ShipAbdoLowBeauty");
    
    shipbody.material = new BABYLON.StandardMaterial("matplayer",scene);
    shipbody.material.diffuseTexture = new BABYLON.Texture("asset/ship2/ShipDm.jpg",scene);
    shipbody.material.bumpTexture = new BABYLON.Texture("asset/ship2/shipN1.jpg", scene);
    //shipbody.material.diffuseColor = new BABYLON.Color3(0.15, 0.05, 0.27);
    shipbody.material.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    shipshellfront.material = new BABYLON.StandardMaterial("matplayershell1",scene);
    shipshellfront.material.diffuseTexture = new BABYLON.Texture("asset/ship2/ShipDm.jpg",scene);
    //shipshellfront.material.bumpTexture = new BABYLON.Texture("asset/ship2/shipN1.jpg", scene);
    //shipshellfront.material.diffuseColor = new BABYLON.Color3(0.95, 0.86, 0.86);
    shipshellback.material = new BABYLON.StandardMaterial("matplayershell2",scene);
    shipshellback.material.diffuseTexture = new BABYLON.Texture("asset/ship2/ShipDm.jpg",scene);
    shipshellback.material.bumpTexture = new BABYLON.Texture("asset/ship2/shipN1.jpg", scene);
    //shipshellback.material.diffuseColor = new BABYLON.Color3(0.95, 0.86, 0.86);
    shipabdomen.material = new BABYLON.StandardMaterial("matplayerabdo",scene);
    shipabdomen.material.diffuseTexture = shipbody.material.diffuseTexture;
    shipabdomen.material.bumpTexture = shipbody.material.bumpTexture;
    //shipabdomen.material.diffuseColor = new BABYLON.Color3(0.36, 0.48, 0.75);
    shipbody.scaling = new BABYLON.Vector3(0.14, 0.14, 0.14);
    shipbody.parent = objPlayer.hitboxPproxy;
    shipbody.position.z = -0.5;
    shipshellfront.parent = shipbody;
    shipshellback.parent = shipbody;
    shipabdomen.parent = shipbody;
    player.push(shipbody,shipshellfront,shipshellback,shipabdomen);
    /*for (var i=1;i<player.length;i++) {
        player[i].material.diffuseTexture = shipbody.material.diffuseTexture;
        player[i].material.bumpTexture = shipbody.material.diffuseTexture;
    }*/
    /*shipshellfront.position.z=0.5;
    shipshellfront.position.y=0.5;
    shipshellback.position.z=-0.5;
    shipshellback.position.y=0.5;*/
    //shipshellback.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);
    shadowGenerator.getShadowMap().renderList.push(shipbody,shipshellfront);
});

var hangar;
BABYLON.SceneLoader.ImportMesh("", "asset/hangar/", "hangar.babylon", scene, function (newMeshes, particleSystems) {
//BABYLON.SceneLoader.ImportMesh("", "asset/", "arcadeP.babylon", scene, function (newMeshes, particleSystems) { 
    hangar=newMeshes[0];
    //hangar = scene.getMeshByName("Hangar");   
    hangar.material = new BABYLON.StandardMaterial("mathangar",scene);
    hangar.material.diffuseTexture = new BABYLON.Texture("asset/hangar/hangarD.jpg",scene);
    //hangar.material.emissiveTexture = new BABYLON.Texture("asset/hangar/hangarD.jpg",scene);
    hangar.material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    hangar.material.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    hangar.scaling = new BABYLON.Vector3(0.14, 0.14, 0.14);
    //shipbody.parent = objPlayer.hitboxPproxy;
    hangar.position.y = -1.5;
});

var pc;
BABYLON.SceneLoader.ImportMesh("", "asset/vehicle/", "police.babylon", scene, function (newMeshes, particleSystems) {
//BABYLON.SceneLoader.ImportMesh("", "asset/", "arcadeP.babylon", scene, function (newMeshes, particleSystems) { 
    pc=newMeshes[0];
    //hangar = scene.getMeshByName("Hangar");
    pc.material = new BABYLON.StandardMaterial("mathangar",scene);
    pc.material.diffuseTexture = new BABYLON.Texture("asset/vehicle/pcD.png",scene);
    //pc.material.emissiveTexture = new BABYLON.Texture("asset/vehicle/pcD.png",scene);
    pc.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    pc.material.specularColor = new BABYLON.Color3(0, 0, 0);
    //pc.scaling = new BABYLON.Vector3(0.14, 0.14, 0.14);
    //shipbody.parent = objPlayer.hitboxPproxy;
    pc.position.z = 15;
    pc.receiveShadows = false;
});
/*
var shippart1 = scene.getMeshByName("ShipShellFront");
    shippart1.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
    shippart1.parent = objPlayer.hitboxP;
*/
function randomIntFromInterval(min,max) {
    var i;
    do {
        i=(Math.floor(Math.random()*(max-min+1)+min));
    }while (i===0);
    return i;
}

//Class Player 
//Use hitboxP for collision & use hitboxPproxy for any movement or attached Mesh
var Player = function() {
    this.life=20;
    this.bomb=3;
    this.cooldown=20;
    this.touch=true;
    this.emitbullet=true;
    this.invinciblestart=0;    
    this.hitboxP = BABYLON.Mesh.CreateBox("Boxhit", 1.5, scene);
    this.hitboxPproxy = BABYLON.Mesh.CreateBox("Boxhitproxy", 1, scene);
    this.hitboxP.parent = this.hitboxPproxy;
    //this.hitboxP.tag = "hitboxPlayer";
    this.hitboxP.material = new BABYLON.StandardMaterial("mathitbox",scene);
    this.hitboxP.material.diffuseColor = new BABYLON.Color3(1, 1, 0);    
    this.hitboxP.scaling.x = 0.5;
    this.hitboxP.scaling.y = 0.5;
    this.hitboxP.visibility = 0.4;
    this.hitboxP.isVisible = false;
    this.hitboxPproxy.isVisible = false;
};
// cooldown method for Player
Player.prototype.cooldownP = function(timer,cooldownvalue) {
    if (timer>=this.cooldown) {
        this.emitbullet=true;
        this.cooldown=timer+cooldownvalue;
        return true;
    }
    //else {return false;}
};
//1 - blink method for Player 
Player.prototype.invincible = function(time) {
    for (var i=0;i<D.meshtotal.length;i++) {
        D.meshtotal[i].visibility += 0.05;
    
        if (/*time-timerefresh >0.2*/D.meshtotal[i].visibility>0.6) {
            D.meshtotal[i].visibility = 0;
        }
        if (time-(this.invinciblestart) >1.4) {
            D.meshtotal[i].visibility = 1;
            this.touch = true;
        }
    }
};
//2 - blink method for Player 
Player.prototype.invincible2d = function(time) {
    for (var i=0;i<player.length;i++) {
      player[i].visibility += 0.05;   
        if (/*time-timerefresh >0.2*/player[i].visibility>0.6) {
            player[i].visibility = 0;
        }
        if (time-(this.invinciblestart) >1.4) {
            player[i].visibility = 1;
            this.touch = true;
        }
    }
};
//We create the object Player
var objPlayer = new Player();

var pbackligth = BABYLON.Mesh.CreateSphere("pLumineux2", 12, 0.4, scene);
    pbackligth.material = new BABYLON.StandardMaterial("matbackligth",scene);
    pbackligth.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    pbackligth.material.specularColor = new BABYLON.Color3(0, 0, 0);
    pbackligth.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
    pbackligth.isVisible = false;
    pbackligth.parent = objPlayer.hitboxPproxy;
//planplayer.parent = objPlayer.hitboxP;
//player[1].rotate(BABYLON.Axis.X, -Math.PI/8, BABYLON.Space.LOCAL);
//objPlayer.shipabdomen.rotate.x=-Math.PI/8;

var EnemydesignA = BABYLON.Mesh.CreateBox("Boxdesign", 2.2, scene);
    EnemydesignA.isVisible = false;
    
var EnemydesignB = BABYLON.Mesh.CreateTorus("torus", 3, 0.025, 16, scene, false);
    EnemydesignB.isVisible = false;
    
var EnemydesignC = BABYLON.Mesh.CreateBox("Boxdesign", 2.2, scene);
    EnemydesignC.rotation.x = Math.PI/4;
    EnemydesignC.rotation.z = Math.PI/4;
    EnemydesignC.isVisible = false;

//name,hauteur,diameter top,diameter bottom,number of side,number of division on top,
var EnemydesignD = BABYLON.Mesh.CreateCylinder("EnemydesignD", 3, 0, 3, 4, 1, scene, false);
    //EnemydesignD.material = new BABYLON.StandardMaterial("matdDbox",scene);
    //EnemydesignD.rotation.x = Math.PI/2;
    //EnemydesignD.position.y = -1.5;
    EnemydesignD.position.z = 1.5; 
    //EnemydesignD.material.wireframe = true;
    EnemydesignD.isVisible = false;

var LazerdesignA = BABYLON.Mesh.CreateBox("Boxdesign", 0.4, scene);
    LazerdesignA.isVisible = false;

//Class Enemy
//passthrough: boolean(true/false) to know if this enemy can touch and damage the player
var FullEnemyBox=[];    
var Enemy = function(passthrough,patternselect,design) {
    this.life=10;
    this.touchdamage=4;
    this.totalpoints=20;
    this.timetouchstart=0;
    this.timemove=0;
    this.nbrloopmove=0;
    this.passthrough=passthrough;
    this.endmove=false;
    //this.emitbullet=true;
    this.cooldown=20;
    this.speed=0.2;
    this.shootprecision=12;
    this.shootangle=18;
    this.touchstart=false;
    this.touch=true;
    this.props=false;
    this.rotationspeed=(randomIntFromInterval(-3,3))/100;
    this.hitboxE = BABYLON.Mesh.CreateBox("Boxhit", 2.0, scene);
    this.hitboxE.tag = "enemybox";
    this.hitboxE.material = new BABYLON.StandardMaterial("mathitbox",scene);
    this.hitboxE.material.diffuseColor = new BABYLON.Color3(0, 1, 1);
    this.hitboxE.isVisible = true;
    this.hitboxE.visibility = 0.4;
    this.hitboxE.position.z = 15;
    if (this.passthrough===true) {
        this.BoxTouchC0 = this.hitboxE.clone("meshtouchbis0");
        //this.BoxTouchC0 = BABYLON.Mesh.CreateBox("Boxtouch", 1.6, scene);
        this.BoxTouchC0.material = new BABYLON.StandardMaterial("mathitbox",scene);
        this.BoxTouchC0.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
        this.BoxTouchC0.position = new BABYLON.Vector3(0, 0, 0); 
        this.BoxTouchC0.scaling.z =0.8;
        this.BoxTouchC0.scaling.x =0.8;
        this.BoxTouchC0.isVisible = false;
        this.BoxTouchC0.parent = this.hitboxE;
        //return FullBoxTouch.push(this);
    }
    this.designE = design.clone("EnemydesignA1");/*
    //this.designE = BABYLON.Mesh.CreateBox("Boxdesign", 2.2, scene);
    this.designE.material = new BABYLON.StandardMaterial("matdesignbox",scene);
    this.designE.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    this.designE.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    this.designE.material.wireframe = true;*/
    this.designE.material = new BABYLON.StandardMaterial("matdesignbox",scene);
    this.designE.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    this.designE.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    this.designE.material.wireframe = true;
    //this.designE.rotation.x = Math.PI/2;
    this.designE.isVisible = true;
    if(design===EnemydesignD) {
       var designEE = this.designE.clone("EnemydesignDD");
        //designEE.material = this.designE.material;
        //designEE.material.diffuseColor = this.designE.material.diffuseColor;
        //designEE.material.emissiveColor = this.designE.material.emissiveColor;
        designEE.position.y = -3;
        designEE.position.x = 0;
        designEE.position.z = 0;
        designEE.rotation.x = Math.PI;
        //EnemydesignDD.material.wireframe = true;
        designEE.parent = this.designE;
    }
    //this.design.rotation.x += 0.4;
    this.designE.rotation.x = Math.PI/2;
    this.designE.parent = this.hitboxE;
    this.patternselect = patternselect;
    gamescoring.enemytotalcreate+=1;
    return FullEnemyBox.push(this);
};
// cooldown method for Enemy
Enemy.prototype.cooldownE = function(timer,cooldownvalue) {
    if (timer===this.cooldown) {
        //this.emitbullet=true;
        this.cooldown+=cooldownvalue;
        return true;
    }   
};
// touch method for Enemy
Enemy.prototype.colortouch = function() {
     this.timetouchstart+=1;
        if (this.timetouchstart >25) {
            this.touchstart=false;
            this.timetouchstart=0;
            this.designE.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
            this.designE.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        }
};

Enemy.prototype.limitshootEEE = function() {
    //var totalE = FullEnemyBullet.length;
    //    while (totalE--) {
    if (this.passthrough===true) {
        if ((this.BoxTouchC0.intersectsMesh(objPlayer.hitboxP, false)) && objPlayer.touch===true) {
            //objPlayer.invincible(scene,time);
            objPlayer.life-=this.touchdamage;
            objPlayer.invinciblestart = time+(1/BABYLON.Tools.GetFps());
            objPlayer.touch=false;
            if (objPlayer.life<0){
                objPlayer.life=0;
            }
            g("life").innerHTML = objPlayer.life;
            //return true;
        }
    }
    if (this.life===0) {
        this.hitboxE.dispose();
        return true;
    }
};

Enemy.prototype.movepattern = function() {
    if (this!==undefined){
        if (this.patternselect!=="none") {
        switch (this.patternselect) {
            case "0":
              this.movepattern0();
              break;
            case "A":
              this.movepatternA();
              break;
            case "A2":
              this.movepatternA2();
              break;
            case "B":
              this.movepatternB();
              break;
            case "C":
              this.movepatternC();
              break;
            case "D":
              this.movepatternD();
              break;
            case "E":
              this.movepatternE();
              break;
            case "E2":
              this.movepatternE2();
              break;
            case "F":
              this.movepatternF(patterncoordinate.patternF1(),patterncoordinate.patternF2());
              break;
            case "Fbis":
              this.movepatternFbis();
              break; 
            case "G":
              this.movepatternG();
              break;
            default:
              return;
        }
    }
    }
};


// movement method for Enemy
Enemy.prototype.movepattern0 = function() {
    var tabPbis = [[6,14,0],[0,0,0],[0,0,0],[-6,14,0]];
    if (this.timemove<60) {
        var m1 = linearmoveb ((this.timemove),this.hitboxE, 1, 0, tabPbis);
    }
    if (this.timemove>=60) {
        var m2 = linearmoveb ((this.timemove-60),this.hitboxE, 2, 0, arraymirror(tabPbis));
    }
    if (this.timemove>180) {
        this.timemove=0;     
    }
    this.timemove++;
};

Enemy.prototype.movepatternA = function() {
    //this.variance=24;
    var tabPbis = [[-5,17,0],[0,0,0],[0,0,0],[5,17,0]];
    var tabPbiss = [[-5,17,0],[-5,10,0],[-2,7,0],[5,7,0]];
    var tabPbisss = [[-7,6,0],[-10,19,0],[5,2,0],[5,16,0]];
    this.designE.rotate(BABYLON.Axis.Y, 0.05, BABYLON.Space.LOCAL);
     //this.speed=0.2;
//if (this.nbrloopmove <3) {}
        if (this.timemove<60) {
            var m1 = linearmoveb ((this.timemove),this.hitboxE, 1, 0, tabPbis);
        }
        if (this.timemove>=60) {
            var m2 = linearmoveb ((this.timemove-60),this.hitboxE, 1, 0, arraymirror(tabPbis));
        }
        if (this.timemove>=120) {
            var m3 = beziercurvemoveb ((this.timemove-120),this.hitboxE, 1, 0, tabPbiss);
        }
        if (this.timemove>=240 && this.hitboxE.position.z<24 && this.timemove<460) {//another way to move a mesh
            this.hitboxE.position.z += this.speed;
            if (this.hitboxE.position.z<14 && this.speed>0.04){
                this.speed-=0.01;
            }
            if (this.hitboxE.position.z>=14 && this.speed<0.3){
                this.speed+=0.01;
            }
        }
        if (this.timemove>=460 && this.hitboxE.position.x>-7 && this.timemove<560) {
            this.hitboxE.position.x += Math.cos(Math.PI*(15/12))*(this.speed);// Cercle Trigo Math.PI inverse
            this.hitboxE.position.z += Math.sin(Math.PI*(15/12))*(this.speed);
        }
        if (this.timemove>=560 /*&& this.hitboxE.position.x>-7*/) {
            var m4 = beziercurvemoveb ((this.timemove-560),this.hitboxE, 4, 0, tabPbisss);
        }
        if (objPlayer.life>0 /*&& this.timemove<560*/) {
            if(this.timemove<560){
                if (this.cooldownE(this.timemove,30)) {
                    var BulletE2=new EnemyBullet0(this.hitboxE,18,12,true,meshbulletshootType01);      
                    BulletE2.speed=0.2;
                    FullEnemyBullet.push(BulletE2);
                }
            }
            if(this.timemove>=560 && this.timemove<920){  
                if (this.cooldownE(this.timemove,14)) {
                    var BulletE2=new EnemyBullet0(this.hitboxE,18,12,false,meshbulletshootType01);
                    BulletE2.speed=0.05;
                    BulletE2.precision=24;
                    BulletE2.angleh+=this.shootangle;
                    FullEnemyBullet.push(BulletE2);
                    this.shootangle-=1;
                }
            }
            if(this.timemove>=920){  
                if (this.cooldownE(this.timemove,5)) {
                    var BulletE2=new EnemyBullet0(this.hitboxE,18,12,false,meshbulletshootType01);
                    BulletE2.speed=0.04;
                    BulletE2.precision+=this.shootprecision;
                    BulletE2.angleh+=this.shootangle;
                    FullEnemyBullet.push(BulletE2);
                    if (this.shootprecision<49){
                    this.shootprecision+=1;}               
                    this.shootangle+=3;
                }
            }
                
        }
    this.timemove++;
    /*if (this.timemove>1200) {
        this.timemove=0;
        this.cooldown=30;
    }*/
};

Enemy.prototype.movepatternA2 = function() {
    this.movepatternA();
};
function beziercurvemoveb (time, mesh, timeduration, easestyle, coordinated){
    if (time < 60*timeduration) {
        var speed = (time)/60/timeduration;//60 if 60fps game or use BABYLON.Tools.GetFps()
        var speedcurve = speed;
        if (easestyle!== 0){
            speedcurve = easestyle(speed);
        }
        mesh.position.x = Math.pow((1-speedcurve),3)*coordinated[0][0]+ 3*Math.pow((1-speedcurve),2)*(speedcurve*coordinated[1][0]) + 3*(1-speedcurve)*Math.pow(speedcurve,2)*coordinated[2][0] + Math.pow(speedcurve,3)*coordinated[3][0];
        mesh.position.z = Math.pow((1-speedcurve),3)*coordinated[0][1]+ 3*Math.pow((1-speedcurve),2)*(speedcurve*coordinated[1][1]) + 3*(1-speedcurve)*Math.pow(speedcurve,2)*coordinated[2][1] + Math.pow(speedcurve,3)*coordinated[3][1];
        mesh.position.y = Math.pow((1-speedcurve),3)*coordinated[0][2]+ 3*Math.pow((1-speedcurve),2)*(speedcurve*coordinated[1][2]) + 3*(1-speedcurve)*Math.pow(speedcurve,2)*coordinated[2][2] + Math.pow(speedcurve,3)*coordinated[3][2];
    }
}
function linearmoveb (time, mesh, timeduration, easestyle, coordinated){
    if (time < 60*timeduration) {
        var speed = (time)/60/timeduration;//60 if 60fps game or use BABYLON.Tools.GetFps()
        var speedcurve = speed;
        if (easestyle!== 0){
            speedcurve = easestyle(speed);
        }
        //mesh.position.x = Math.pow((1-speedcurve),3)*coordinated[0][0]+ 3*Math.pow((1-speedcurve),2)*(speedcurve*coordinated[1][0]) + 3*(1-speedcurve)*Math.pow(speedcurve,2)*coordinated[2][0] + Math.pow(speedcurve,3)*coordinated[3][0];
        //mesh.position.z = Math.pow((1-speedcurve),3)*coordinated[0][1]+ 3*Math.pow((1-speedcurve),2)*(speedcurve*coordinated[1][1]) + 3*(1-speedcurve)*Math.pow(speedcurve,2)*coordinated[2][1] + Math.pow(speedcurve,3)*coordinated[3][1];
        //mesh.position.y = Math.pow((1-speedcurve),3)*coordinated[0][2]+ 3*Math.pow((1-speedcurve),2)*(speedcurve*coordinated[1][2]) + 3*(1-speedcurve)*Math.pow(speedcurve,2)*coordinated[2][2] + Math.pow(speedcurve,3)*coordinated[3][2];
        mesh.position.x = (1-speedcurve)*coordinated[0][0]+speedcurve*coordinated[3][0];
        mesh.position.z = (1-speedcurve)*coordinated[0][1]+speedcurve*coordinated[3][1];
    }
}
//dday = ( dday < 10 ? "0" : "" ) + dday;
//nbr.reverse(); to reverse array nbr ex: nbr=[0,1,2,3]=>nbr=[3,2,1,0]
function arraymirror(arb) {//mirror x
    for (var i=0;i<arb.length;i++) {
        for (var j=0;j<3;j++) {
            if ((arb[i][j])!==0 && arb[i][j]===arb[i][0]){//second condition only for x coordinate / add arb[i][j]===arb[i][1] for z coordinate etc...
                 arb[i][j]=(arb[i][j])*(-1);
            }
        }
    }
    return arb;
}

var patterncoordinate = {
        patternF1: function() {return [[15,10,0],[0,0,0],[0,0,0],[8,11,0]];},
        patternF2: function() {return [[8,11,0],[0,0,0],[0,0,0],[8,28,0]];}
};

Enemy.prototype.movepatternB = function() {
    this.designE.rotation.x += this.rotationspeed;
    this.designE.rotation.y += this.rotationspeed;
    var tabPbis = [[0,28,0],[0,0,0],[0,0,0],[0,19,0]];
    
    if (this.life>0) { 
        var m1 = linearmoveb ((this.timemove),this.hitboxE, 2, easingfns.easeOutBack, tabPbis);
        if (objPlayer.life>0) {
            if (this.timemove>=120) {

                    //if (this.cooldownE((this.timemove-60*2),30)) {
                    if (this.cooldownE((this.timemove-120),120)) {
                        for (var i=0;i<12;i++){
                            var BulletE2=new EnemyBullet0(this.hitboxE,randomIntFromInterval(34,38),24,false,0/*meshbulletshootType02*/);
                            BulletE2.speed=randomIntFromInterval(12,15)/100;
                            FullEnemyBullet.push(BulletE2);
                        }
                    }

            }
            this.timemove++;
        }
    }
    else {
        this.life=0;
    }
};
//var beziercurvemoveobj = new beziercurvemove;
Enemy.prototype.movepatternC = function() {
    this.designE.rotation.x += this.rotationspeed;
    this.designE.rotation.y += this.rotationspeed;
    var tabPbis = [[3,16,0],[11,14,0],[-5,4,0],[-1,-3,0]];
    var tabPbiss = [[-1,-3,0],[-5,4,0],[11,26,0],[3,16,0]];

    if (this.timemove>60*3 && this.timemove<60*6) {
        var m1 = beziercurvemoveb ((this.timemove-60*3),this.hitboxE, 3, easingfns.easeInOutBounce, tabPbis);
    }
    if (this.timemove>=60*6) {
        var m2 = beziercurvemoveb ((this.timemove-60*6),this.hitboxE, 3, 0, tabPbiss);
    }
    if (this.timemove>=60*9) {//this condition is for loop remove it for no-loop
        this.timemove=0;
    }
    this.timemove++;
};
Enemy.prototype.movepatternD = function() {
    this.designE.rotation.x += this.rotationspeed;
    this.designE.rotation.y += this.rotationspeed;
    var tabPbis = [[-3,15,0],[0,18,0],[-9,12,0],[-8,8,0]];
    var tabPbiss = [[-8,8,0],[-7,4,0],[-6,12,0],[-3,15,0]];

    if (this.timemove<60*2) {
        var m1 = beziercurvemoveb ((this.timemove),this.hitboxE, 2, easingfns.easeInQuint, tabPbis);
    }
    if (this.timemove>=60*2) {
        var m2 = beziercurvemoveb ((this.timemove-60*2),this.hitboxE, 3, easingfns.easeOutQuint, tabPbiss);
    }
    if (this.timemove>60*5) {//this condition is for loop remove it for no-loop
        this.timemove=0;
    }
    this.timemove++;
};

Enemy.prototype.movepatternE = function() {
    this.designE.rotate(BABYLON.Axis.Y, 0.05, BABYLON.Space.LOCAL);
    var tabPbis = [[-12,22,0],[0,0,0],[0,0,0],[3,22,0]];
    var tabPbiss = [[3,22,0],[0,0,0],[0,0,0],[-8,22,0]];
    var tabPbisss = [[-8,22,0],[0,0,0],[0,0,0],[3,22,0]];
    var tabPbissss = [[3,22,0],[0,0,0],[0,0,0],[-12,22,0]];
    var BulletE2;
     //this.speed=0.2;
    if (this.life>0) {
        if (this.nbrloopmove <3) {
            if (this.timemove<180) {//180=60*3
                var m1 = linearmoveb ((this.timemove),this.hitboxE, 3, easingfns.easeOutSine, tabPbis);
            }
            if (this.timemove>=180 && this.timemove<420) {//180=60*3
                var m2 = linearmoveb ((this.timemove-179),this.hitboxE, 4, easingfns.easeInOutSine/*easeOutBounce*/, tabPbiss);
            }
            if (this.timemove>=200 && this.timemove<410) {
                if (objPlayer.life>0) {
                    if (this.cooldownE((this.timemove-200),1)) {
                        BulletE2=new EnemyBullet0(this.hitboxE,18,12,false,meshbulletshootE);
                        BulletE2.speed=1;
                        BulletE2.shootEnemytype0.scaling.z=2;
                        FullEnemyBullet.push(BulletE2);
                    }
                }
            }
            if (this.timemove>=480) {
                var m3 = linearmoveb ((this.timemove-480),this.hitboxE, 1, easingfns.easeOutBack, tabPbisss);
            }
            this.timemove++;
            if (this.timemove>560 /*|| objPlayer.life<=0*/) {//this condition is for loop, remove it for no-loop
                   this.timemove=180;
                   this.cooldown=8;
                   this.nbrloopmove +=1;
            }
            
        }
        else if (this.nbrloopmove ===3) {
            if (this.timemove>=180) {
                var m4 = linearmoveb ((this.timemove-180),this.hitboxE, 1, easingfns.easeInBack, tabPbissss);
            }
            if (this.timemove>240 /*|| objPlayer.life<=0*/) {//this condition is for loop, remove it for no-loop
                   this.nbrloopmove +=1;
            }
            this.timemove++;
        }
        else {this.life=0;}
    }
    
    
};
Enemy.prototype.movepatternE2 = function() {
    
    this.designE.rotate(BABYLON.Axis.Y, 0.05, BABYLON.Space.LOCAL);
    var tabPbis = [[4,28,0],[0,0,0],[0,0,0],[3,19,0]];
    var tabPbiss = [[3,19,0],[0,0,0],[0,0,0],[14,10,0]];
    var BulletE2;
    //this.LaserE1;
    this.Laser;
     //this.speed=0.2;
    if (this.life>0) {
        //if (this.nbrloopmove <3) {
            if (this.timemove<120) {//180=60*3
                var m1 = linearmoveb ((this.timemove),this.hitboxE, 2, easingfns.easeOutSine, tabPbis);
            }
            if (this.timemove>=200) {
                if (objPlayer.life>0) {
                    if (this.timemove===200){
                        //Laser creation
                        this.Laser = new Enemy(true,"none",EnemydesignA);
                        this.Laser.touchdamage=1;
                        //this.Laser.hitboxE.position.x = this.hitboxE.position.x;
                        //this.Laser.hitboxE.position.z = this.hitboxE.position.z-10;
                        this.Laser.hitboxE.scaling.z = 0.1;
                        this.Laser.hitboxE.scaling.x = 0.1;
                        //this.Laser.hitboxE.position.z = this.hitboxE.position.z-2;
                        this.Laser.hitboxE.material.diffuseColor = new BABYLON.Color3(0.98, 0.98, 0.95);
                        this.Laser.BoxTouchC0.material.diffuseColor = new BABYLON.Color3(0.44, 0.85, 0.95);
                        //Laser.BoxTouchC0.position.z = -11;
                        //this.Laser.BoxTouchC0.scaling.z = 2;
                        //this.Laser.BoxTouchC0.scaling.x = 2;
                        this.Laser.BoxTouchC0.scaling = new BABYLON.Vector3(10, 0.1, 10);
                        this.Laser.BoxTouchC0.isVisible =true;
                        this.Laser.designE.isVisible = false;
                        this.Laser.props=true;
                        //this.LaserE1=null;
                        
                    }
                    /*if (this.timemove===300){
                      this.LaserE1.dispose();  
                    }*/
                    if (this.Laser.BoxTouchC0.scaling.z < 150) {
                        this.Laser.BoxTouchC0.scaling.z += 2;
                        this.Laser.BoxTouchC0.position.z -= 2/*this.hitboxE.position.z-10*/;
                        /*if (this.timemove>=250){
                            this.LaserE1.opacity -=0.05;
                        }*/
                    }
                    if (this.timemove> 260 && this.timemove< 540) {
                        if (this.Laser.BoxTouchC0.scaling.x < 18) {
                            this.Laser.BoxTouchC0.scaling.x += 1;
                        }
                        else {
                            this.Laser.BoxTouchC0.scaling.x = 10;
                        }
                    }
                    if (this.timemove> 540 && this.Laser.BoxTouchC0.scaling.x>0.1) {
                        this.Laser.BoxTouchC0.scaling.x -= 2;
                    }
                        //this.Laser.BoxTouchC0.position.z -= 2
                    
                    this.Laser.hitboxE.position.x = this.hitboxE.position.x;
                    this.Laser.hitboxE.position.z = this.hitboxE.position.z;
                    
                }
                
            }
            if (this.timemove>=640) {
                var m2 = linearmoveb ((this.timemove-640),this.hitboxE, 1, easingfns.easeOutBack, tabPbiss);
            }
            this.timemove++;
            if (this.timemove>=720) {
                if (this.Laser!==undefined) {
                this.Laser.life=0;
                }
                this.life=0;
            }      
    }
};
Enemy.prototype.movepatternF = function(tab1,tab2) {//need a delay
    this.designE.rotation.x += this.rotationspeed;
    this.designE.rotation.y += this.rotationspeed;
    //if (this.timemove<60*21) {//this condition is for nbr of loop, remove it for no-loop
        this.tabPbis = tab1;
        this.tabPbiss = tab2;        
    if (this.life>0) {
        if (this.nbrloopmove <3) {
            if (this.timemove<60*2) {
                var m1 = linearmoveb ((this.timemove),this.hitboxE, 2, easingfns.easeInQuint, this.tabPbis);
            }
            if (this.timemove<60*5) {
                if (objPlayer.life>0) {
                    //if (this.cooldownE((this.timemove-60*2),30)) {
                    if (this.cooldownE(this.timemove,30)) {
                        var BulletE2=new EnemyBullet0(this.hitboxE,18,12,false,0/*meshbulletshootType02*/);
                        BulletE2.speed=0.2;
                        FullEnemyBullet.push(BulletE2);
                        //this.emitbullet=false;
                    }
                }
            }
            if (this.timemove>=60*5) {
                var m2 = linearmoveb ((this.timemove-60*5),this.hitboxE, 2, easingfns.easeOutQuint, this.tabPbiss);
            }
            if (this.timemove>60*7 /*|| objPlayer.life<=0*/) {//this condition is for loop, remove it for no-loop
                this.timemove=0;
                this.cooldown=30;
                this.nbrloopmove +=1;
            }
        //}
            this.timemove++;
        }
        else {
           this.life=0;
        }
    }
};
var laserbeam = function() {
    //Laser creation
    var Laser = new Enemy(true,"none",EnemydesignA);
        Laser.touchdamage=1;
    //this.Laser.hitboxE.position.x = this.hitboxE.position.x;
    //this.Laser.hitboxE.position.z = this.hitboxE.position.z-10;
        Laser.hitboxE.scaling.z = 0.1;
        Laser.hitboxE.scaling.x = 0.1;
    //this.Laser.hitboxE.position.z = this.hitboxE.position.z-2;
        Laser.hitboxE.material.diffuseColor = new BABYLON.Color3(0.98, 0.98, 0.95);
        Laser.BoxTouchC0.material.diffuseColor = new BABYLON.Color3(0.44, 0.85, 0.95);
    //Laser.BoxTouchC0.position.z = -11;
    //this.Laser.BoxTouchC0.scaling.z = 2;
    //this.Laser.BoxTouchC0.scaling.x = 2;
        Laser.BoxTouchC0.scaling = new BABYLON.Vector3(10, 0.1, 10);
        Laser.BoxTouchC0.isVisible =true;
        Laser.designE.isVisible = false;
        Laser.props=true;
    //this.LaserE1=null;
};
Enemy.prototype.movepatternFbis = function() {
    this.tabPbis;
    this.tabPbiss;
    if (this.tabPbiss===undefined) {// to avoid pass into for each loop
        this.tabPbis = arraymirror(patterncoordinate.patternF1());
        this.tabPbiss = arraymirror(patterncoordinate.patternF2());
    }
    this.movepatternF(this.tabPbis,this.tabPbiss);
};

Enemy.prototype.movepatternG = function() {
    this.designE.rotation.x += this.rotationspeed;
    this.designE.rotation.y += this.rotationspeed;
    //if (this.timemove<60*21) {//this condition is for nbr of loop, remove it for no-loop
        var path1 = [[2,28,0],[0,0,0],[0,0,0],[2,20,0]];
        var path2 = [[2,20,0],[0,0,0],[0,0,0],[8,18,0]];
        var path3 = [[8,18,0],[8,-6,0],[-8,-6,0],[-8,18,0]];
        var path4 = [[-8,18,0],[-8,-6,0],[8,-6,0],[8,18,0]];
    if (this.life>0) {
        //if (this.nbrloopmove <3) {
            if (this.timemove<60*2) {
                var m1 = linearmoveb ((this.timemove),this.hitboxE, 2, easingfns.easeInOutExpo, path1);
            }
            /*if (this.timemove<60*7) {
                if (objPlayer.life>0) {
                    if (this.cooldownE((this.timemove-60*6),30)) {
                        var BulletE2=new EnemyBullet0(this.hitboxE,18,12,0meshbulletshootType02);
                        BulletE2.speed=0.2;
                        FullEnemyBullet.push(BulletE2);
                        this.emitbullet=false;
                    }
                }
            }*/
            if (this.timemove>=60*2 && this.timemove<60*4) {
                var m2 = linearmoveb ((this.timemove-60*2),this.hitboxE, 2, easingfns.easeOutQuint, path2);
                /*if (objPlayer.life>0) {
                        if (this.cooldownE((this.timemove-60*2),20)) {
                            var BulletE2=new EnemyBullet0(this.hitboxE,18,12,true,0meshbulletshootType02);
                            BulletE2.speed=0.2;
                            FullEnemyBullet.push(BulletE2);
                            this.emitbullet=false;
                        }
                    }*/
            }
            if (this.timemove>=60*5 && this.timemove<60*7) {
                var m3 = beziercurvemoveb ((this.timemove-60*5),this.hitboxE, 2, easingfns.easeInOutSine, path3);

            }
            if (this.timemove>=60*8) {
                var m4 = beziercurvemoveb ((this.timemove-60*8),this.hitboxE, 2, easingfns.easeInOutExpo, path4);
                   
            }
            if (objPlayer.life>0 ) {
                if ((this.cooldownE((this.timemove-60*4),30))===true && (this.hitboxE.position.x<=-7.5 || this.hitboxE.position.x>=7.5)) {
                //if (this.timemove===30 ||this.timemove===60 ||this.timemove===90 ||this.timemove===120 ||this.timemove===150 ||this.timemove===180 ||this.timemove===210 ||this.timemove===240 ||this.timemove===270 || this.timemove===300 || this.timemove===330 || this.timemove===360 || this.timemove===390 ||this.timemove===410|| this.timemove===440 ||this.timemove===470 || this.timemove===500 ||this.timemove===530 || this.timemove===560 ||this.timemove===590){
                    var BulletE2=new EnemyBullet0(this.hitboxE,18,12,true,0/*meshbulletshootType02*/);
                    BulletE2.speed=0.2;

                    FullEnemyBullet.push(BulletE2);
                    //this.emitbullet=false;
                }
            }
            if (this.timemove>60*10 /*|| objPlayer.life<=0*/) {//this condition is for loop, remove it for no-loop
                this.timemove=60*4;
                this.cooldown=30;
            }
        //}
            this.timemove++;
        //}
       /* else {
           this.life=0;
        }*/
    }
}; 

var E3q;
//var E1,E2a,E2b,E2c,E3a,E3b,E3c,E4,E5,E6;
function CreateEnemy() {
        E3q = new Enemy(true,"D",EnemydesignA);
        E3q.hitboxE.position.x = -3;
    
    var E1 = new Enemy(false,"B",EnemydesignA);
        E1.hitboxE.position.z=28;
        E1.life=30;
//E2.hitboxE.position.x = 6;
// P1: props creation enemy shield   
    var P1 = new Enemy(false,"0",EnemydesignA);
        P1.hitboxE.scaling.x = 2;
        P1.designE.isVisible=false;
        P1.props=true;
}

var plateau = BABYLON.Mesh.CreateBox("plateau",24, scene, false);
plateau.material = new BABYLON.StandardMaterial("background", scene);
plateau.material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
plateau.material.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
plateau.material.specularColor = new BABYLON.Color3(0, 0, 0);
plateau.material.backFaceCulling = false;
plateau.scaling.y = 0.1;
plateau.scaling.x = 1.4;
plateau.scaling.z = 1.8;
plateau.position.z = 10;
plateau.position.y = -9;
//background.rotation.x = -1.57;
plateau.receiveShadows = true;

var box2 = BABYLON.Mesh.CreateBox("Box", 1.0, scene);
var materialbox2 = new BABYLON.StandardMaterial("pinkmat", scene);
materialbox2.diffuseColor = new BABYLON.Color3(0.2, 1, 0.5);
box2.material = materialbox2;

box2.position.z = -4;
box2.position.y = -6;

scene.registerBeforeRender(function(){ 
box2.rotation.y=box2.rotation.y+0.05; 
}); 

var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
shadowGenerator.getShadowMap().renderList.push(box2);
//shadowGenerator2.getShadowMap().renderList.push(shipbody);
//shadowGenerator.useVarianceShadowMap = true;
shadowGenerator.usePoissonSampling = true;

var enemyBullets = [];
var moveleft = false;
var moveright = false;
var shootOK = false;
//var meshbulletshoot;
//bulletsToRemove
//  Player Bullet
var meshbulletshootP = BABYLON.Mesh.CreateBox("ShootBox", 0.4, scene);
    meshbulletshootP.material = new BABYLON.StandardMaterial("matshoot", scene);
    meshbulletshootP.material.diffuseColor= new BABYLON.Color3(1, 0, 0);
    meshbulletshootP.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
    meshbulletshootP.position.y =0.2;
    meshbulletshootP.position.x = 20;
//  Player Bullet Design 01   
var meshbulletshootTypeA = BABYLON.Mesh.CreateBox("ShootPlayerA", 0.45, scene);
    meshbulletshootTypeA.material = new BABYLON.StandardMaterial("matshootPdesignA", scene);
    meshbulletshootTypeA.material.diffuseColor= new BABYLON.Color3(0.76, 0.1, 0.20);
    meshbulletshootTypeA.material.emissiveColor = new BABYLON.Color3(0.85, 0.1, 0.80);
    meshbulletshootTypeA.position.x = 24;
//  Enemy Bullet   
var meshbulletshootE = BABYLON.Mesh.CreateBox("ShootBoxE", 0.8, scene);
    meshbulletshootE.material = new BABYLON.StandardMaterial("matshootE", scene);
    meshbulletshootE.material.diffuseColor= new BABYLON.Color3(1, 0, 0);
    meshbulletshootE.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
    meshbulletshootE.position.y =0.2;
    meshbulletshootE.position.x = 26;
//  Enemy Bullet Design 01  
var meshbulletshootType01 = BABYLON.Mesh.CreateCylinder("DesignShoot01", 0.6, 1, 1, 6, 1, scene, false);
    meshbulletshootType01.material = new BABYLON.StandardMaterial("matshootEdesign", scene);
    meshbulletshootType01.material.diffuseColor= new BABYLON.Color3(0.16, 0.23, 0.59);
    meshbulletshootType01.material.emissiveColor = new BABYLON.Color3(0.16, 0.23, 0.59);
    meshbulletshootType01.position.x = 22;
    
var meshbulletshootType02 = BABYLON.Mesh.CreateCylinder("DesignShoot02", 0.6, 1, 1, 3, 1, scene, false);
    meshbulletshootType02.material = new BABYLON.StandardMaterial("matshootEdesign", scene);
    meshbulletshootType02.material.diffuseColor= new BABYLON.Color3(0.16, 0.23, 0.9);
    meshbulletshootType02.material.emissiveColor = new BABYLON.Color3(0.16, 0.23, 0.9);
    meshbulletshootType02.position.x = 20;
//  Enemy Bullet 2D Design 01 
//Just need to create the manager
var meshbulletshootType2D = new BABYLON.SpriteManager("bulletmanager1","asset/bulletanim1min.png",200,64,scene);
var meshbulletshootTypeLazer = new BABYLON.SpriteManager("lazermanager1","asset/lazerloadmin.png",5,64,scene);
var meshbulletplayerType2D = new BABYLON.SpriteManager("bulletmanager2","asset/bulletplayerV2min.png",40,64,scene);

var warning2D = new BABYLON.SpriteManager("warning","asset/WarningBoss.png",2,128,scene);
var warningboss;
var warningplan = BABYLON.Mesh.CreatePlane("WarningPlan", 1.0, scene);
    warningplan.material = new BABYLON.StandardMaterial("matplanfilter1",scene);
    warningplan.material.diffuseColor = new BABYLON.Color3(0.01, 0.01, 0.08);
    warningplan.material.emissiveColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    warningplan.material.specularColor = new BABYLON.Color3(0, 0, 0);
    //warningplan.material.backFaceCulling = false;
    warningplan.scaling.x = 0.1;//largeur
    warningplan.scaling.y = 0.1;//hauteur
    warningplan.position.z=-30;
    warningplan.position.y=0;
    warningplan.position.x=0;
    //warningplan.material.alpha = 0.8;
    warningplan.isVisible=false;
    //warningplan.visibility=0.5;
    //filterplan.material.backFaceCulling = true;
    warningplan.parent = freeCamera;

var FullEnemyBullet=[];
var EnemyBullet0 = function(mesh,h,precision,follower,design) {
    //this.angleb=h;
    //h=this.angleb;
    this.timerr=0;
    this.dommage=1;
    this.follower=follower;
    this.cooldown=20;
    this.precision=precision;
    //this.direction=(h/(precision))*Math.PI;
    this.angleh=h;
    //why i can't set this.b in this way
    //this.direction=(this.b/(12))*Math.PI;
    this.speed=0.5; 
    this.shootEnemytype0 = meshbulletshootE.clone("meshbulletshootbis0");
    if (design!==undefined){
        if (design===0) {
        this.d2 = new BABYLON.Sprite("shoot2d",meshbulletshootType2D);
        this.d2.playAnimation(0,8,true,100);
        this.d2.position.x = mesh.position.x;
        this.d2.position.z = mesh.position.z;
        this.d2.size = 1.4;
        }
        else {
        var shootEnemydesign0 = design.clone("shootEnemydesign0");
            shootEnemydesign0.visibility = 0.6;
            shootEnemydesign0.position.x = 0;
            shootEnemydesign0.parent = this.shootEnemytype0;

        var shootEnemydesign0b = design.clone("shootEnemydesign0b");
            shootEnemydesign0b.scaling.x = 0.6;
            shootEnemydesign0b.scaling.z = 0.6;
            shootEnemydesign0b.position.x = 0;
            shootEnemydesign0b.parent = shootEnemydesign0;
            shootEnemydesign0b.material.emissiveColor = new BABYLON.Color3(0.16, 0.8, 0);}
    }
    
    this.shootEnemytype0.position.z = mesh.position.z;
    this.shootEnemytype0.position.x = mesh.position.x;
    this.shootEnemytype0.isVisible = false;
    if (this.follower===true) {
        this.y = (this.shootEnemytype0.position.z)-(objPlayer.hitboxPproxy.position.z);
        this.x = (this.shootEnemytype0.position.x)-(objPlayer.hitboxPproxy.position.x);
        this.alpha=Math.atan2(this.y,-this.x);
    }
    //return FullEnemyBullet.push(this);
};

EnemyBullet0.prototype.speedshotEE = function() {
    this.direction=(this.angleh/(this.precision))*Math.PI;
    if (this.follower===false) {
        if (this.d2!==undefined){
            this.d2.position.x +=this.speed*Math.cos(this.direction);
            this.d2.position.z +=this.speed*Math.sin(this.direction);
        }
    this.shootEnemytype0.position.x +=this.speed*Math.cos(this.direction);
    this.shootEnemytype0.position.z +=this.speed*Math.sin(this.direction);
    }
    if (this.follower===true) {
        if (this.d2!==undefined){
            this.d2.position.x +=this.speed*Math.cos(this.alpha);
            this.d2.position.z +=(-(this.speed*Math.sin(this.alpha)));
        }
            this.shootEnemytype0.position.x +=this.speed*Math.cos(this.alpha);
            this.shootEnemytype0.position.z +=(-(this.speed*Math.sin(this.alpha))); 
    }
};
  
EnemyBullet0.prototype.limitshootEE = function() {
    //var totalE = FullEnemyBullet.length;
    //    while (totalE--) {
    if ((this.shootEnemytype0.intersectsMesh(objPlayer.hitboxP, false)) && objPlayer.touch===true) {
        this.shootEnemytype0.dispose();
        if (this.d2!==undefined){
            this.d2.dispose();
        }
        //objPlayer.invincible(scene,time);
        objPlayer.life-=this.dommage;
        objPlayer.invinciblestart = time+(1/BABYLON.Tools.GetFps());
        objPlayer.touch=false;
        if (objPlayer.life<0){
            objPlayer.life=0;
        }
        g("life").innerHTML = objPlayer.life;
        return true;
    }
    if (this.shootEnemytype0.position.z >25 || this.shootEnemytype0.position.z < -5 || this.shootEnemytype0.position.x > 15 || this.shootEnemytype0.position.x < -15 ) {
        this.shootEnemytype0.dispose();
        if (this.d2!==undefined){
            this.d2.dispose();
        }
        return true;
    }
    //}    
};

// from 0 to 2PI
var result;
function polarcircle(i,nbrloop) {   
    for (var a=0;a<nbrloop;a++) {
        for (var b=1;b<i;b++) {
           result=(b/(i/2))*Math.PI;
        }
    }
    return;
}

// Player Bullet
var PlayerBulletTotal=[];
var PlayerBullet = function(design) {
    this.dommage = 1;
    
    this.shootplayertype = meshbulletshootP.clone("meshbulletshootbis");
        this.shootplayertype.position.x = objPlayer.hitboxPproxy.position.x;
        this.shootplayertype.position.z = objPlayer.hitboxPproxy.position.z;
        this.shootplayertype.isVisible = false;
    if (design===0) {
        this.d2 = new BABYLON.Sprite("shootP2d",meshbulletplayerType2D);
        this.d2.playAnimation(0,12,true,100);
        this.d2.position.x = this.shootplayertype.position.x;
        this.d2.position.z = this.shootplayertype.position.z;
        this.d2.size = 1.4;
    }
    if (design===undefined) {
    var shootplayerdesignTA = meshbulletshootTypeA.clone("shootplayerdesignTA");
        shootplayerdesignTA.visibility = 0.9;
        shootplayerdesignTA.position.x = 0;
        shootplayerdesignTA.parent = this.shootplayertype;
    }
        //PlayerBulletTotal.push(shootplayertype);
    this.speedshootP = function() {
        if (design===0) {
            this.d2.position.z += 0.4;
        }
        this.shootplayertype.position.z += 0.4; 
            //shootplayertype.position.z += 0.4; 
            //shootplayertype.position.z += Math.cos((Math.PI/3))*0.3;
            //shootplayertype.position.x +=0.4*Math.cos(angle[4]);
            //shootplayertype.position.z +=0.4*Math.sin(angle[4]);
            //shootplayertype.position.x = shootplayertype.position.z;
            // fun pattern
            //shootplayertype.position.z += 0.4; 
            //shootplayertype.position.x += Math.sin(Math.PI+shootplayertype.position.z);          
    };
    this.limitshootP = function() {
        var totalE = FullEnemyBox.length;
        while(totalE--) {          
        //for (var i=0;i<totalE;i++){ //this way with loopfor work to    
            if ((this.shootplayertype.intersectsMesh(FullEnemyBox[totalE].hitboxE, false)) && FullEnemyBox[totalE].touch===true) {
                if (this.d2!==undefined){
                    this.d2.dispose();
                }
                this.shootplayertype.dispose();
                if (FullEnemyBox[totalE].props!==true) {
                    FullEnemyBox[totalE].life-=this.dommage;
                    FullEnemyBox[totalE].touchstart=true;
                    FullEnemyBox[totalE].designE.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
                    FullEnemyBox[totalE].designE.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
                    //g("score").innerHTML = FullEnemyBox[totalE].life;
                    gamescoring.score+=1;
                    //g("score").innerHTML = gamescoring.score;
                    gamescoring.displayscore();
                }
                if (FullEnemyBox[totalE].life===0) {
                    //FullEnemyBox[totalE].dispose();
                    soundenemyexplode.load();
                    soundenemyexplode.play();
                    explodebis((FullEnemyBox[totalE].hitboxE.position.x)+0.2,(FullEnemyBox[totalE].hitboxE.position.z)-0.4);
                    //var fer = new constructscore(FullEnemyBox[totalE].hitboxE,FullEnemyBox[totalE]);
                    displaypoint(FullEnemyBox[totalE],FullEnemyBox[totalE].hitboxE);
                    exploderuby(FullEnemyBox[totalE].hitboxE);
                    FullEnemyBox[totalE].hitboxE.isVisible = false;
                    FullEnemyBox[totalE].touch=false;
                    //FullEnemyBox[totalE].nbrloopmove=0;
                    //FullEnemyBox[totalE].timemove=0;
                    //FullEnemyBox[totalE].designE.dispose();
                    if (FullEnemyBox[totalE].Laser!==undefined){
                        FullEnemyBox[totalE].Laser.life=0;
                    }
                    FullEnemyBox[totalE].hitboxE.dispose();
                    gamescoring.score+=FullEnemyBox[totalE].totalpoints;
                    gamescoring.enemydown+=1;
                    //g("score").innerHTML = gamescoring.score;
                    gamescoring.displayscore();
                    //FullEnemyBox.splice(totalE,1);
                   //FullEnemyBox[totalE].hitboxE.visibility = 0;
                   //return true;
                   //FullEnemyBox[totalE].lifezero();
                   //FullEnemyBox[totalE]=undefined;
                   //FullEnemyBox[totalE]=null;
                   
                   FullEnemyBox.splice(totalE,1);
                }
                return true;
            }
            
        }
        if (this.shootplayertype.position.z >25) {
                if (this.d2!==undefined){
                    this.d2.dispose();
                }
                this.shootplayertype.dispose();
                return true;
        }
    }; 
};
//dMinutes = ( dMinutes < 10 ? "0" : "" ) + dMinutes;
var FullBuilding = [];
var BuildingGenerator = function(boolleftright) {
   this.leftright=boolleftright; 
   this.timercooldown=0;
   var size = randomIntFromInterval(2,5);
   var Hsize = randomIntFromInterval(5,9);
   var Xram = boolleftright;
   var Xram1 = randomIntFromInterval(-10,-5);//-10 -4 left
   var Xram2 = randomIntFromInterval(5,10);// 4 10 right
       Xram = (Xram ===true ? Xram1 : Xram2);
   var colorram = (randomIntFromInterval(1,5))/10;
   this.building = BABYLON.Mesh.CreateBox("BoxBuilding", size, scene); 
   this.building.material = new BABYLON.StandardMaterial("matbuilding", scene);
   this.building.material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2); 
   this.building.material.diffuseColor = new BABYLON.Color3(0.15, colorram, 0.1);
   this.building.position = new BABYLON.Vector3(Xram,(size/2)-8, 30);
   this.building.scaling.x = (Hsize/10);
   this.building.scaling.z = (Hsize/10);
     
   this.limitshootB = function() {    
       if (this.building.position.z < -10) {
            this.building.dispose();
            return true;
        }
    };
    shadowGenerator.getShadowMap().renderList.push(this.building);
    return FullBuilding.push(this);
};

//var tdsBox1 = BABYLON.Mesh.CreateBox("BoxPoint", 1, scene);
//    tdsBox1.isVisible = false;
//constructscore
var ardisplayscore = [];
var planpoint =function() {
    this.ect=BABYLON.Mesh.CreateBox("pp", 1, scene);
    this.ect.material = new BABYLON.StandardMaterial("matpp",scene);
    this.ect.material.opacityTexture = new BABYLON.Texture("asset/number.png", scene);
    this.ect.material.emissiveColor = new BABYLON.Color3(1, 0.8, 0.9);
    this.ect.material.specularColor = new BABYLON.Color3(0, 0, 0);
    this.ect.material.opacityTexture.uOffset = 4.5;
    this.ect.material.opacityTexture.uScale = 0.1;
    this.ect.position.z=0;
    this.ect.rotation.x=Math.PI/2;
    this.ect.material.alpha = 1;
    //displayscore.diffuseTexture.vScale = 5.0;
    ardisplayscore.push(this);
};
           
function displaypoint(mesh,meshpos) {
    var boxpoint=BABYLON.Mesh.CreateBox("BoxPoint", 1, scene);
        boxpoint.isVisible=false;
    var ds=mesh.totalpoints.toString();
    var deca=0.5;
    for(var i=0;i<ds.length;i++){
        var point = new planpoint ();
        point.ect.material.opacityTexture.uOffset -= parseInt(ds[i],10);
        if (i!==0){
            point.ect.position.x=/*meshpos.position.x+*/(i-deca);
            //point.ect.position.z=meshpos.position.z;
            //point.ect.position.y=2;
            //point.parent=boxpoint;
            deca+=0.5;
        }
        else{
            point.ect.position.x=/*meshpos.position.x+*/i;
            //point.ect.position.z=meshpos.position.z;
            

        }
        point.ect.position.y=2;
        point.ect.parent=boxpoint;
        //ect.parent = tdsBox2;
    }
    boxpoint.scaling = new BABYLON.Vector3(1.5,1.5,1.5);
    boxpoint.position.x = meshpos.position.x-(ds.length/4);
    boxpoint.position.z = meshpos.position.z;
    ardisplayscore.push(boxpoint);
}
// bakuretsu Jewel
//var ruby = BABYLON.Mesh.CreateCylinder("rubydesign", 0.4, 2, 2, 8, 1, scene, false);
//    ruby.position.z = 10;
//    ruby.scaling.z = 2;
var exruby = [];
var ExplodeRuby = function(mesh,randomspeed,randomcolor) {
    this.timemove=0;
    this.timedecal=0;
    this.speed=randomspeed;
    this.startposX=randomIntFromInterval(-5,4);
    this.finalposX=randomIntFromInterval(-2,2);
    this.meshposX=mesh.position.x;
    if (this.meshposX===0){
      this.meshposX=1;  
    }
    this.meshposZ=mesh.position.z;
    this.tabPbis = [[this.meshposX,this.meshposZ,0],[(this.meshposX+this.startposX),(this.meshposZ+12),0],[this.meshposX,10,0],[(this.meshposX+this.finalposX),-1,0]];
    //this.visibilitystart = randomIntFromInterval(65,92)/100;
    //this.speed = randomIntFromInterval(10,20)/100;
    //this.rubyy = BABYLON.Mesh.CreateCylinder("rubydesign", 0.4, 2, 2, 8, 1, scene, false);
    this.rubyy = BABYLON.Mesh.CreateBox("RubyBox", 2, scene);
    this.rubyy.position=new BABYLON.Vector3(this.meshposX,0,this.meshposZ);
    this.rubyy.scaling.x=0.4;
    this.rubyy.material = new BABYLON.StandardMaterial("matruby", scene);
    this.rubyy.material.diffuseColor= new BABYLON.Color3(0.2,randomcolor/100,0.4);
    this.rubyy.material.emissiveColor= new BABYLON.Color3(0.3,0.3,0.3);
    this.rubyy.material.specularColor= new BABYLON.Color3(0.1,0.1,0.1);
    //this.rubyy.visibility = randomIntFromInterval(65,92)/100;
    exruby.push(this);
};
ExplodeRuby.prototype.movepatternrub = function() { 
    //var tabPbiss = [[-8,8,0],[-7,4,0],[-6,12,0],[-3,15,0]];
    if (this.timemove<((60*this.speed)/10)) {
        var m1 = beziercurvemoveb ((this.timemove),this.rubyy, (this.speed/10), easingfns.easeInSine, this.tabPbis);
    }
    /*if (this.timemove>=60*2) {
        var m2 = beziercurvemoveb ((this.timemove-60*2),this.hitboxE, 3, easingfns.easeOutQuint, tabPbiss);
    }
    if (this.timemove>60*5) {//this condition is for loop remove it for no-loop
        this.timemove=0;
    }*/
    this.timemove+=1;
};
ExplodeRuby.prototype.limitshootR = function() {
    //var totalE = FullEnemyBullet.length;
    //    while (totalE--) {
    if ((this.rubyy.intersectsMesh(objPlayer.hitboxPproxy, false)) && objPlayer.life>0) {
        this.rubyy.dispose();
        //if (this.d2!==undefined){
        //    this.d2.dispose();
        //}
        //if(soundrubypick.currentTime!==0){
        //    soundrubypick.currentTime=0;}
        soundrubypick.load();
        soundrubypick.play();
        gamescoring.rubytotalcapture+=1;
        return true;
    }
    else if(this.timemove>(60*(this.speed/10))+120) {
        this.rubyy.dispose();
        return true;
    }
};
function exploderuby(meshpos) {
    for (var i=0;i<16;i++) {
        var er = new ExplodeRuby(meshpos,randomIntFromInterval(5,20),randomIntFromInterval(45,92));
        gamescoring.rubytotalcreate+=1;
    }
}

var explodeaction = false;
var explodeEnemy = [];
var ExplodeParticle = function(size,x,z,decalX,decalZ) {
    //this.visibilitystart = randomIntFromInterval(65,92)/100;
    this.speed = randomIntFromInterval(5,20)/100;
    this.explodeboxE = BABYLON.Mesh.CreateBox("explodeEnemyE", size, scene);
    this.explodeboxE.material = new BABYLON.StandardMaterial("matexplodeE", scene);
    this.explodeboxE.material.diffuseColor= new BABYLON.Color3(0.2, 0.78,(randomIntFromInterval(60,80)/100));
    this.explodeboxE.visibility = randomIntFromInterval(65,92)/100;
    this.explodeboxE.position.y = randomIntFromInterval(-2,2)/10;
    this.explodeboxE.position.x = x-1+decalX;
    this.explodeboxE.position.z = z-1+decalZ;
    explodeEnemy.push(this);
};

function explodebis(x,z) {
    var size=0.5;
    var decalZ=0;
        var decalX=0;
        var back=0;
    for (var i=0;i<16;i++) {
        if (i===back) {
           back+=4;
           decalZ+=size;
           decalX=0;
        }
        var eb = new ExplodeParticle(size,x,z,decalX,decalZ);
        
        decalX+=size;
    }  
}

function checkproperty(p){
    for (var i=0;i<FullEnemyBox.length;i++){
        if (FullEnemyBox[i].patternselect===p) {
           return true; 
        } 
    }
}

var shootplayertype;
var time=0;
var timer=0;
var GamePause=false;
var introgame = true;
var startgame = false;
function StartGame() {
    if (startgame === true) {
        ResetGame();
    }
    //CreateEnemy();
    g("gamestart").style.display="none";
    //return true;         
    //startgame = true; 
}

function ResetGame() {
    if (FullEnemyBox.length!==0) {
        var totalE = FullEnemyBox.length;
        while(totalE--) {
            FullEnemyBox[totalE].life=0;
            FullEnemyBox[totalE].hitboxE.dispose();
            FullEnemyBox[totalE]=null;
            FullEnemyBox.splice(totalE,1);
        }
    }
    if (PlayerBulletTotal.length!==0) {
        var totalPB = PlayerBulletTotal.length;
        while(totalPB--) {
            if (PlayerBulletTotal[totalPB].d2!==undefined){
                PlayerBulletTotal[totalPB].d2.dispose();
            }
            PlayerBulletTotal[totalPB].shootplayertype.dispose();
            PlayerBulletTotal[totalPB]=null;
            PlayerBulletTotal.splice(totalPB,1);
        }
    }
    if (FullEnemyBullet.length!==0) {
        var totalFE = FullEnemyBullet.length;
        while(totalFE--) {
            FullEnemyBullet[totalFE].shootEnemytype0.dispose();
                FullEnemyBullet[totalFE].timemove=0;
                FullEnemyBullet[totalFE].cooldown=0;
                FullEnemyBullet[totalFE].nbrloopmove =0;
            if (FullEnemyBullet[totalFE].d2!==undefined){
                FullEnemyBullet[totalFE].timemove=0;
                FullEnemyBullet[totalFE].cooldown=0;
                FullEnemyBullet[totalFE].nbrloopmove =0;
                FullEnemyBullet[totalFE].d2.dispose();
            }
            FullEnemyBullet[totalFE]=null;
            FullEnemyBullet.splice(totalFE,1);
        }
    }
    camselect=1;
    //shootOK=true;
    time=0;
    timer=0;
    gamescoring.score=0;
    gamescoring.enemydown=0;
    gamescoring.enemytotalcreate=0;
    gamescoring.endstage=false;
    gamescoring.patternAlreadycreate=false;
    objPlayer.hitboxPproxy.position.x=0;
    objPlayer.life=20;
    g("life").innerHTML = objPlayer.life;
    objPlayer.touch=true;
    objPlayer.emitbullet=true;
    objPlayer.cooldown=20;
    gamescoring.displayscore();
    //objPlayer.cooldownP(timer,4);
    g("gameover").style.display ="none";
    g("stagename").className = "move";
    startgame = false;
}

/////////////////////////////////////////
g("gamestart").onclick= function() {
    //g("stagename").className = "move";
    if (introgame) {
        soundstart.load();
        soundstart.play();
    }
    else {soundrestart.load();
        soundrestart.play();}
        StartGame();    
};

window.onblur = function() {
    if (!GamePause) {
        GamePause = true;
        soundbglevel01.volume=0.1;
        g("screenpause").style.display ="block";
        g("stagename").style.WebkitAnimationPlayState = "paused";//for Chrome
        g("stagename").style.animationPlayState = "paused";//for ie10> ,FF
        g("renderCanvas").className = "filter";
        return;
    }
};

g("stagename").addEventListener("animationend", function() {//for ie10> ,FF
    g("stagename").className = "";
    startgame = true;
}, false);

g("stagename").addEventListener("webkitAnimationEnd", function() {//for Chrome
    g("stagename").className = "";
    startgame = true;
}, false);

g("bgs").addEventListener("ended",function(){
    //if (soundbglevel01.currentTime > 2) {   
    //alert("fin");
    //        soundbglevel01.currentTime=0;
            soundbglevel01.load();
            soundbglevel01.play();
      //  }
},false);

window.addEventListener("keydown", function (evt) {
    if(!evt){
        evt = window.evt;
    }
    if (evt.key === "s" || evt.keyCode === 83 || evt.which === 83){               
        moveleft = true;
    }
    if (evt.key === "f" || evt.keyCode === 70 || evt.which === 70){               
        moveright = true;
    }
    if (evt.key === "space" || evt.keyCode === 32 || evt.which === 32) {
        shootOK = true;              
    }
    if (evt.key === "g" || evt.keyCode === 71 || evt.which === 71){               
        explodeaction = true;
    }
    if (evt.key === "Esc" || evt.keyCode === 27 || evt.which === 27){               
        if (!GamePause) {
            GamePause = true;
            soundbglevel01.volume=0.1;
            g("screenpause").style.display ="block";
            g("stagename").style.WebkitAnimationPlayState = "paused";//for Chrome 
            g("stagename").style.animationPlayState = "paused";//for ie10> ,FF
            g("renderCanvas").className = "filter";
            //return;
        }
        else if (GamePause) {
            GamePause = false;
            soundbglevel01.volume=0.5;
            g("screenpause").style.display ="none";
            g("stagename").style.WebkitAnimationPlayState = "running";//for Chrome 
            g("stagename").style.animationPlayState = "running";//for ie10> ,FF
            g("renderCanvas").className = "";
            //return;
        }
    }    
});
  
window.addEventListener("keyup", function (evt) {
    if (evt.key === "s" || evt.keyCode === 83 || evt.which === 83) {
        moveleft = false;  
    }
    if (evt.key === "f" || evt.keyCode === 70 || evt.which === 70){                
        moveright = false;
    }
    if (evt.key === "g" || evt.keyCode === 71 || evt.which === 71){               
        explodeaction = false;
    }
    if (evt.key === "space" || evt.keyCode === 32 || evt.which === 32) {
        shootOK = false;
    }
});


//Attention !!!!!!!!!!!!!!!
//animation des partie du vaisseau fonctionne si dans ANIMATION 
//sinon faire toute modification de deplacement dans la fonction d'import
    //ANIMATION
    scene.registerBeforeRender(function () {
        //SPEED
        if (scene.isReady()) {
            g("blackscreen").style.display = "none";
            //var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);           
            //var gp = gamepads[0];
            
            //else {g("gamepad2").innerHTML ="Xnotpress";}
            //gamepadbtn();
/////////// Generation Building
            if (FullBuilding.length===0) {
                var building0 = new BuildingGenerator(true);
            }
            
            if (FullBuilding.length!==0) {
                for (var i=0;i<FullBuilding.length;i++) {
                    FullBuilding[i].building.position.z -= 0.1;
                    if((FullBuilding[i].limitshootB())===true) {
                        FullBuilding.splice(i,1);
                       }
                }
                var totalBuilding = FullBuilding.length;
                if (FullBuilding[(totalBuilding-1)].building.position.z<28) {
                    if (FullBuilding[(totalBuilding-1)].leftright===true) {
                        var building1 = new BuildingGenerator(false);
                    }
                    else {
                        var building1 = new BuildingGenerator(true);
                    }
                }
            }
            if (introgame && g("gamestart").style.display==="none") {
                
                if (shipbody.position.z<15){
                    if (shipabdomen.rotation.x<(Math.PI/9)){
                        shipabdomen.rotation.x += 0.02;
                        shipshellfront.position.z +=shipshellfront.translate(BABYLON.Axis.Z, -0.03, BABYLON.Space.LOCAL);
                    }
                    if (shipabdomen.position.z<-2){
                        shipabdomen.position.z += 0.02;
                        pos = shipabdomen.position.z;
                    }
                    if (shipshellback.rotation.x<0.12){
                        shipshellback.position.z += 0.2;
                        shipshellback.rotation.x += 0.02;
                        //shipshellback.rotate(BABYLON.Axis.X, 0.02, BABYLON.Space.LOCAL);
                        pos = shipshellback.position.z;
                    }
                    if (shipbody.position.y<1.5) {
                        shipbody.position.y += 0.005;
                    }
                    if (shipbody.position.y>1 && shipbody.rotation.x<1){
                        shipbody.rotation.x += 0.01;
                    }
                    if (shipbody.position.y>1.4 && shipbody.rotation.x>0.7){
                        shipbody.position.z += 0.4;
                    }
                    return;
                }
                introgame=false;
                //soundbglevel01.load();
                soundbglevel01.play();
                shipbody.position.y=0;
                shipbody.position.z=0;
                shipbody.rotation.x=0;
                g("stagename").className = "move";
                camselect=1;
                pbackligth.isVisible = true;
                hangar.isVisible = false;
            }
//////////// Start playing /////////////////            
            if (startgame) {
                if (vollevel<0.5){
                    vollevel+=0.002;
                    soundbglevel01.volume=vollevel;
                }
            if (!GamePause) {
            timer+=1;
            time=time+(1/BABYLON.Tools.GetFps());
//////////// Create enemy
            if (timer===10){
                var E1 = new Enemy(false,"B",EnemydesignA);
                E1.hitboxE.position.z=28;
                E1.life=30;
                var P1 = new Enemy(false,"0",EnemydesignA);
                    P1.hitboxE.scaling.x = 2;
                    P1.hitboxE.visibility=1;
                    P1.designE.isVisible=false;
                    P1.props=true;
            }
            if (timer===200){
                var E2a = new Enemy(false,"F",EnemydesignB);
                E2a.totalpoints=8564;             
            }
            if (timer===340){
                var E3a = new Enemy(false,"Fbis",EnemydesignB);
            }
            if (timer===620){
                if (checkproperty("F")!==true) {
                    var E2b = new Enemy(false,"F",EnemydesignB);
                }
            }
            if (timer===720){
                if (checkproperty("Fbis")!==true) {
                    var E3b = new Enemy(false,"Fbis",EnemydesignB); 
                }  
            }
            if (timer===1040){
                if (checkproperty("F")!==true) {
                    var E2c = new Enemy(false,"F",EnemydesignB);
                }            
            }
            if (timer===1160){
                if (checkproperty("Fbis")!==true) {
                    var E3c = new Enemy(false,"Fbis",EnemydesignB);
                }           
            }
            if ((timer>600 && timer<800 && checkproperty("B")!==true && checkproperty("G")!==true ) || (timer===1000 && checkproperty("G")!==true)){
                var E4 = new Enemy(true,"G",EnemydesignA);
                E4.hitboxE.position.z=28;
                        //CreateEnemy2();//60*7        
            }
            if (timer===1200){
                var E5 = new Enemy(false,"E",EnemydesignD);
            }
            if (timer>1300 && timer<1400 && checkproperty("B")!==true && checkproperty("E2")!==true /*&& gamescoring.endstage===false*/){ 
                var E6 = new Enemy(false,"E2",EnemydesignD);
                //gamescoring.endstage=true;
            }
            
            if (timer>1350 && checkproperty("E2")!==true && checkproperty("A")!==true && gamescoring.patternAlreadycreate===false/*&& gamescoring.endstage===false*/){ 
                var E3g=new Enemy(false,"A",EnemydesignA);
                E3g.life=30;
                E3g.totalpoints=10256;
                gamescoring.patternAlreadycreate=true;
                //gamescoring.endstage=true;
            }
            if (timer>1450 && checkproperty("E")!==true && checkproperty("A2")!==true && checkproperty("A")!==true && warningboss===0 && gamescoring.endstage===false){ 
                var E3h=new Enemy(false,"A2",EnemydesignA);
                E3h.life=150;
                E3h.totalpoints=235256; 
                gamescoring.endstage=true;
                gamescoring.patternA2lreadycreate=true;
            }
            
            if (timer>1355 && checkproperty("E")!==true && gamescoring.patternAlreadycreate===true && checkproperty("A")!==true && checkproperty("B")!==true && checkproperty("E2")!==true) {
                
                if (warningplan.scaling.y===0.1){
                    warningplan.isVisible=true;
                    gamescoring.timescreen=timer;}
                if ((timer-gamescoring.timescreen)<100){
                    //gamescoring.timescreen=timer;
                     warningplan.scaling.y= easingfns.easeOutBounce((timer-gamescoring.timescreen)/100)*10;//hauteur
                }
                if ((timer-gamescoring.timescreen)>100 && warningplan.scaling.x <25) {
                    warningplan.scaling.x +=0.5;
                }
                if (warningboss===undefined && warningplan.scaling.x >24){
                    warningboss = new BABYLON.Sprite("warning2d",warning2D);
                    warningboss.playAnimation(0,10,true,100);
                    warningboss.position.x = 0;
                    warningboss.position.z = -5;
                    warningboss.position.y = 35;
                    //warningboss.uOffset = 0.1;
                    warningboss.size = 10;
                    
                }
                if (timer-gamescoring.timescreen===200) {
                    warningboss.playAnimation(10,15,false,100);
                    //gamescoring.timescreen=timer;  
                }
                
                if (timer-gamescoring.timescreen===400) {
                    warningplan.isVisible=false;
                    warningboss.dispose();
                    warningboss=0;
                }
                
            }
            
/////////// Enemy 3dCube Animation
            if (FullEnemyBox.length!==0) {
                
                var totalEnemyEE = FullEnemyBox.length;
                while(totalEnemyEE--) {
                    FullEnemyBox[totalEnemyEE].movepattern();
                    if (FullEnemyBox[totalEnemyEE].touchstart===true){
                        FullEnemyBox[totalEnemyEE].colortouch();
                    }
                    if (FullEnemyBox[totalEnemyEE].limitshootEEE()===true){
                        FullEnemyBox[totalEnemyEE]=null;
                        FullEnemyBox.splice(totalEnemyEE,1);}
                }
            }
            //when a enemy is destoy make a explosion
            if (explodeEnemy.length!==0) {
                for (var i=0;i<explodeEnemy.length;i++) {
                    explodeEnemy[i].explodeboxE.position.z += explodeEnemy[i].speed;
                    explodeEnemy[i].explodeboxE.visibility -= 0.03;
                    if (explodeEnemy[i].explodeboxE.visibility<=0){
                        explodeEnemy[i].explodeboxE.dispose();
                        explodeEnemy.splice(i,1);
                    } 
                }
            }
            //when a enemy is destoy make a explosion of ruby 
            if (exruby.length!==0) {
                var totalR = exruby.length;
                for (var i=0;i<totalR;i++) {
                    exruby[i].movepatternrub();
                }
                while (totalR--) {
                //for (var i=0;i<exruby.length;i++) {
                    
                    //explodeEnemy[i].explodeboxE.position.z += explodeEnemy[i].speed;
                    //explodeEnemy[i].explodeboxE.visibility -= 0.03;
                    if (exruby[totalR].limitshootR()===true){
                        //explodeEnemy[i].explodeboxE.dispose();
                        exruby.splice(totalR,1);
                    } 
                }
            }
            // Enemy shoot with cooldown
            if (objPlayer.life>0) {
                
            }
            // if there are bullets we check collision or offscreen
            if (FullEnemyBullet.length!==0) {
                var totalEee = FullEnemyBullet.length;
                while (totalEee--) {
                //for (var a=0;a<FullEnemyBullet.length;a++) {    
                    FullEnemyBullet[totalEee].speedshotEE();
                    if(FullEnemyBullet[totalEee].limitshootEE()) {                      
                        if (FullEnemyBullet[totalEee].d2!==undefined){
                            FullEnemyBullet[totalEee].timemove=0;
                            FullEnemyBullet[totalEee].cooldown=0;
                            FullEnemyBullet[totalEee].d2.dispose();
                        }
                        FullEnemyBullet[totalEee]=null;
                        FullEnemyBullet.splice(totalEee,1);
                    }
                }    
            } 
///////////////////// Enemy Action -- Start ////////////////////
       
               if (objPlayer.touch===false) {
                   //objPlayer.invincible(time);
                   objPlayer.invincible2d(time);
               }
            // Death Condition and screenplay
                if (objPlayer.life<=0) {
                    
                        //player.visibility = 0.4;
                    objPlayer.touch=false;
                    //objPlayer.isVisible = false;
                    g("losewin").innerHTML ="GAME OVER";
                    g("gameover").style.display ="block";
                    if (FullEnemyBullet.length===0) {
                        g("gamestart").style.display="block";
                    }
                    
                }
            // Win Condition and screenplay
                if (/*timer>1340 && */FullEnemyBox.length===1 && gamescoring.endstage===true && objPlayer.life>0) {
                    //player.visibility = 0.4;
                    objPlayer.touch=false;
                    //shootOK = false;
                    //objPlayer.isVisible = false;
                    g("losewin").innerHTML = "Level Complete";
                    g("gameover").style.display ="block";
                    if (FullEnemyBullet.length===0 /*&& PlayerBulletTotal.length===0*/) {
                        
                        g("gamestart").style.display="block";
                    }
                    
                }
///////////////////// Enemy Action -- End //////////////////// 
            
///////////////////// Player Action -- Start////////////////////
                    
            if (shootOK) {      
                if (objPlayer.life>0 && objPlayer.cooldownP(timer,8)) {
                    var PB = new PlayerBullet(0);
                    //soundshoot.load();
                    if(soundshoot.currentTime!==0){
                        soundshoot.currentTime=0;}
                    soundshoot.load();
                    soundshoot.play();
                    PlayerBulletTotal.push(PB);
                    objPlayer.emitbullet=false;
                }  
            }
            if (explodeaction) {
                if (explodeEnemy.length===0) {
                    //var explodebbbb = new Explosion();
                    explodebis(objPlayer.hitboxPproxy.position.x,objPlayer.hitboxPproxy.position.z);
                }
            }
            if (ardisplayscore.length!==0) {
                //for (var i=0;i<ardisplayscore.length;i++) {
                    var deleteboxpoint=false;
                    var tot=ardisplayscore.length;
                    while(tot--){
                        if (ardisplayscore[tot].id!=="BoxPoint") {
                            ardisplayscore[tot].ect.material.alpha -= 0.02;
                            if ((ardisplayscore[tot].ect.material.alpha)/*.toFixed(2)*/<0) {
                                    ardisplayscore[tot].ect.dispose();
                                    ardisplayscore[tot].ect=undefined;
                                    ardisplayscore[tot].ect=null;
                                    ardisplayscore.splice(tot,1);
                                    deleteboxpoint=true;
                            }
                        }
                    }
                    if (deleteboxpoint===true){
                        ardisplayscore[0].dispose();
                        //ardisplayscore[0]===null;
                        ardisplayscore[0]=undefined;
                        ardisplayscore.splice(0,1);
                        deleteboxpoint = false;
                    }
            }
            if (PlayerBulletTotal.length!==0) {
                /*var totalEaz = PlayerBulletTotal.length;
                while(totalEaz--) { 
                    PlayerBulletTotal[totalEaz].speedshootP(); 
                }*/
                for (var i=0;i<PlayerBulletTotal.length;i++){
                        PlayerBulletTotal[i].speedshootP(); 
                    if((PlayerBulletTotal[i].limitshootP())===true) {
                        PlayerBulletTotal[i]=null;
                        PlayerBulletTotal.splice(i,1);
                        
                       }
                }
            }
///////////////////// Player Action -- End//////////////////// 
            if (moveleft) {
                if ( objPlayer.hitboxPproxy.position.x < (-10) ) {
                    //return;
                }
                else {       
                    objPlayer.hitboxPproxy.position.x -= 0.3;
                    //for (var d=0;d<player.length;d++){
                    if (shipbody.rotation.z<0.5) {
                        shipbody.rotation.z += 0.05;
                        //shipbody.rotation.z = 1;
                    }
                    // les different methode fonctionne aussi
                    //shipabdomen.rotate(BABYLON.Axis.Z, 0.2, BABYLON.Space.LOCAL);
                    //player[0].rotation.x += 1.57;
                    //        }
                    //player2d.position.x -= 0.4;
                    //player2d.angle -= Math.PI*0.02;
                }    
            }         
            if (moveright) {
                if ( objPlayer.hitboxPproxy.position.x > 10 ) {
                   // return;
                }
                else { 
                    objPlayer.hitboxPproxy.position.x += 0.3;
                    if (shipbody.rotation.z>-0.5) {
                        shipbody.rotation.z -= 0.05;
                    }
                }
            }
            // ship back position 
            if (!moveright && !moveleft) {
                if (shipbody.rotation.z!==0) {
                    if (shipbody.rotation.z<0) {
                        shipbody.rotation.z += 0.05;
                    }
                    if (shipbody.rotation.z>0) {
                        shipbody.rotation.z -= 0.05;
                    }
                }
            }
        }
        }
        }
    });
    
engine.runRenderLoop(function () {
//testmap.material.setVector3("cameraPosition", camera.position ,scene);
scene.render();
/*if (introgame===false) {
//scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
scene.fogColor = new BABYLON.Color3(0.5,0.5,0.1);
scene.fogStart = 2.0;
scene.fogEnd = 10.0;
scene.fogDensity = 0.1;
}*/
scene.activeCamera = scene.cameras[camselect];
//hangar.material.setVector3("cameraPosition", camera.position);
document.getElementById("stats").innerHTML = "<br>" + "Total vertices: " + scene.getTotalVertices() + "<br>"
                    //+ "can vertices: " + sphere.getTotalVertices() + "<br>"
                    + "Active vertices: " + scene.getActiveVertices() + "<br>"
                    + BABYLON.Tools.GetFps().toFixed() + " fps<br>"/*;
                    + "Active particles: " + scene.getActiveParticles() + "<br><br><br>"
                    + "Frame duration: " + scene.getLastFrameDuration() + " ms<br><br>"
                    + "<i>Evaluate Active Meshes duration:</i> " + scene.getEvaluateActiveMeshesDuration() + " ms<br>"
                    + "<i>Render Targets duration:</i> " + scene.getRenderTargetsDuration() + " ms<br>"
                    + "<i>Particles duration:</i> " + scene.getParticlesDuration() + " ms<br>"
                    + "<i>Sprites duration:</i> " + scene.getSpritesDuration() + " ms<br>"
                    + "<i>Render duration:</i> " + scene.getRenderDuration() + " ms";*/
                    + pos + " postionX<br>";    
});
