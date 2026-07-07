import Fastify from 'fastify';
import { z } from 'zod';

const app = Fastify({ logger: true });
const feedQuerySchema = z.object({ locale: z.enum(['zh', 'en', 'ar']).default('zh') });

app.get('/health', async () => ({ ok: true, service: 'frontpost-api' }));
app.get('/v1/feed', async (request) => {
  const query = feedQuerySchema.parse(request.query);
  return { locale: query.locale, items: [{ id: 'demo-paper-1', title: 'A new scaling law for reasoning in large language models', source: 'ArXiv AI' }] };
});

await app.listen({ host: '0.0.0.0', port: Number(process.env.PORT ?? 8787) });
