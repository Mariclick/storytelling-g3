import OpenAI from 'openai';
import miModelo from '../models/users.js';

// Configurar tu clave de API
const apiKey = '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'; 

// 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 clave Andre


// Crear una instancia de OpenAIApi con tu clave API
const openaiInstance = new OpenAI({ apiKey });

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
    
    1. Nombre del storytelling o nombre de la campaña transmedia (por ejemplo, "El legado del príncipe Heredero"): {nombre}
       
    2. Enlace de tu empresa:{enlace}
    
    3. Nombre de la empresa o emprendimiento: {empresa} 
    
    4. Misión de la empresa o emprendimiento: {mision}
    
    5. Género del protagonista que representa tu marca: {genero}
    
    6. Nombre del protagonista: {protagonista}
    
    7. Objetivo del protagonista (por ejemplo, "Encontrar a la princesa"):{objetivo}
    
    8. Sentimiento de motivación del protagonista (por ejemplo, amor, odio, esperanza, alegría, venganza, etc.): {motivation}
    
    9. El antagonista, es decir, quien impide al protagonista cumplir con su objetivo (por ejemplo, un villano, un obstáculo, un miedo, una duda, etc.): {malo}
    
    10. El ayudante del protagonista (por ejemplo, un amigo, un familiar, un objeto mágico, etc.):{ayudante}
    
    11. La actitud que tiene el ayudante (por ejemplo, loco, sabio, divertido, etc.): {actitud}
    
    12. El mensaje que se debe transmitir dentro de la historia creada (por ejemplo, enfrentar desafíos o pruebas, resolver conflictos, etc.):{mensaje}
    
    13. El tono comunicativo de la marca representada es: Rebeldía, obstinación y oposición
    intención de demostrar que la marca representada en el storytelling tiene un posicionamiento de qué:
    Es irreverente y puedes hacer lo que quieres:{comportamiento}
    
    El Storytelling debe tener sólo 750 caracteres.
    Se creativo y coherente con el desarrollo del storytelling, considera el arquetipo como elemento principal del comportamiento del protagonista, no lo debes mencionar el arquetipo,
    los elementos del usuario deben incorporarse de forma implicita en la historias que creas.
    Limitate a solo crear la historia y no hagas una reflexión de la historia.
    Utiliza como base para la redacción la siguiente información: ${historyId}\n${JSON.stringify(data)}`; // Tu mensaje de usuario aquí

    const chatCompletion = await openaiInstance.chat.completions.create({
      messages: [{ role: 'user', content: mensajeUsuario }],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      // max_tokens: 750 ???
    });

    const responseOpenAI = chatCompletion.choices[0].message.content;

    const updateData = await miModelo.findByIdAndUpdate(historyId, { responseAI: responseOpenAI }, { new: true });

    console.log('Respuesta de OpenAI guardada en la base de datos:', updateData);

    return response.status(200).json({ message: 'Respuesta guardada en la base de datos' });
  } catch (error) {
    console.error('Error en la operación:', error);
    return response.status(500).json({ message: `Error en la operación: ${error.message}` });
  }
}

export default responseOpenApiAI;