function loco(){
    gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,

  // for tablet smooth
  tablet: { smooth: true },

  // for mobile
  smartphone: { smooth: true }
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  // follwoing line is not required to work pinning on touch screen

  /* pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed"*/
});

// --- RED PANEL ---
gsap.from(".line-1", {
  scrollTrigger: {
    trigger: ".line-1",
    scroller: "#main",
    scrub: true,
    start: "top bottom",
    end: "top top"
  },
  scaleX: 0,
  transformOrigin: "left center",
  ease: "none"
});

// --- ORANGE PANEL ---
gsap.from(".line-2", {
  scrollTrigger: {
    trigger: ".orange",
    scroller: "#main",
    scrub: true,
    pin: true,
    start: "top top",
    end: "+=100%"
  },
  scaleX: 0,
  transformOrigin: "left center",
  ease: "none"
});

// --- PURPLE/GREEN PANEL ---
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".purple",
    scroller: "#main",
    scrub: true,
    pin: true,
    start: "top top",
    end: "+=100%"
  }
});

tl.from(".purple p", { scale: 0.3, rotation: 45, autoAlpha: 0, ease: "power2" })
  .from(
    ".line-3",
    { scaleX: 0, transformOrigin: "left center", ease: "none" },
    0
  )
  .to(".purple", { backgroundColor: "#28a92b" }, 0);

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();
}

loco()


var clutter = "";

document.querySelector("#page2>h1").textContent.split("").forEach(function(dets){
    clutter += `<span>${dets}</span>`

    document.querySelector("#page2>h1").innerHTML = clutter;
})


gsap.to("#page2>h1>span",{
    scrollTrigger:{
        trigger:`#page2>h1>span`,
        start:`top bottom`,
        end:`bottom top`,
        scroller:`#main`,
        scrub:.5,
    },
    stagger:0.2,
    color:`#fff`
})


function canvas(){
const canvas = document.querySelector("#page3>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = `
  Images_Font/frames00007.webp
  Images_Font/frames00010.webp
  Images_Font/frames00013.webp
  Images_Font/frames00016.webp
  Images_Font/frames00019.webp
  Images_Font/frames00022.webp
  Images_Font/frames00025.webp
  Images_Font/frames00028.webp
  Images_Font/frames00031.webp
  Images_Font/frames00034.webp
  Images_Font/frames00037.webp
  Images_Font/frames00040.webp
  Images_Font/frames00043.webp
  Images_Font/frames00046.webp
  Images_Font/frames00049.webp
  Images_Font/frames00052.webp
  Images_Font/frames00055.webp
  Images_Font/frames00058.webp
  Images_Font/frames00061.webp
  Images_Font/frames00064.webp
  Images_Font/frames00067.webp
  Images_Font/frames00070.webp
  Images_Font/frames00073.webp
  Images_Font/frames00076.webp
  Images_Font/frames00079.webp
  Images_Font/frames00082.webp
  Images_Font/frames00085.webp
  Images_Font/frames00088.webp
  Images_Font/frames00091.webp
  Images_Font/frames00094.webp
  Images_Font/frames00097.webp
  Images_Font/frames00100.webp
  Images_Font/frames00103.webp
  Images_Font/frames00106.webp
  Images_Font/frames00109.webp
  Images_Font/frames00112.webp
  Images_Font/frames00115.webp
  Images_Font/frames00118.webp
  Images_Font/frames00121.webp
  Images_Font/frames00124.webp
  Images_Font/frames00127.webp
  Images_Font/frames00130.webp
  Images_Font/frames00133.webp
  Images_Font/frames00136.webp
  Images_Font/frames00139.webp
  Images_Font/frames00142.webp
  Images_Font/frames00145.webp
  Images_Font/frames00148.webp
  Images_Font/frames00151.webp
  Images_Font/frames00154.webp
  Images_Font/frames00157.webp
  Images_Font/frames00160.webp
  Images_Font/frames00163.webp
  Images_Font/frames00166.webp
  Images_Font/frames00169.webp
  Images_Font/frames00172.webp
  Images_Font/frames00175.webp
  Images_Font/frames00178.webp
  Images_Font/frames00181.webp
  Images_Font/frames00184.webp
  Images_Font/frames00187.webp
  Images_Font/frames00190.webp
  Images_Font/frames00193.webp
  Images_Font/frames00196.webp
  Images_Font/frames00199.webp
  Images_Font/frames00202.webp
 `;
  return data.split("\n")[index];
}

const frameCount = 67;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: .5,
    trigger: `#page3`,
    start: `top top`,
    end: `250% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({

  trigger: "#page3",
  pin: true,
  scroller: `#main`,
  start: `top top`,
  end: `250% top`,
});
}
canvas()

var clutter = "";

document.querySelector("#page4>h1").textContent.split("").forEach(function(dets){
    clutter += `<span>${dets}</span>`

    document.querySelector("#page4>h1").innerHTML = clutter;
})


gsap.to("#page4>h1>span",{
    scrollTrigger:{
        trigger:`#page4>h1>span`,
        start:`top bottom`,
        end:`bottom top`,
        scroller:`#main`,
        scrub:.5,
    },
    stagger:0.2,
    color:`#fff`
})



function canvas1(){
  const canvas = document.querySelector("#page5>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render();
});

function files(index) {
var data = `
Images_Font/bridges00004.webp
Images_Font/bridges00007.webp
Images_Font/bridges00010.webp
Images_Font/bridges00013.webp
Images_Font/bridges00016.webp
Images_Font/bridges00019.webp
Images_Font/bridges00022.webp
Images_Font/bridges00025.webp
Images_Font/bridges00028.webp
Images_Font/bridges00031.webp
Images_Font/bridges00034.webp
Images_Font/bridges00037.webp
Images_Font/bridges00040.webp
Images_Font/bridges00043.webp
Images_Font/bridges00046.webp
Images_Font/bridges00049.webp
Images_Font/bridges00052.webp
Images_Font/bridges00055.webp
Images_Font/bridges00058.webp
Images_Font/bridges00061.webp
Images_Font/bridges00064.webp
Images_Font/bridges00067.webp
Images_Font/bridges00070.webp
Images_Font/bridges00073.webp
Images_Font/bridges00076.webp
Images_Font/bridges00079.webp
Images_Font/bridges00082.webp
Images_Font/bridges00085.webp
Images_Font/bridges00088.webp
Images_Font/bridges00091.webp
Images_Font/bridges00094.webp
Images_Font/bridges00097.webp
Images_Font/bridges00100.webp
Images_Font/bridges00103.webp
Images_Font/bridges00106.webp
Images_Font/bridges00109.webp
Images_Font/bridges00112.webp
Images_Font/bridges00115.webp
Images_Font/bridges00118.webp
Images_Font/bridges00121.webp
Images_Font/bridges00124.webp
Images_Font/bridges00127.webp
Images_Font/bridges00130.webp
Images_Font/bridges00133.webp
Images_Font/bridges00136.webp
Images_Font/bridges00139.webp
Images_Font/bridges00142.webp
Images_Font/bridges00145.webp
Images_Font/bridges00148.webp
Images_Font/bridges00151.webp
Images_Font/bridges00154.webp
Images_Font/bridges00157.webp
Images_Font/bridges00160.webp
Images_Font/bridges00163.webp
Images_Font/bridges00166.webp
Images_Font/bridges00169.webp
Images_Font/bridges00172.webp
Images_Font/bridges00175.webp
Images_Font/bridges00178.webp
Images_Font/bridges00181.webp
Images_Font/bridges00184.webp
Images_Font/bridges00187.webp
Images_Font/bridges00190.webp
Images_Font/bridges00193.webp
Images_Font/bridges00196.webp
Images_Font/bridges00199.webp
Images_Font/bridges00202.webp
`;
return data.split("\n")[index];
}

const frameCount = 67;

const images = [];
const imageSeq = {
frame: 1,
};

for (let i = 0; i < frameCount; i++) {
const img = new Image();
img.src = files(i);
images.push(img);
}

gsap.to(imageSeq, {
frame: frameCount - 1,
snap: "frame",
ease: `none`,
scrollTrigger: {
  scrub: .5,
  trigger: `#page5`,
  start: `top top`,
  end: `250% top`,
  scroller: `#main`,
},
onUpdate: render,
});

images[1].onload = render;

function render() {
scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}
ScrollTrigger.create({

trigger: "#page5",
pin: true,
scroller: `#main`,
start: `top top`,
end: `250% top`,
});
}
canvas1()

var clutter = "";

document.querySelector("#page6>h1").textContent.split("").forEach(function(dets){
    clutter += `<span>${dets}</span>`

    document.querySelector("#page6>h1").innerHTML = clutter;
})


gsap.to("#page6>h1>span",{
    scrollTrigger:{
        trigger:`#page6>h1>span`,
        start:`top bottom`,
        end:`bottom top`,
        scroller:`#main`,
        scrub:.5,
    },
    stagger:0.2,
    color:`#fff`
})
