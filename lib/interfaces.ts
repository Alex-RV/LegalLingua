export interface InferenceResponse {
    status: string;
    prompt: string[];
    model: string;
    model_owner: string;
    tags: Record<string, any>;
    num_returns: number;
    args: {
      model: string;
      prompt: string;
      temperature: number;
      top_p: number;
      top_k: number;
      max_tokens: number;
      repetition_penalty: number;
    };
    subjobs: any[]; 
    output: {
      choices: Array<{ text: string }>; 
      request_id: string;
    };
  }
  