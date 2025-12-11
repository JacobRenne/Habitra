import { AuthGate } from "@/components/AuthGate";
import { Navbar } from "@/components/Navbar";

export default function AccountPage() {
  return (
    <AuthGate>
      <div className="bg-background min-h-screen">
        <Navbar />
        <h1>This is a placeholder page</h1>
      </div>
    </AuthGate>
  );
}
