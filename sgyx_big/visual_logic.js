"use strict";

/**
 * Generated by Verge3D Puzzles v.2.7.1
 * Fri Oct 12 2018 23:45:00 GMT+0800 (中国标准时间)
 */

(function() {


// global variables/constants used by blocks' functions
var _pGlob = {};

_pGlob.fadeAnnotations = true;

// differs from the other utility callback arrays, cannot be used with the
// fireObjectPickingCallbacks() method
_pGlob.objClickCallbacks = [];
_pGlob.pickedObject = '';
_pGlob.objHoverCallbacks = [];
_pGlob.hoveredObject = '';

_pGlob.objMovementInfos = {};
_pGlob.objDragOverCallbacks = [];
_pGlob.objDragOverInfoByBlock = {}
_pGlob.dragMoveOrigins = {};
_pGlob.dragScaleOrigins = {};
_pGlob.mediaElements = {};
_pGlob.loadedFiles = {};
_pGlob.loadedFile = '';
_pGlob.animMixerCallbacks = [];

_pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
_pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
_pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
_pGlob.MIN_DRAG_SCALE = 10e-4;

_pGlob.vec2Tmp = new v3d.Vector2();
_pGlob.vec2Tmp2 = new v3d.Vector2();
_pGlob.vec3Tmp = new v3d.Vector3();
_pGlob.vec3Tmp2 = new v3d.Vector3();
_pGlob.quatTmp = new v3d.Quaternion();
_pGlob.quatTmp2 = new v3d.Quaternion();
_pGlob.planeTmp = new v3d.Plane();
_pGlob.raycasterTmp = new v3d.Raycaster();

var PL = v3d.PL = v3d.PL || {};

PL.legacyMode = false;

PL.execInitPuzzles = function() {

    var _initGlob = {};

    _initGlob.percentage = 0;
    _initGlob.output = {
        initOptions: {
            fadeAnnotations: true,
            useBkgTransp: false,
            preserveDrawBuf: false,
            useCompAssets: false,
            useFullscreen: false,
            useCustomPreloader: false,
            preloaderStartCb: function() {},
            preloaderProgressCb: function() {},
            preloaderEndCb: function() {},
        }
    }

        _initGlob.output.initOptions.fadeAnnotations = true;
    _initGlob.output.initOptions.useBkgTransp = true;
    _initGlob.output.initOptions.preserveDrawBuf = false;
    _initGlob.output.initOptions.useCompAssets = true;
    _initGlob.output.initOptions.useFullscreen = false;

    //loading
    var $page_loading = $("#page_loading")
    _initGlob.output.initOptions.useCustomPreloader = true;
    _initGlob.output.initOptions.preloaderEndCb = function(){

        $percent.html( "100%" )
        setTimeout(function(){
            $page_loading.hide()
        },800)


    };

    var $percent = $("#percent")
    _initGlob.output.initOptions.preloaderProgressCb = function( percent ){

        percent = Math.floor( percent ) - 1
        $percent.html( percent + "%" )

    };

    return _initGlob.output;
}

PL.init = function(appInstance, initOptions) {

    initOptions = initOptions || {};

    if ('fadeAnnotations' in initOptions) {
        _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
    }

var chouti_animation, guizi_animation;


        function getSceneByAction(action) {
            var root = action.getRoot();
            var scene = root.type == "Scene" ? root : null;
            root.traverseAncestors(function(ancObj) {
                if (ancObj.type == "Scene") {
                    scene = ancObj;
                }
            });
            return scene;
        }



        function getSceneAnimFrameRate(scene) {
            if (scene && "v3d" in scene.userData && "animFrameRate" in scene.userData.v3d) {
                return scene.userData.v3d.animFrameRate;
            }
            return 24;
        }



        // playAnimation, playAnimationExt and stopAnimation blocks
        (function() {
            appInstance.mixer.addEventListener("finished", function(e) {
                var cb = _pGlob.animMixerCallbacks;
                var found = [];
                for (var i = 0; i < cb.length; i++) {
                    if (cb[i][0] == e.action) {
                        cb[i][0] = null; // desactivate
                        found.push(cb[i][1]);
                    }
                }
                for (var i = 0; i < found.length; i++) {
                    found[i]();
                }
            });
        })();



        // playAnimation, playAnimationExt and stopAnimation blocks
        function operateAnimation( operation, animations, from, to, loop, timeScale, callback ) {
            if (!animations) return;
            // input can be either single obj or array of objects
            if (typeof animations == "string") animations = [animations];
            for (var i = 0; i < animations.length; i++) {
                var animName = animations[i];
                if (!animName) continue;
                var action = v3d.SceneUtils.getAnimationActionByName(appInstance, animName);
                if (!action) continue;
                switch (operation) {
                case "PLAY":
                    if (!action.isRunning()) {
                        action.reset();
                        if (loop && (loop != "AUTO"))
                            action.loop = v3d[loop];
                        var scene = getSceneByAction(action);
                        var frameRate = getSceneAnimFrameRate(scene);
                        if (timeScale == 1) {
                            action.timeScale = Math.abs(action.timeScale);
                            action.time = from ? from/frameRate : 0;
                            if (to)
                                action.getClip().duration = to/frameRate;
                        } else {
                            action.timeScale = -Math.abs(action.timeScale);
                            action.time = to ? to/frameRate : action.getClip().duration;
                        }
                        // action.time outside of the clip bounds can prevent the action from playing
                        action.time = v3d.Math.clamp(action.time, 0, action.getClip().duration);
                        action.paused = false;
                        action.play();

                        // push unique callbacks only
                        var callbacks = _pGlob.animMixerCallbacks;
                        var found = false;

                        for (var j = 0; j < callbacks.length; j++)
                            if (callbacks[j][0] == action && callbacks[j][1] == callback)
                                found = true;

                        if (!found)
                            _pGlob.animMixerCallbacks.push([action, callback]);
                    }
                    break;
                case "STOP":
                    action.stop();

                    // remove callbacks
                    var callbacks = _pGlob.animMixerCallbacks;
                    for (var j = 0; j < callbacks.length; j++)
                        if (callbacks[j][0] == action) {
                            callbacks.splice(j, 1);
                            j--
                        }

                    break;
                case "PAUSE":
                    action.paused = true;
                    break;
                case "RESUME":
                    action.paused = false;
                    break;
                case "SET_FRAME":
                    var frameRate = getSceneAnimFrameRate(scene);
                    action.time = from ? from/frameRate : 0;
                    action.play();
                    action.paused = true;
                    break;
                }
            }
        }



    // utility function envoked by almost all V3D-specific blocks
    // process object input, which can be either single obj or array of objects, or a group
    function retrieveObjectNames(objNames) {
        var acc = [];
        retrieveObjectNamesAcc(objNames, acc);
        return acc;
    }

    function retrieveObjectNamesAcc(currObjNames, acc) {
        if (typeof currObjNames == "string") {
            acc.push(currObjNames);
        } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
            var newObj = getObjectNamesByGroupName(currObjNames[1]);
            for (var i = 0; i < newObj.length; i++)
                acc.push(newObj[i]);
        } else if (Array.isArray(currObjNames) && currObjNames[0] == "ALL_OBJECTS") {
            var newObj = getAllObjectNames();
            for (var i = 0; i < newObj.length; i++)
                acc.push(newObj[i]);
        } else if (Array.isArray(currObjNames)) {
            for (var i = 0; i < currObjNames.length; i++)
                retrieveObjectNamesAcc(currObjNames[i], acc);
        }
    }



// utility function envoked by almost all V3D-specific blocks
// find first occurence of the object by its name
var objCache = {};
function getObjectByName(objName) {
    var objFound;
    objFound = objCache[objName];
    if (objFound && objFound.name == objName)
        return objFound;
    appInstance.scene.traverse(function(obj) {
        if (!objFound && notIgnoredObj(obj) && (obj.name == objName)) {
            objFound = obj;
            objCache[objName] = objFound;
        }
    });
    return objFound;
}



// utility function envoked by almost all V3D-specific blocks
// retrieve all objects which belong to the group
function getObjectNamesByGroupName(targetGroupName) {
    var objNameList = [];
    appInstance.scene.traverse(function(obj){
        if (notIgnoredObj(obj)) {
            var groupNames = obj.groupNames;
            if (!groupNames)
                return;
            for (var i = 0; i < groupNames.length; i++) {
                var groupName = groupNames[i];
                if (groupName == targetGroupName) {
                    objNameList.push(obj.name);
                }
            }
        }
    });
    return objNameList;
}



// utility function envoked by almost all V3D-specific blocks
// filter off some non-mesh types
function notIgnoredObj(obj) {
    return (obj.type != "Scene" && obj.type != "AmbientLight" &&
            obj.name != "" && !(obj.isMesh && obj.isMaterialGeneratedMesh));
}


// utility function envoked by almost all V3D-specific blocks
// retrieve all objects on the scene
function getAllObjectNames() {
    var objNameList = [];
    appInstance.scene.traverse(function(obj) {
        if (notIgnoredObj(obj))
            objNameList.push(obj.name)
    });
    return objNameList;
}

function swizzleValueSign(newAxis, value) {
    newAxis = newAxis.toLowerCase();

    if (newAxis == 'z') {
        if (typeof value == 'number')
            return -value
        else if (typeof value == 'string' && value != '' && value != "''" && value != '""')
            return String(-Number(value));
        else
            return value;
    } else
        return value;
}

function swizzleVec3(vec) {

    var dest = []

    dest[0] = vec[0];
    dest[1] = vec[2];
    dest[2] = swizzleValueSign('z', vec[1])

    return dest;
}




        // show and hide blocks
        function changeVis(objNames, bool) {
            objNames = retrieveObjectNames(objNames);
            if (!objNames)
                return;
            for (var i = 0; i < objNames.length; i++) {
                var objName = objNames[i]
                if (!objName)
                    continue;
                var obj = getObjectByName(objName);
                if (!obj)
                    continue;
                obj.visible = bool;
            }
        }



    // utility function used by the whenClicked, whenHovered and whenDraggedOver blocks
    function initObjectPicking(callback, eventType, mouseDownUseTouchStart) {

        var elem = appInstance.renderer.domElement;
        elem.addEventListener(eventType, pickListener);
        if (eventType == "mousedown") {
            var touchEventName = mouseDownUseTouchStart ? "touchstart" : "touchend";
            elem.addEventListener(touchEventName, pickListener);
        }

        var raycaster = new v3d.Raycaster();
        var coords = new v3d.Vector2();
        function pickListener(event) {
            event.preventDefault();

            var xNorm = 0, yNorm = 0;
            if (event instanceof MouseEvent) {
                xNorm = event.offsetX / elem.clientWidth;
                yNorm = event.offsetY / elem.clientHeight;
            } else if (event instanceof TouchEvent) {
                var rect = elem.getBoundingClientRect();
                xNorm = (event.changedTouches[0].clientX - rect.left) / rect.width;
                yNorm = (event.changedTouches[0].clientY - rect.top) / rect.height;
            }

            coords.x = xNorm * 2 - 1;
            coords.y = -yNorm * 2 + 1;
            raycaster.setFromCamera(coords, appInstance.camera);
            var objList = [];
            appInstance.scene.traverse(function(obj){objList.push(obj);});
            var intersects = raycaster.intersectObjects(objList);
            if (intersects.length > 0) {
                var obj = intersects[0].object;
                callback(obj, event);
            } else {
                callback(null, event);
            }
        }
    }

    // utility function used by the whenDraggedOver blocks
    function fireObjectPickingCallbacks(objName, source, index, cbParam) {
        for (var i = 0; i < source.length; i++) {
            var cb = source[i];
            if (objectsIncludeObj([cb[0]], objName)) {
                cb[index](cbParam);
            }
        }
    }

    function objectsIncludeObj(objNames, testedObjName) {
        if (!testedObjName) return false;

        for (var i = 0; i < objNames.length; i++) {
            if (testedObjName == objNames[i]) {
                return true;
            } else {
                // also check children which are auto-generated for multi-material objects
                var obj = getObjectByName(objNames[i]);
                if (obj && obj.type == "Group") {
                    for (var j = 0; j < obj.children.length; j++) {
                        if (testedObjName == obj.children[j].name) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    // utility function used by the whenClicked, whenHovered and whenDraggedOver blocks
    function getPickedObjectName(obj) {
        // auto-generated from a multi-material object, use parent name instead
        if (obj.isMesh && obj.isMaterialGeneratedMesh && obj.parent) {
            return obj.parent.name;
        } else {
            return obj.name;
        }
    }



        // whenClicked block
        initObjectPicking(function(obj) {

            // save the object for the pickedObject block
            _pGlob.pickedObject = obj ? getPickedObjectName(obj) : '';

            _pGlob.objClickCallbacks.forEach(function(el) {
                var isPicked = obj && objectsIncludeObj(el.objNames, getPickedObjectName(obj));
                el.callbacks[isPicked ? 0 : 1]();
            });
        }, 'mousedown');



        // whenClicked block
        function registerOnClick(objNames, cbDo, cbIfMissedDo) {
            objNames = retrieveObjectNames(objNames) || [];
            var objNamesFiltered = objNames.filter(function(name) {
                return name;
            });
            _pGlob.objClickCallbacks.push({
                objNames: objNamesFiltered,
                callbacks: [cbDo, cbIfMissedDo]
            });
        }



        // assignMaterial block
        function assignMat(objNames, matName) {
            objNames = retrieveObjectNames(objNames);
            if (!objNames || !matName)
                return;
            var mat = v3d.SceneUtils.getMaterialByName(appInstance, matName);
            if (!mat)
                return;
            for (var i = 0; i < objNames.length; i++) {
                var objName = objNames[i];
                if (!objName)
                    continue;
                var obj = getObjectByName(objName);
                if (obj)
                    obj.material = mat;
            }
        }



        // tweenCamera block
        function tweenCamera(posObjName, targetObjName, duration) {
            if (!targetObjName)
                return;
            if (posObjName)
                var posObj = getObjectByName(posObjName);
            else
                var posObj = appInstance.camera;
            var targetObj = getObjectByName(targetObjName);
            if (!posObj || !targetObj)
                return;
            if (appInstance.controls && appInstance.controls.tween) { // orbit camera
                if (!appInstance.controls.inTween)
                    appInstance.controls.tween(posObj.position, targetObj.position, duration);
            } else { // TODO flying and static camera, just position it for now
                appInstance.camera.position.copy(posObj.position);
                appInstance.camera.lookAt(targetObj.position);
            }
        }

operateAnimation("STOP", ["jiantou001", "jiantou02", "jiantou03", "jiantou04", "jiantou05", "jiantou06", "biaoxian01", "biaoxian02", "biaoxian03", "biaoxian04", "biaoxian05", "biaoxian06", "A860", "A910", "A960", "B810", "B860", "B910", "C710", "C760", "C810"], null, null, 'AUTO', 1, function() {});
changeVis(["Renwu", "ZI155_163", "ZI164_171", "ZI172_179"], false);

registerOnClick("XL670", function() {
  operateAnimation("PLAY", ["jiantou001", "jiantou02", "jiantou03", "jiantou04", "jiantou05", "jiantou06", "biaoxian01", "biaoxian02", "biaoxian03", "biaoxian04", "biaoxian05", "biaoxian06", "A860", "B810", "C710"], null, null, 'LoopOnce', 1, function() {});
  changeVis(["Renwu", "ZI155_163", "A860", "B810", "C710"], true);
  changeVis(["ZI164_171", "ZI172_179", "A910", "A960", "B860", "B910", "C760", "C810"], false);
}, function() {});

registerOnClick("XL720", function() {
  operateAnimation("PLAY", ["jiantou001", "jiantou02", "jiantou03", "jiantou04", "jiantou05", "jiantou06", "biaoxian01", "biaoxian02", "biaoxian03", "biaoxian04", "biaoxian05", "biaoxian06", "A910", "B860", "C760"], null, null, 'LoopOnce', 1, function() {});
  changeVis(["Renwu", "ZI164_171", "A910", "B860", "C760"], true);
  changeVis(["ZI155_163", "ZI172_179", "A860", "A960", "B810", "B910", "C710", "C810"], false);
}, function() {});

registerOnClick("XL770", function() {
  operateAnimation("PLAY", ["jiantou001", "jiantou02", "jiantou03", "jiantou04", "jiantou05", "jiantou06", "biaoxian01", "biaoxian02", "biaoxian03", "biaoxian04", "biaoxian05", "biaoxian06", "A960", "B910", "C810"], null, null, 'LoopOnce', 1, function() {});
  changeVis(["Renwu", "ZI172_179", "A960", "B910", "C810"], true);
  changeVis(["ZI155_163", "ZI164_171", "A860", "A910", "B810", "B860", "C710", "C760"], false);
}, function() {});

operateAnimation("STOP", "YX", null, null, 'AUTO', 1, function() {});
operateAnimation("STOP", "GuiMen_G", null, null, 'AUTO', 1, function() {});
operateAnimation("STOP", "CT", null, null, 'AUTO', 1, function() {});
operateAnimation("STOP", "LaSuan", null, null, 'AUTO', 1, function() {});

registerOnClick("DKYX", function() {
  operateAnimation("PLAY", "YX", null, null, 'LoopOnce', 1, function() {});
}, function() {});

chouti_animation = 0;

guizi_animation = 0;

registerOnClick("DKCT", function() {
  if (guizi_animation == 0) {
    operateAnimation("PLAY", "CT", null, null, 'LoopOnce', 1, function() {});
    chouti_animation = 1;
  } else if (guizi_animation == 1) {
  operateAnimation("PLAY", "CT", null, null, 'LoopOnce', 1, function() {});
    operateAnimation("PLAY", "GuiMen_G", 0, 75, 'AUTO', -1, function() {
      guizi_animation = 0;
    });
    chouti_animation = 1;
  }
}, function() {});

registerOnClick("DKGZ", function() {

  if (chouti_animation == 0) {
    operateAnimation("PLAY", "GuiMen_G", null, null, 'LoopOnce', 1, function() {});
    operateAnimation("PLAY", "LaSuan", null, null, 'LoopOnce', 1, function() {});
    guizi_animation = 1;
  }
  else if (chouti_animation == 1) {
      operateAnimation("PLAY", "GuiMen_G", null, null, 'LoopOnce', 1, function() {});
      operateAnimation("PLAY", "LaSuan", null, null, 'LoopOnce', 1, function() {});
        operateAnimation("PLAY", "CT", 0, 50, 'AUTO', -1, function() {
          chouti_animation = 0;
        });
        guizi_animation = 1;
  }

}, function() {});

registerOnClick("HXD_k", function() {
  assignMat("HXD", "HXD_on");
}, function() {});

registerOnClick("HXD_g", function() {
  assignMat("HXD", "HXD_off");
}, function() {});

registerOnClick("QRGT_k", function() {
  assignMat("TZ", "TZ_nyj_on");
  assignMat("GZ", "GZ_gtz_tex");
  assignMat("GuiMen", "GM_gtz");
}, function() {});

registerOnClick("QRGT_g", function() {
  assignMat("TZ", "TZ_nyj_off");
  assignMat("GZ", "GZ_gtz_tex");
  assignMat("GuiMen", "GM_gtz");
}, function() {});

registerOnClick("ZLYG_k", function() {
  assignMat("TZ", "TZ_yyh_on");
  assignMat("GZ", "GZ_szb_tex");
  assignMat("GuiMen", "GM_szb");
}, function() {});

registerOnClick("ZLYG_g", function() {
  assignMat("TZ", "TZ_yyh_off");
  assignMat("GZ", "GZ_szb_tex");
  assignMat("GuiMen", "GM_szb");
}, function() {});

registerOnClick("KYXG_k", function() {
  assignMat("TZ", "TZ_bsh_on");
  assignMat("GZ", "GZ_ych_tex");
  assignMat("GuiMen", "GM_ych");
}, function() {});

registerOnClick("KYXG_g", function() {
  assignMat("TZ", "TZ_bsh_off");
  assignMat("GZ", "GZ_ych_tex");
  assignMat("GuiMen", "GM_ych");
}, function() {});

registerOnClick("JT1", function() {
  tweenCamera("PhysCamera007", "PhysCamera007.Target", 1);
}, function() {});

registerOnClick("JT2", function() {
  tweenCamera("PhysCamera002", "PhysCamera002.Target", 1);
}, function() {});

registerOnClick("JT3", function() {
  tweenCamera("PhysCamera003", "PhysCamera003.Target", 1);
}, function() {});

registerOnClick("JT4", function() {
  tweenCamera("PhysCamera004", "PhysCamera004.Target", 1);
}, function() {});

registerOnClick("JT5", function() {
  tweenCamera("PhysCamera005", "PhysCamera005.Target", 1);
}, function() {});

registerOnClick("JT6", function() {
  tweenCamera("PhysCamera006", "PhysCamera006.Target", 1);
}, function() {});

v3dApp.tweenCamera = tweenCamera
v3dApp.assignMat = assignMat
v3dApp.operateAnimation = operateAnimation
v3dApp.changeVis = changeVis

}
if (window.v3dApp) {
    // backwards compatibility for old player projects
    PL.legacyMode = true;
    PL.init(window.v3dApp);
}

})();

/* ================== end of code ================== */
