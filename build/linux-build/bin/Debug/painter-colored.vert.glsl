#version 140 
in vec3 vertexPosition;
in vec4 vertexColor;
uniform mat4 projectionMatrix;
out vec4 fragmentColor;
void kore(){
(gl_Position = (projectionMatrix * vec4(vertexPosition, 1.0)));
(fragmentColor = vertexColor);
}
void main(){
kore();
}
