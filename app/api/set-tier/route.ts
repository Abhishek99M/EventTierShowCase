import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";


export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { tier } = await req.json();

  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      tier: tier || "free",
    },
  });

  return new Response("Tier updated");
}
// export async function GET(req: Request) {
//   const { userId } = auth();

//   if (!userId) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   const user = await clerkClient.users.getUser(userId);
//   const tier = user.publicMetadata.tier || "free";

//   return new Response(JSON.stringify({ tier }), {
//     headers: { "Content-Type": "application/json" },
//   });
// }