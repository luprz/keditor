(function() {
  keditor = {
    data: {},
    // Iniciar la lbreria
    init: function(data={el: 'html'}) {
      this.data = data;
      createAreas();
      createCanvas(data);
      var container = findEl(data.el);
      // container.setAttribute("data-highlightable", "1");
      // highlightableActions(container);
      highlightable(container);
    },

  } 

  var sections = ['keppler-header', 'keppler-view', 'keppler-footer'];
  var canvas_pos = {};

  function createCanvas(data) {
    var el = findEl(data.el);
    var nodes = el.innerHTML;
    var canvas = document.createElement("DIV")
    canvas.id = "kppl-canvas";
    canvas.innerHTML = nodes;

    el.innerHTML = "";
    canvas.setAttribute("data-highlightable", "1");
    highlightableActions(canvas);
    document.body.appendChild(canvas);
    canvas_pos = canvas.getBoundingClientRect();
  }

  /* BEGIN Highlightable */
  // Resaltar con linea dashed todos los elementos 
  function highlightable(el) {
    var canvas = "el";
    var el = el.children;
    for(var i=0; i < el.length; i++) {
      var element = el[i];
      element.setAttribute("data-highlightable", "1");
      highlightableActions(element);
      if (element.children.length > 0) {
        highlightable(element);
      }
    }
  }

  function highlightableActions(element) {
    element.addEventListener('mouseover', function() {
      highlightableBar(this);
    },false);

    element.addEventListener('mouseout', function() {
      this.classList.remove("kppl-el-hovered");
      var divTitles = findAllEls(".kppl-div-title");
      for(var i=0; i < divTitles.length; i++) {
        document.body.removeChild(divTitles[i]);
      }
    },false);
  }

  function highlightableBar(element) {
    console.log(canvas_pos);
    var location = element.getBoundingClientRect();
    var divTitles = findAllEls(".kppl-div-title");
    if(divTitles.length === 0) {
      element.classList.add("kppl-el-hovered");
      var nodeTitle = document.createElement("DIV");
      nodeTitle.className = "kppl-div-title";
      nodeTitle.appendChild(nodeName(element));
      if(canvas_pos.top < location.top) {
        nodeTitle.style.top = (location.top - 25) + "px";
      } else {
        nodeTitle.style.top = (location.top) + "px";
      }
      nodeTitle.style.left = location.left + "px";
      document.body.appendChild(nodeTitle);
    }
    
  }


  /* END Highlightable */

  // Convertir los sectores en div
  function createAreas() {
    for(var i=0; i < sections.length; i++) {
      $(sections[i]).replaceWith(function () {
          return $('<div/>', {
              id:  sections[i], 
              html: this.innerHTML
          });
      });
    }
  }


  /* UTILS */

  var kepplerGlosary =  ["kppl-el-hovered"]

  // funcion para buscar un elemento
  function findEl(el) {
    return document.querySelector(el);
  }

  function findAllEls(el) {
    return document.querySelectorAll(el);
  }

  function nodeName(element) {
    var classes = toArray(element.classList);
    var node = document.createElement("DIV");
    node.className = "kppl-name";
    var nodeName = element.tagName
    if (classes.length > 0) {
      nodeName = nodeName+"."+classes.join(".")
    }
    if (element.id) {
      nodeName = nodeName+"#"+element.id
    }
    nodeName = document.createTextNode(nodeName);  
    node.appendChild(nodeName);
    return node;
  }

  function toArray(obj) {
    var array = [];
    // iterate backwards ensuring that length is an UInt32
    for (var i = obj.length >>> 0; i--;) { 
      if(!kepplerGlosary.includes(obj[i])) {
        array[i] = obj[i];
      }
    }
    return array;
  }

})();