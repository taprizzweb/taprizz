"use client";
import { useEffect, useRef } from "react";

const VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
const FRAG = `precision highp float;
uniform vec2 r; uniform float t; uniform vec2 m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 p=(gl_FragCoord.xy-.5*r)/r.y;
  vec2 mm=(m-.5)*vec2(r.x/r.y,1.);
  float tt=t*.1;
  vec2 q=vec2(fbm(p*1.5+tt),fbm(p*1.5+vec2(5.2,1.3)-tt));
  float f=fbm(p*1.3+3.2*q+vec2(tt*1.4,-tt));
  float band=abs(fract(f*7.5+tt*1.5)-.5);
  float line=1.-smoothstep(0.,.045,band);
  float glow=exp(-length(p-mm)*2.2);
  float vig=smoothstep(1.25,.2,length(p*vec2(.8,1.)));
  vec3 lime=vec3(.71,1.,.18);
  vec3 col=lime*line*(.14+.95*glow)*vig + lime*.035*f*vig + vec3(.01,.02,0.)*glow;
  gl_FragColor=vec4(col,1.);
}`;

// Raw WebGL fragment-shader background (no libs). Pauses off-screen; static frame under reduced-motion.
export function ShaderBg({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const gl = cv.getContext("webgl", { antialias: false, powerPreference: "low-power" });
    if (!gl) return;
    const mk = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, mk(gl.VERTEX_SHADER, VERT));
    gl.attachShader(pr, mk(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pr, "r"), uT = gl.getUniformLocation(pr, "t"), uM = gl.getUniformLocation(pr, "m");

    const scale = 0.6;
    const resize = () => {
      cv.width = Math.max(2, Math.floor(cv.clientWidth * scale));
      cv.height = Math.max(2, Math.floor(cv.clientHeight * scale));
      gl.viewport(0, 0, cv.width, cv.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0.7, y: 0.5, tx: 0.7, ty: 0.5 };
    const onMove = (e: MouseEvent) => {
      const b = cv.getBoundingClientRect();
      mouse.tx = (e.clientX - b.left) / b.width;
      mouse.ty = 1 - (e.clientY - b.top) / b.height;
    };
    window.addEventListener("mousemove", onMove);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true, raf = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(cv);
    const start = performance.now();
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      gl.uniform2f(uR, cv.width, cv.height);
      gl.uniform1f(uT, reduce ? 12 : (performance.now() - start) / 1000);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (reduce) cancelAnimationFrame(raf);
    };
    draw();
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); };
  }, []);
  return <canvas ref={ref} aria-hidden className={`absolute inset-0 h-full w-full ${className}`} />;
}
