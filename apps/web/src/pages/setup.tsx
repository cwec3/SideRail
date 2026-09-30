import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { AuthShell } from "@/components/layout/auth-layout";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/toast";

export default function SetupPage() {
  const { setup } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      toast.push("error", "Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      toast.push("error", "Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      // Use a fixed internal username; the real secret is the password.
      await setup("owner", password);
      navigate("/");
    } catch (err) {
      toast.push("error", (err as Error).message || "Setup failed");
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
              placeholder="••••••••"
              autoFocus
              style={{ paddingRight: 42 }}
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

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="confirm">Confirm Password</label>
          <input
            id="confirm"
            type={showPass ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "CREATE OWNER"}
        </button>
      </form>
    </AuthShell>
  );
}
