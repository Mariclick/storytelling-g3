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

    const mensajeUsuario = `Tu eres un experto en campañas publicitarias y estás ayudando a una empresa a crear su Transmedia Storytelling que represente la identidad de la marca y la importancia de su servicio/producto. Estos son los datos del cliente:
    Nombre de la campaña: {name}
    Nombre de la Marca: {company}
    Descripción del producto: {mission}
    Crea un Storytelling en que el tono comunicativo és: {keywords} a demostrar que la marca representada tiene un posicionamiento de qué: {archetype_description}. Con base en los siguientes requisitos narrativos:
    El protagonista de la historia es {protagonista}
    El género del protagonista es {gender}
    El protagonista tiene como objetivo {objective}
    Pero, {bad} impide el protagonista a cumplir su objetivo
    {helper} ayuda el protagonista
    La actitud que tiene el ayudante es {helper_characteristic}
    En el fin, {message}
    Primero, escribe el storytelling 3 párrafos de 250 caracteres cada uno.
    Segundo, escribe otro texto más corto de 180 caracteres conteniendo hashtags y emojis, para divulgación en las redes sociales de la misma narrativa. Debe contener el {enlace} enlace en el fin del texto. 
    Sábio: quiero que el texto me haga sentir que leo la verdad absoluta.(descripción arquetipo)
    Palabras Clave: Conocedor, Confiable, Poderoso.
    Inocente: Quiero que el texto me hagas sentir que todo es bello y feliz (descripción arquetipo)
    Palabras Clave: Tranquilidad, felicidad, satisfacción
    Gobernante: Me hace sentir con el texto que eres un líder imponente. (descripción arquetipo)
    Palabras clave: prestígio, liderazgo, poder.
    Común: Vives una vida común, pero se va convertir en una persona mejor (descripción arquetipo)
    Palabras Clave: mérito, esfuerzo, vida tranquila
    Cuidador: Se sientas confortable, protegido (descripción arquetipo)
    Palabras Clave: Amabilidad, cuidado, anidado
    Amante: Nos dá deseo y demonstra fidelidad (descripción arquetipo)
    Palabras Clave: Amor, Lealtad, Fijación
    Bufón: Quiero que el texto me haga reir (descripción arquetipo)
    Palabras clave: Cómico, humor, fantasía
    Rebelde: Quero texto me haga sentir que puedo romper reglas (descripción arquetipo)
    Palabras clave: Rebeldía, obstinación y oposición
    Explorador: Quiero que me haga sentir que vamos a descubrir algo nuevo, o que me llevas en una aventura (descripción arquetipo)
    Palabras clave: Sin límites, pioneiro, explorador
    Creativo: Quiero que el texto despierte mi imaginación (descripción arquetipo)
    Palabras clave: Imaginación, Invención, Creatividad
    Héroe: Quiere que el texto me haga creer que puedo superar desafíos con valentía sobrepasar los  límites (descripción arquetipo)
    Palabras clave: Grandiosidad, resistencia, inspiración
    Mago: Quiero que el texto me haga sentir que todo se resuelve de forma sencilla. (descripción arquetipo)
    Palabras clave: Libertad, magia, facilidad, geniosidad
    Utiliza como base para la redacción la siguiente información: ${historyId}\n${JSON.stringify(data)}` 

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