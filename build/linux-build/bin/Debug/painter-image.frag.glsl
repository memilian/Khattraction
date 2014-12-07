#version 140 
out vec4 kore_FragColor;
uniform sampler2D tex;
in vec2 texCoord;
in vec4 color;
void kore(){
vec4 texcolor = (texture(tex, texCoord) * color);
(texcolor.xyz *= color.w);
(kore_FragColor = texcolor);
}
void main(){
kore();
}
