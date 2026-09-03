import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import { simpleAuth } from "@/lib/simpleAuth";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (simpleAuth.login(email, password)) {
        navigate("/admin", { replace: true });
      } else {
        setError("Invalid credentials. Access restricted to team admins.");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <AuthLayout title="Admin Login" subtitle="[ RESTRICTED_ACCESS ]">
      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="mono-tag block mb-2">[EMAIL]</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field-dark" placeholder="admin@ihsaninnovators" required />
        </div>
        <div>
          <label className="mono-tag block mb-2">[PASSWORD]</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="field-dark" placeholder="••••••••" required />
        </div>
        {error && <p className="mono-tag text-primary">[{error}]</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading && <Loader2 size={15} className="animate-spin mr-2" />}
          {loading ? "AUTHENTICATING..." : "ENTER_ADMIN"}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-border">
        <p className="mono-tag mb-4 text-center">[ OR ]</p>
        <button className="btn-ghost w-full" onClick={() => setError("Google sign-in is configured at the platform level. Use admin credentials above.")}>
          <GoogleIcon size={16} />
          <span className="ml-2">CONTINUE_WITH_GOOGLE</span>
        </button>
      </div>

      <p className="mono-tag mt-6 text-center text-muted-foreground">
        [ AUTHORIZED_ADMINS_ONLY ]
      </p>
    </AuthLayout>
  );
}