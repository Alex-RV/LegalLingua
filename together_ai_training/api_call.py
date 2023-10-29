import requests
url = "https://legal-lingua.vercel.app/api/pdf2text"
headers = {
    "Content-Type": "application/pdf",
}

with open("Test.pdf", "rb") as f:
    response = requests.post(url, headers=headers, data=f)

print(response.text)
