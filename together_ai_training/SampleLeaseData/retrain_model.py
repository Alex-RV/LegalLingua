import together
from decouple import config
import docx
import json

together.api_key = config('TOGETHER_API_KEY')
# formatting
# {"text": "..."}
# 
# json_file = [
#   {
#
#   }
# ]
#
# Training Documents

file_names = []
i = 1
for i in range(1, 109):
    file_names.append('SampleLease'+str(i)+'.docx')

file_names.remove('SampleLease11.docx')
def getText(filename):
    doc = docx.Document(filename)
    fullText = []
    for para in doc.paragraphs:
        fullText.append(para.text)
    return '\n'.join(fullText)


text_files = []

for file in file_names:
    text_files.append(str(getText(file)))

json_file = []
for file in text_files:
    result = ({"text": "Please Please provide a concise summary of the following document, emphasizing the key terms, obligations, rights, penalties, and any potential risks or liabilities:" + file})
    json_file.append(result)

with open('output.jsonl', 'w') as outfile:
    for entry in json_file:
        json.dump(entry, outfile)
        outfile.write('\n')
