"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        // Validate redirect target to prevent open redirect attacks
        const raw = searchParams.get("from") ?? "/admin";
        const from = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/admin";
        router.push(from);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Login failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoFocus
          className={cn(
            "w-full rounded-lg border border-input bg-background px-4 py-2.5",
            "text-sm text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
            "transition-colors"
          )}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive font-mono bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "w-full rounded-lg bg-primary text-primary-foreground",
          "py-2.5 text-sm font-semibold",
          "hover:opacity-90 transition-opacity",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus:outline-none focus:ring-2 focus:ring-ring"
        )}
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div
        className={cn(
          "w-full max-w-sm rounded-2xl border border-border bg-card p-8",
          "shadow-lg"
        )}
      >
        {/* Icon */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center border border-border">
            <Lock className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold text-foreground font-mono">
              Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your password to continue
            </p>
          </div>
        </div>

        <Suspense fallback={<div className="h-32 flex items-center justify-center text-muted-foreground text-sm">Loading…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

