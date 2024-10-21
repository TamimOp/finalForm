import AuthOnly from "@/providers/AuthOnly";

export default function HomePage() {
  return (
    <AuthOnly alternateRoute="/dashboard">
      <div>Home Page</div>
    </AuthOnly>
  );
}
