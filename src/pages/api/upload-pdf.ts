const vision = require('@google-cloud/vision');
const fs = require("fs");


const credential = JSON.parse(
  Buffer.from(process.env.NEXT_PUBLIC_GOOGLE_SERVICE_KEY, "base64").toString().replace(/\n/g, "")
);
const client = new vision.ImageAnnotatorClient({
  projectId: "raspimon",
  credentials: {
    client_email: credential.client_email,
    private_key: credential.private_key,
  }
});

export default async function handler(req, res) {

  if (req.method === 'OPTIONS') { // Preflight request. Reply successfully:
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(404).json({ error: 'Invalid method' });
    return;
  }

  const { pngDataUrl: dataUrl } = req.body;


  if (!dataUrl) {
    res.status(400).json({ error: 'dataUrl not provided' });
    return;
  }

  if (typeof dataUrl !== 'string') {
    res.status(400).json({ error: 'dataUrl must be a string' });
    return;
  }

  try {
    const base64Data = dataUrl.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const [result] = await client.textDetection(buffer);
    const fullText = result.textAnnotations[0].description;

    console.log(fullText);
    res.status(200).json({ text: fullText });
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
}

}