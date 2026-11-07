import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// API: Verify password gate
app.post('/api/verify-access', (req, res) => {
  const { password } = req.body;
  if (password === 'guidacni') {
    return res.json({ success: true, token: 'cni-session-valid' });
  }
  return res.status(401).json({ success: false, message: 'Password non corretta. Inserisci "guidacni".' });
});

// API: AI Assistant powered by Gemini for engineering tasks
app.post('/api/gemini/assist', async (req, res) => {
  const { action, query, context } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(503).json({
      error: 'Chiave API Gemini non configurata nel sistema. Utilizza gli strumenti standard dell’app.'
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    let systemInstruction = `Sei l'Assistente Ufficiale IngegnerIA basato sulla "Guida pratica sull'Intelligenza Artificiale per l'Ingegnere" pubblicata dal CNI (Consiglio Nazionale degli Ingegneri), sulla Legge n. 132/2025, sul Regolamento UE 2024/1689 (AI Act) e sul Codice Deontologico degli Ingegneri Italiani (in particolare artt. 13.1–13.7).
Regole deontologiche essenziali da rispettare rigorosamente:
1. L'Intelligenza Artificiale è esclusivamente uno strumento di supporto all'attività intellettuale dell'Ingegnere.
2. L'Ingegnere mantiene la totale ed esclusiva responsabilità per ogni elaborato, calcolo, parere o progetto firmato.
3. È tassativo il dovere di supervisione umana, verifica critica e validazione metodologica di qualsiasi output sintetico.
4. Riservatezza e segreto professionale: mai inserire dati riservati di committenti o progetti sensibili in modelli LLM pubblici senza garanzie GDPR.
5. Trasparenza verso il committente quando l'uso dell'IA incide in misura sostanziale sull'elaborato.
Rispondi sempre in lingua italiana, in modo tecnico, autorevole, chiaro e conforme agli standard professionali degli Ingegneri italiani.`;

    let userPrompt = '';

    if (action === 'optimize-prompt') {
      userPrompt = `Ottimizza il seguente prompt ingegneristico per l'utilizzo professionale con LLM (ChatGPT, Claude, Gemini). Strutturalo secondo le migliori pratiche CNI (ruolo, contesto normativo es. NTC 2018 / Eurocodici, vincoli tecnici, formato di output richiesto, avvertenze di validazione):\n\n${query}`;
    } else if (action === 'evaluate-system') {
      userPrompt = `Analizza il seguente caso d'uso ingegneristico sotto il profilo dell'AI Act (Reg. UE 2024/1689) e della Legge 132/2025:
Caso d'uso: "${query}"
Ruolo dell'Ingegnere: ${context?.role || 'Deployer (utilizzatore professionale)'}
Fornisci:
1. Qualificazione preliminare (è un sistema di IA ai sensi dell'art. 3?)
2. Classificazione del livello di rischio (Rischio Inaccettabile / Alto Rischio ex All. I o III / Trasparenza ex art. 50 / Rischio Minimo)
3. Obblighi specifici dell'Ingegnere (trasparenza, controllo umano, conformità tecnica)
4. Presidi deontologici consigliati (art. 13 Codice Deontologico)`;
    } else {
      userPrompt = query;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    return res.json({ result: response.text });
  } catch (err: any) {
    console.error('Gemini error:', err);
    return res.status(500).json({ error: err.message || 'Errore nella generazione' });
  }
});

// Configure Vite or Static serving
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`IngegnerIA dev server running on port ${port}`);
  });
}

startServer();
