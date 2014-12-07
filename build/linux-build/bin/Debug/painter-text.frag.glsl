#version 140 
out vec4 kore_FragColor;
uniform sampler2D tex;
in vec2 texCoord;
in vec4 fragmentColor;
void kore(){
(kore_FragColor = vec4(fragmentColor.xyz, (texture(tex, texCoord).x * fragmentColor.w)));
}
void main(){
kore();
}
