#version 140 
out vec4 kore_FragColor;
in vec4 fragmentColor;
void kore(){
(kore_FragColor = fragmentColor);
}
void main(){
kore();
}
