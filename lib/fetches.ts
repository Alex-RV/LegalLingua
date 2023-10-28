export async function performInference(
    model: string,
    prompt: string,
    temperature: number = 0.8,
    top_p: number = 0.7,
    top_k: number = 50,
    max_tokens: number = 1,
    repetition_penalty: number = 1
  ): Promise<string | null> {
    const apiUrl = "https://api.together.xyz/inference";
    const token = process.env.NEXT_PUBLIC_TOGETHERAI_KEY;
  
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
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const responseData = await response.json();
      return responseData.data?.text || null;
    } catch (error) {
      console.error("Error performing inference:", error);
      return null;
    }
  }
  