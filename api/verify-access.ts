export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { password } = req.body || {};
  if (password === 'guidacni') {
    return res.status(200).json({ success: true, token: 'cni-session-valid' });
  }
  return res.status(401).json({ success: false, message: 'Password non corretta. Inserisci "guidacni".' });
}
