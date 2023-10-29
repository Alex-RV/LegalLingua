import { InferenceResponse } from "./interfaces";

export async function performInference(
    model: string,
    prompt: string,
    temperature: number = 0.8,
    top_p: number = 0.7,
    top_k: number = 50,
    max_tokens: number = 1000,
    repetition_penalty: number = 1
  ): Promise<InferenceResponse | null> {
    const apiUrl = "https://api.together.xyz/inference";
    const token = process.env.NEXT_PUBLIC_TOGETHERAI_KEY;
    // console.log("Token: ",token)
  
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  
    const data = {
      model,
      prompt,
      temperature,
      top_p,
      top_k,
      max_tokens,
      repetition_penalty,
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      console.log(response)
  
      if (!response.ok) {
        console.error(`Request failed with status: ${response.status}`);
        return null;
      }
      
  
      const responseData = response.json();
      console.log(responseData)
      return responseData;
    } catch (error) {
      console.error("Error performing inference:", error);
      return null;
    }
  }
  