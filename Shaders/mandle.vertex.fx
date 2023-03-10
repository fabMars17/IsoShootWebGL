#ifdef GL_ES
precision highp float;
#endif

uniform vec3 CameraPos;
uniform mat4 ModelWorld4x4;
varying vec3 normal;
varying vec3 E;

mat3 GetLinearPart( mat4 m )
{
  mat3 result;
  
  result[0][0] = m[0][0]; 
  result[0][1] = m[0][1]; 
  result[0][2] = m[0][2]; 

  result[1][0] = m[1][0]; 
  result[1][1] = m[1][1]; 
  result[1][2] = m[1][2]; 
  
  result[2][0] = m[2][0]; 
  result[2][1] = m[2][1]; 
  result[2][2] = m[2][2]; 
  
  return result;
}		

void main(void)
{
    // output position
  gl_Position = ftransform();
  
  // Texture coordinates for glossMap. 
  gl_TexCoord[0] = gl_MultiTexCoord0;
  
  mat3 ModelWorld3x3 = GetLinearPart( ModelWorld4x4 );
  
  // find world space position.
  vec4 WorldPos = ModelWorld4x4 *  gl_Vertex;	
  
  // find world space normal.
  normal = ModelWorld3x3 * gl_Normal; 
  
  // find world space eye vector.
  E = WorldPos.xyz - CameraPos.xyz;	
}