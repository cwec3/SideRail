import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { AuthShell } from "@/components/layout/auth-layout";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/toast";

export default function LoginPage() {
  const { loginPassword } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.push("error", "Password is required");
      return;
    }
    setLoading(true);
    try {
      await loginPassword(password);
      navigate("/");
    } catch (err) {
      toast.push("error", (err as Error).message || "Invalid password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <form onSubmit={submit} className="sr-login-form" noValidate>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password">Password</label>
          <div style={{ position: "relative" }}>
            <input
              id="password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              style={{ paddingRight: 42 }}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              tabIndex={-1}
              aria-label={showPass ? "Hide password" : "Show password"}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "LOGIN"}
        </button>
      </form>
    </AuthShell>
  );
}
