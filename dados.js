import { getStore } from "https://esm.sh/@netlify/blobs@8";

export default async (request) => {
  const cors = {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "Content-Type"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  const store = getStore({ name: "central-execucao", consistency: "strong" });

  if (request.method === "GET") {
    const data = await store.get("estado", { type: "json" });
    return new Response(JSON.stringify(data || null), { headers: cors });
  }

  if (request.method === "POST") {
    const body = await request.json();
    await store.setJSON("estado", body);
    return new Response(JSON.stringify({ ok: true }), { headers: cors });
  }

  return new Response("Method Not Allowed", { status: 405, headers: cors });
};

export const config = { path: "/api/dados" };
