import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";

import items from "./data/items.json" with { type: "json" };
import { Item } from "./src/types.ts";
import { ItemsGetInQuerySchema, ItemUpdateInSchema } from "./src/validation.ts";
import { treeifyError, ZodError } from "zod";
import { doesItemNeedRevision } from "./src/utils.ts";
import { gigaChatService } from "./src/gigachat.service.ts";

const ITEMS = items as Item[];

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "http://frontend:80",
    "http://host.docker.internal:5173",
  ],
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

await fastify.register((await import("@fastify/middie")).default);

// Искуственная задержка ответов, чтобы можно было протестировать состояния загрузки
fastify.use((_, __, next) =>
  new Promise((res) => setTimeout(res, 300 + Math.random() * 700)).then(next),
);

interface ItemGetRequest extends Fastify.RequestGenericInterface {
  Params: {
    id: string;
  };
}

fastify.get<ItemGetRequest>("/items/:id", (request, reply) => {
  const itemId = Number(request.params.id);

  if (!Number.isFinite(itemId)) {
    reply
      .status(400)
      .send({ success: false, error: "Item ID path param should be a number" });
    return;
  }

  const item = ITEMS.find((item) => item.id === itemId);

  if (!item) {
    reply
      .status(404)
      .send({ success: false, error: "Item with requested id doesn't exist" });
    return;
  }

  return {
    ...item,
    needsRevision: doesItemNeedRevision(item),
  };
});

interface ItemsGetRequest extends Fastify.RequestGenericInterface {
  Querystring: {
    q?: string;
    limit?: string;
    skip?: string;
    categories?: string;
    needsRevision?: string;
  };
}

fastify.get<ItemsGetRequest>("/items", (request) => {
  const {
    q,
    limit,
    skip,
    needsRevision,
    categories,
    sortColumn,
    sortDirection,
  } = ItemsGetInQuerySchema.parse(request.query);

  const filteredItems = ITEMS.filter((item) => {
    return (
      item.title.toLowerCase().includes(q.toLowerCase()) &&
      (!needsRevision || doesItemNeedRevision(item)) &&
      (!categories?.length ||
        categories.some((category) => item.category === category))
    );
  });

  return {
    items: filteredItems
      .toSorted((item1, item2) => {
        let comparisonValue = 0;

        if (!sortDirection) return comparisonValue;

        if (sortColumn === "title") {
          comparisonValue = item1.title.localeCompare(item2.title);
        } else if (sortColumn === "createdAt") {
          comparisonValue =
            new Date(item1.createdAt).valueOf() -
            new Date(item2.createdAt).valueOf();
        } else if (sortColumn === "price") {
          // Добавляем сортировку по цене
          comparisonValue = item1.price - item2.price;
        }

        return (sortDirection === "desc" ? -1 : 1) * comparisonValue;
      })
      .slice(Number(skip) || 0, (Number(skip) || 0) + (Number(limit) || 10))
      .map((item) => ({
        id: item.id,
        category: item.category,
        title: item.title,
        price: item.price,
        needsRevision: doesItemNeedRevision(item),
      })),
    total: filteredItems.length,
  };
});

interface ItemUpdateRequest extends Fastify.RequestGenericInterface {
  Params: {
    id: string;
  };
}

fastify.put<ItemUpdateRequest>("/items/:id", (request, reply) => {
  const itemId = Number(request.params.id);

  if (!Number.isFinite(itemId)) {
    reply
      .status(400)
      .send({ success: false, error: "Item ID path param should be a number" });
    return;
  }

  const itemIndex = ITEMS.findIndex((item) => item.id === itemId);

  if (itemIndex === -1) {
    reply
      .status(404)
      .send({ success: false, error: "Item with requested id doesn't exist" });
    return;
  }

  try {
    const parsedData = ItemUpdateInSchema.parse({
      category: ITEMS[itemIndex].category,
      ...(request.body as {}),
    });

    ITEMS[itemIndex] = {
      id: ITEMS[itemIndex].id,
      createdAt: ITEMS[itemIndex].createdAt,
      updatedAt: new Date().toISOString(),
      ...parsedData,
    };

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      reply.status(400).send({ success: false, error: treeifyError(error) });
      return;
    }

    throw error;
  }
});

fastify.post<{
  Body: {
    messages: { role: string; content: string }[];
  };
}>("/ai/chat", async (request, reply) => {
  try {
    const answer = await gigaChatService.sendMessage(request.body.messages);

    return { success: true, answer };
  } catch (error) {
    if (error instanceof ZodError) {
      reply.status(400).send({ success: false, error: treeifyError(error) });
      return;
    }

    throw error;
  }
});

const port = Number(process.env.PORT) || 3000;

fastify.listen({ port, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is listening on ${address}`);
});
