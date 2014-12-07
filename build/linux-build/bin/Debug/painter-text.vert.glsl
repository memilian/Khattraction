#version 140 
in vec3 vertexPosition;
in vec2 texPosition;
in vec4 vertexColor;
uniform mat4 projectionMatrix;
out vec2 texCoord;
out vec4 fragmentColor;
void kore(){
(gl_Position = (projectionMatrix * vec4(vertexPosition, 1.0)));
(texCoord = texPosition);
(fragmentColor = vertexColor);
}
void main(){
kore();
}
