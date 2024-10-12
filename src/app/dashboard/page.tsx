<<<<<<< HEAD
// import { getSession } from "next-auth/react";
// import { prisma } from "@/lib/prisma";
// import { redirect } from "next/navigation";

// export default async function DashboardPage() {
//   const session = await getSession();

//   // Redirect to login if not authenticated
//   if (!session) {
//     redirect("/auth/login");
//   }

//   // Fetch user templates using session email
//   const templates = await prisma.template.findMany({
//     where: { author: { email: session?.user?.email } },
//     include: {
//       likes: true,
//       comments: true,
//       tags: true,
//     },
//   });

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

//       {templates.length === 0 ? (
//         <p className="text-gray-500">No templates found. Create one!</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {templates.map((template) => (
//             <div key={template.id} className="bg-white rounded-lg shadow p-4">
//               <h2 className="text-xl font-semibold mb-2">
//                 {template.form.title}
//               </h2>
//               <p className="text-gray-600">{template.form.description}</p>

//               <div className="mt-4">
//                 <p>
//                   <strong>Likes:</strong> {template.likes.length}
//                 </p>
//                 <p>
//                   <strong>Comments:</strong> {template.comments.length}
//                 </p>
//                 <p>
//                   <strong>Tags:</strong>{" "}
//                   {template.tags.map((tag) => tag.text).join(", ")}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React from "react";

function Dashboard() {
  return <div>Dashboard</div>;
=======
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/auth/login");
  }

  // Fetch user templates using session email
  const templates = await prisma.template.findMany({
    where: { author: { email: session?.user?.email } },
    include: {
      likes: true,
      comments: true,
      tags: true,
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

      {templates.length === 0 ? (
        <p className="text-gray-500">No templates found. Create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-2">
                {template.form.title}
              </h2>
              <p className="text-gray-600">{template.form.description}</p>

              <div className="mt-4">
                <p>
                  <strong>Likes:</strong> {template.likes.length}
                </p>
                <p>
                  <strong>Comments:</strong> {template.comments.length}
                </p>
                <p>
                  <strong>Tags:</strong>{" "}
                  {template.tags.map((tag) => tag.text).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
>>>>>>> parent of 7453a3d (adding clerk and sync it with db)
}

export default Dashboard;
