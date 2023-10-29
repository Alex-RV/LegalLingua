import together
from decouple import config

API_USER = config('USER')
API_KEY = config('TOGETHER_API_KEY')

print(API_USER)
print(API_KEY)

together.api_key = API_KEY
# see available models
model_list = together.Models.list()

print(f"{len(model_list)} models available")

# print the first 10 models on the menu
model_names = [model_dict['name'] for model_dict in model_list]
model_names[:10]

output = together.Complete.create(
  prompt = "<human>: What are Isaac Newton's 3 laws of physics? ", 
  model = "togethercomputer/llama-2-7b", 
  max_tokens = 256,
  temperature = 0.8,
  top_k = 60,
  top_p = 0.6,
  repetition_penalty = 1.1,
  stop = ['<human>', '\n\n']
)

# print generated text
print(output['prompt'][0]+output['output']['choices'][0]['text'])
