// "use client";

// import { useState } from "react";
// import { useSession } from "next-auth/react";
// export default function Documentfetch() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [response, setResponse] = useState<{ data: { [key: string]: unknown } } | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file) {
//       setError("Please select a file to upload.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("name", name);
//       formData.append("email", email);

//       const res = await fetch("http://127.0.0.1:8000/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "File upload failed.");
//       }

//       const data = await res.json();
//       setResponse(data);

//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message || "An unexpected error occurred.");
//       } else {
//         setError("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const { data: session } = useSession();

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h1 className="text-xl font-bold mb-4">Upload File</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//          <input
//             type="hidden"
//             id="name"
//             name="name"
//             value={session?.user?.name || ""}
//             onChange={(e) => setName(e.target.value)}
//             className="border p-2 w-full rounded"
//             required
//           />
//         </div>
//         <div>
//           <input
//             type="hidden"
//             id="email"
//             value={session?.user?.email || "info@jsdhami.com.np"}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border p-2 w-full rounded"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="fileInput" className="block text-sm font-medium">
//             File:
//           </label>
//           <input
//             type="file"
//             id="filfileInput"
//             name='file'
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="border p-2 w-full rounded"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           {loading ? "Uploading..." : "Upload"}
//         </button>
//       </form>

//       {response && (
//         <div className="mt-4 p-4 border rounded bg-green-100">
//           <h2 className="text-lg font-bold">Response:</h2>
//           <pre>{JSON.stringify(response.data, null, 2)}</pre>
//         </div>
//       )}

//       {error && (
//         <div className="mt-4 p-4 border rounded bg-red-100">
//           <h2 className="text-lg font-bold text-red-600">Error:</h2>
//           <p>{error}</p>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import React, { useRef } from "react";
import { useSession } from "next-auth/react";

const Documentfetch: React.FC = () => {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async () => {
    const fileInput = fileInputRef.current;

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      console.error("No file selected");
      return;
    }

    const { name, email } = session?.user || {};
    if (!name || !email) {
      console.error("User is not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("file", fileInput.files[0], fileInput.files[0].name);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Upload Your Document</h1>
        <p className="text-gray-600 mb-6">
          Upload a file associated with your account. Ensure you're logged in.
        </p>
        <div>
          <label
            htmlFor="fileInput"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select File
          </label>
          <input
            type="file"
            id="fileInput"
            ref={fileInputRef}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          onClick={handleFileUpload}
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Upload File
        </button>
      </div>
    </div>
  );
};

export default Documentfetch;

