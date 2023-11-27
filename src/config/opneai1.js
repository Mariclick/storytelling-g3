import * as openai from 'openai';
import { oPENai } from './index.js';
import  miModelo from '../models/users.js'; // hay q llamar a schema;

// api jordannnnn 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
// api mothersip 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

// Configurar tu clave de API
const apiKey = oPENai //'TU_API_KEY_AQUÍ';

// Crear una instancia de OpenAIApi con tu clave API
const openaiInstance = new openai.OpenAI({ apiKey })



async function responseOpenApiAI(request, response) {
  try {
    const { historyId } = request.params;

    // Buscar datos por ID
    const data = await miModelo.findById(historyId);

    // Validar si el ID no existe en la base de datos
    if (!data) {
      return response.status(404).json({ message: 'ID no encontrado en la base de datos' });
    }

    const mensajeUsuario = `Eres un escritor experto en crear historias para camapañas
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
    Se creativo y coherente con el desarrollo del storytelling, considera el arquetipo como elemento principal del comportamiento del protagonista, no lo debes mencionar el arquetipo,
    los elementos del usuario deben incorporarse de forma implicita en la historias que creas.
    Limitate a solo crear la historia y no hagas una reflexión de la historia.
    Utiliza como base para la redacción la siguiente información: ${historyId}\n${JSON.stringify(data)}`;

    // Llamar a OpenAI
    const chatCompletion = await opEnai.chat.completions.create({
      messages: [{ role: 'user', content: mensajeUsuario }],
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      // max_tokens: 1500 ???
    });

    const responseOpenAI = chatCompletion.choices[0].message.content;

    // Actualizar datos en la base de datos
    const updateData = await miModelo.findByIdAndUpdate(historyId, { responseAI: responseOpenAI }, { new: true });

    console.log('Respuesta de OpenAI guardada en la base de datos:', updateData);
    
    // Devolver respuesta exitosa
    return response.status(200).json({ message: 'Respuesta guardada en la base de datos' });
  } catch (error) {
    // Manejar errores
    console.error('Error en la operación:', error);
    return response.status(500).json({ message: `Error en la operación: ${error.message}` });
  }
}

export default responseOpenApiAI;