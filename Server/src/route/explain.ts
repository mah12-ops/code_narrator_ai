import { Router } from 'express';
import { explainCode } from '../controller/openaiservice';


const router = Router();

router.post('/explain', async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: 'Code and language are required.' });
  }

  try {
    const explanation = await explainCode(code, language);
    res.json({ explanation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI failed to generate explanation.' });
  }
});

export default router;
