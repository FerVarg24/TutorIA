import 'dotenv/config';
import express from 'express';
import { CopilotRuntime, BuiltInAgent } from '@copilotkit/runtime/v2';
import { createCopilotEndpointSingleRouteExpress } from '@copilotkit/runtime/v2/express';

const app = express();
const PORT = 3001;

const apiKey =
  process.env.GEMINI_API_KEY ??
  process.env.GOOGLE_API_KEY ??
  process.env.VITE_GEMINI_API_KEY;

const model = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash';

if (!apiKey || apiKey === 'tu-api-key-aqui') {
  console.warn('[CopilotKit] GEMINI_API_KEY / GOOGLE_API_KEY no configurada — el chat lateral no responderá.');
}

const runtime = new CopilotRuntime({
  agents: {
    default: new BuiltInAgent({
      model: `google/${model}`,
      apiKey,
    }),
  },
});

app.use(
  createCopilotEndpointSingleRouteExpress({
    runtime,
    basePath: '/api/copilotkit',
  }),
);

app.listen(PORT, () => {
  console.log(`CopilotKit runtime (Gemini) listening on http://localhost:${PORT}`);
});
