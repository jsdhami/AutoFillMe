"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
export default function Documentfetch() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<{ data: { [key: string]: unknown } } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("file", file);

      const res = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "File upload failed.");
      }

      const data = await res.json();
      setResponse(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const { data: session } = useSession();

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload File</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
         <input
            type="hidden"
            id="name"
            value={session?.user?.name || ""}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <input
            type="hidden"
            id="email"
            value={session?.user?.email || ""}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium">
            File:
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {response && (
        <div className="mt-4 p-4 border rounded bg-green-100">
          <h2 className="text-lg font-bold">Response:</h2>
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 border rounded bg-red-100">
          <h2 className="text-lg font-bold text-red-600">Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
