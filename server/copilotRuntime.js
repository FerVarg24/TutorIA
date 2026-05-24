import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import {
  CopilotRuntime,
  AnthropicAdapter,
  copilotRuntimeNodeExpressEndpoint,
} from '@copilotkit/runtime';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const apiKey = process.env.ANTHROPIC_API_KEY ?? process.env.VITE_ANTHROPIC_API_KEY;

const adapterOptions = {
  model: 'claude-sonnet-4-20250514',
};

if (apiKey && apiKey !== 'tu-api-key-aqui') {
  adapterOptions.anthropic = new Anthropic({ apiKey });
}

const serviceAdapter = new AnthropicAdapter(adapterOptions);

const runtime = new CopilotRuntime();

const copilotHandler = copilotRuntimeNodeExpressEndpoint({
  runtime,
  serviceAdapter,
  endpoint: '/api/copilotkit',
});

// Mount at root so CopilotKit receives the full path (/api/copilotkit)
app.use(copilotHandler);

app.listen(PORT, () => {
  console.log(`CopilotKit runtime listening on http://localhost:${PORT}`);
});
