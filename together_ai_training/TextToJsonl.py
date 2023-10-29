import pandas as pd
import json

# Python script that reads file input from txt into jsonl
dataframe = pd.read_json(path_or_buf='/Users/randolf/Desktop/Tutorials/togetherai/train.txt', lines=True)
dataframe = dataframe.iloc[:2000]
dataframe = dataframe.rename(columns={"report": "long", "summary": "short"})
dataframe = dataframe.drop('document_type', axis=1)
lists = dataframe.values.tolist()

json_list = []
for list in lists:
    training_prompt = f"summarize this text and give your answer between <summary></summary> tags. text: {str(list[0])} <summary> {str(list[1])} </summary>"
    json_list.append({"text": str(training_prompt)})

with open('training_set.jsonl', 'w') as outfile:
    for entry in json_list:
        json.dump(entry, outfile)
        outfile.write('\n')
