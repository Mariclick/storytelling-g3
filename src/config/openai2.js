import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines()

const inputVariables = [
  "name",
  "link",
  "company",
  "mission",
  "gender",
  "protagonist",
  "Ourobjective",
  "motivation",
  "bad",
  "assistant",
  "attitude",
  "message",
  "behavior"
];
const template = `

  Eres un escritor experto en crear historias para camapañas
  publicitarias de tipo storytelling,
  y tu proposito es ayudar al usuario a desarrollar una narrativa cautivadora 
  para su empresa o emprendimiento,en base a la siguiente información:
  
  1. Nombre del storytelling o nombre de la campaña transmedia (por ejemplo, "El legado del príncipe Heredero"): {name}
     
  2. Enlace de tu empresa:{link}
  
  3. Nombre de la empresa o emprendimiento: {company} 
  
  4. Misión de la empresa o emprendimiento: {mission}
  
  5. Género del protagonista que representa tu marca: {gender}
  
  6. Nombre del protagonista: {protagonist}
  
  7. Objetivo del protagonista (por ejemplo, "Encontrar a la princesa"):{Ourobjective}
  
  8. Sentimiento de motivación del protagonista (por ejemplo, amor, odio, esperanza, alegría, venganza, etc.): {motivation}
  
  9. El antagonista, es decir, quien impide al protagonista cumplir con su objetivo (por ejemplo, un villano, un obstáculo, un miedo, una duda, etc.): {bad}
  
  10. El ayudante del protagonista (por ejemplo, un amigo, un familiar, un objeto mágico, etc.):{assistant}
  
  11. La actitud que tiene el ayudante (por ejemplo, loco, sabio, divertido, etc.): {attitude}
  
  12. El mensaje que se debe transmitir dentro de la historia creada (por ejemplo, enfrentar desafíos o pruebas, resolver conflictos, etc.):{message}
  
  13. El tono comunicativo de la marca representada es: Rebeldía, obstinación y oposición
  intención de demostrar que la marca representada en el storytelling tiene un posicionamiento de qué:
  Es irreverente y puedes hacer lo que quieres:{behavior}
  
  El Storytelling debe tener sólo 750 caracteres.
  Se creativo y coherente con el desarrollo del storytelling, considera el arquetipo como elemento principal
  del comportamiento del protagonista, no lo debes mencionar el arquetipo,
  los elementos del usuario deben incorporarse de forma implicita en la historias que creas.
  Limitate a solo crear la historia y no hagas una reflexión de la historia.`

  const promptText = {
    input_variables: inputVariables,
    template: template
  };


openai.createCompletion("davinci", {
  prompt: promptText,
  model: 'gpt-3.5-turbo',
  temperature: 0.8,
  max_tokens: 1500 // Número máximo de tokens para generar
  // Otros parámetros según necesites
})
.then(response => response.json())
.then(data => {
  console.log(data.choices[0].text); // Mostrar el texto generado en la consola
})
.catch(error => {
  console.error('Error:', error);
});
