"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Fillform = () => {
  const { data: session } = useSession(); // Retrieve session info
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", session?.user?.name || "demo");
    formData.append("email", session?.user?.email || "demo@demo.com");

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/fill_form", {
        method: "POST",
        body: formData,
        redirect: "follow",
      });

      console.log(response.text)

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }
     
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImage(url)

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="flex">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-white shadow-lg rounded-md max-w-md w-full"
      >
        <h1 className="text-xl font-bold">Submit Your Form</h1>

        <div>
          <label className="block mb-1 font-medium" htmlFor="file">
            Upload File
          </label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,image/*"
            className="cursor-pointer"
          />
        </div>

        {error && (
          <div className="text-red-600 bg-red-50 p-2 rounded-md">{error}</div>
        )}
        {success && (
          <div className="text-green-600 bg-green-50 p-2 rounded-md">
            Form submitted successfully!
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading || !file}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
      </div>
      <div className="flex">
        <Image src={image} height={500} width={500} alt="gg" />
      </div>
    </div>
  );
};

export default Fillform;
