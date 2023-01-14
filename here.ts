import { serve } from "https://deno.land/std@0.74.0/http/server.ts";
import { join } from "https://deno.land/std@0.74.0/path/mod.ts";
import { lookup } from "https://deno.land/x/mime_types/mod.ts";

const server = serve({ port: 1234 });
console.log("Server running on http://localhost:1234/");
const currentDir = join(Deno.cwd(), ".");

for await (const req of server) {
    try {
        const filePath = join(currentDir, req.url);
        const file = await Deno.open(filePath);
        const headers = new Headers();
        headers.set("Content-Type", lookup(filePath));
        req.respond({ body: file, headers });
    } catch (err) {
        req.respond({ body: "404 - Not Found" });
    }
}
