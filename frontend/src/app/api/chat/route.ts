import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Create a prompt that includes context about PT-Store
    const prompt = `You are a helpful AI assistant for PT-Store, an online store based in Kanpur, India. 
    You sell traditional Indian products like sarees, jewelry, home decor, and more. 
    User: ${message}
    Assistant:`;

    // Get response from Hugging Face model
    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 250,
        temperature: 0.7,
        top_p: 0.95,
        return_full_text: false,
      },
    });

    return NextResponse.json({ response: response.generated_text });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
} 