let paintSubClass = (function(){
    let m = new WeakMap();
    let privateMembers = {
      /**brief: returns currrent window limits
       * return: {w,h}
       */
      getWindowLimits: function () {
       
        return {w:window.innerWidth, h:window.innerHeight};
      },
      setCanvasLimits: function (windowLim={w:100,h:100}, lim, canvasId) {
        /*assign limit*/
        lim.w = windowLim.w;
        /*in according to Fibonaci nuimbers*/
        lim.h = lim.w * 0.66;
        /*assignto the canvas*/
        let canv = document.getElementById(canvasId);
        if (canv) {
           canv.width = lim.w;
           canv.height = lim.h;   
           console.log('Canvas has setted '+ canv.width + ':' + canv.height);
        }
      },

      paintIemOnCanvas (maximumArg, parToShow, color="blue", startX, width, limits) {
        /*get a 2d context*/
        let cnv = document.getElementById("canvas001");
        let ctx = cnv.getContext("2d");
        ctx.fillStyle = color; 
        let stepY = limits.h * 0.1;
        let stepX =  limits.w * 0.1;
        let rectY, rectH;
        let maxLen = stepY * 8;
        rectH = (maxLen / maximumArg) * parToShow;
         /*start point*/
         rectY = (maxLen - rectH) + (stepY * 1);
         ctx.fillRect(startX,rectY,width,rectH);
      },

      /***private***variables ***/
       limits: {},//limits of current canvas
       count: 0, //max count of items on the diagram
       maxArg: 0,
    }

    class paintSubClass {
      constructor () {
        /*bind to this to make a private members*/
          m.set(this,privateMembers);
          privateMembers.setCanvasLimits(privateMembers.getWindowLimits(), privateMembers.limits,"canvas001");
      }
       updateLimits () {
          let priv = m.get(this);
          priv.setCanvasLimits(privateMembers.getWindowLimits(), privateMembers.limits,"canvas001");
       }

      paintScale (color="black",y=100) {
        let privMemb = m.get(this);
        privMemb.maxArg = y;
        let numberStep = y / 4;
        /*get a 2d context*/
        let cnv = document.getElementById("canvas001");
        let ctx = cnv.getContext("2d");
        ctx.font =  `${Math.round((privMemb.limits.h * 0.05)+2).toString()}px Arial, serif`;
        ctx.strokeStyle = color;
        ctx.strokeWidth = 2;
        ctx.fillStyle = color; 
        /*calculating a rate = y to real width*/
        /*dividing Y size on 10 pieces */
        let stepY = privMemb.limits.h * 0.1;
        let stepX =  privMemb.limits.w * 0.1;
        /*@ ZERO in according to a Canvas API - UPPER LEFT point on a canvasNode*/ 
        ctx.beginPath();
        ctx.moveTo(stepX, (stepY * 9));
        /*a horizontal line*/
        ctx.lineTo((stepX * 8), (stepY * 9));
        ctx.stroke();
        /*paint an horizontal arrow*/
        ctx.beginPath();
        ctx.moveTo((stepX * 8), (stepY * 9));
        ctx.lineTo((stepX * 7.8), (stepY * 8.9));
        ctx.lineTo((stepX * 7.8), (stepY * 9.1));
     
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        /*move to zero*/
        ctx.beginPath();
        ctx.moveTo (stepX, (stepY * 9));
        /*a vertical line*/
        ctx.lineTo (stepX,stepY * 0.9); 
        ctx.stroke ();    
        /*paint an verticall  arrow*/
        ctx.beginPath();
        ctx.moveTo(stepX, stepY * 0.5 );
        ctx.lineTo((stepX * 0.92), (stepY * 0.9));
        ctx.lineTo((stepX * 1.08), (stepY * 0.9));
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        /*paint a mark lines */
        let scaleStep = (stepY * 8) / 4;
        ctx.beginPath();
        ctx.moveTo(stepX,  stepY);//to zero
        ctx.lineTo((stepX * 0.8),  stepY);
        ctx.moveTo(stepX, ((scaleStep * 1) + stepY));//the first line-marker
        ctx.lineTo((stepX * 0.9), (scaleStep * 1) + stepY);
        ctx.moveTo(stepX, (scaleStep * 2) + stepY);//the first line-marker
        ctx.lineTo((stepX * 0.9), (scaleStep * 2) + stepY);
        ctx.moveTo(stepX, (scaleStep * 3) + stepY);//the thrid line-marker
        ctx.lineTo((stepX * 0.9), (scaleStep * 3) + stepY);
        ctx.moveTo(stepX, (scaleStep * 4) + stepY);//the forth line-marker
        ctx.lineTo((stepX * 0.9), (scaleStep * 4) + stepY);
        ctx.moveTo(stepX, (scaleStep * 5) + stepY);//the forth line-marker
        ctx.lineTo((stepX * 0.9), (scaleStep * 5) + stepY);
        
        /*paint a numbers*/
        
        ctx.fillText(Math.round(numberStep * 1), (stepX * 0.2), (scaleStep * 3) + stepY, stepY);
        ctx.fillText(Math.round(numberStep * 2), (stepX * 0.2), (scaleStep * 2) + stepY, stepY);
        ctx.fillText(Math.round(numberStep * 3), (stepX * 0.2),   (scaleStep * 1) + stepY, stepY);
        ctx.fillText(Math.round(numberStep * 4), (stepX * 0.2),   stepY, stepY);
      
        ctx.stroke();
      }

      clearCanvas () {
        let secret = m.get(this);
        let cnv = document.getElementById("canvas001");
        let ctx = cnv.getContext("2d");
        ctx.clearRect(0, 0, secret.limits.w, secret.limits.h);
      }

      paintDiagramData (data) {
        let dataIter, colorIter;
        let lengthOfY;
        let privMem = m.get(this);
          /*set count*/
        privMem.count = data.length;
          if(data.length > 7){
            return;
          }
           /*calculating a rate = y to real width*/
        /*dividing Y size on 10 pieces */
        let stepY = privMem.limits.h * 0.1;
        let stepX =  privMem.limits.w * 0.1;
        /*a count of pixels per one item*/
        let itemStepX = (stepX * 8) / data.length;
        let cnv = document.getElementById("canvas001");
        let ctx = cnv.getContext("2d");
        /*color set*/
        let colorSet = new Set();
        colorSet.add("black");
        colorSet.add("red");
        colorSet.add("orange");
        colorSet.add("yellow");
        colorSet.add("green");
        colorSet.add("blue");
        colorSet.add("indigo");
        colorSet.add("violet");
        dataIter = data[Symbol.iterator]();
        colorIter = colorSet.entries();
        let resultData = dataIter.next();
           /*get a color*/
        let resultColor = colorIter.next();
        let offset = stepX;
        while (!resultData.done) {
            /*paint a fill rect with Y data*/
          privMem.paintIemOnCanvas (100, resultData.value, resultColor.value[0], offset, stepX * 0.5, privMem.limits);
          offset += stepX*0.5;
          resultData = dataIter.next();   
          resultColor = colorIter.next();
        }
      }

      test () {
        let privMem = m.get(this);
        privMem.paintIemOnCanvas(100,100,"blue",60, 15, privMem.limits);
      }

    }
 return paintSubClass;
})();

window.onload = ()=>{
  let q = new paintSubClass();
  q.paintScale("blue",100);
 // q.test();
 q.paintDiagramData([10,15,20,25,30,35,50]);

 window.addEventListener("resize",()=>{
   let a = (Math.random()*60)+10;
   let b = (Math.random()*60)+10;
   let c = (Math.random()*60)+10;
   let d = (Math.random()*60)+10;
   let e = (Math.random()*60)+10;
   let f = (Math.random()*60)+10;
  q.updateLimits();  
  q.clearCanvas();
  q.paintScale('blue',100);
  q.paintDiagramData([a,b,c,d,e,f]);
 });

}