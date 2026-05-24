import 'dotenv/config';
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import {
  CopilotRuntime,
  AnthropicAdapter,
} from '@copilotkit/runtime';
import { createCopilotEndpointSingleRouteExpress } from '@copilotkit/runtime/v2/express';

const app = express();
const PORT = 3001;

const apiKey = process.env.ANTHROPIC_API_KEY ?? process.env.VITE_ANTHROPIC_API_KEY;

const adapterOptions = {
  model: 'claude-sonnet-4-20250514',
};

if (apiKey && apiKey !== 'tu-api-key-aqui') {
  adapterOptions.anthropic = new Anthropic({ apiKey });
}

const serviceAdapter = new AnthropicAdapter(adapterOptions);
const runtime = new CopilotRuntime();
runtime.handleServiceAdapter(serviceAdapter);

// v2 Express router: POST /api/copilotkit with correct originalUrl handling
app.use(
  createCopilotEndpointSingleRouteExpress({
    runtime: runtime.instance,
    basePath: '/api/copilotkit',
  }),
);

app.listen(PORT, () => {
  console.log(`CopilotKit runtime listening on http://localhost:${PORT}`);
});
