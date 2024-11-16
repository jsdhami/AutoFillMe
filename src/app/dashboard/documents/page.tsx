"use client";

import React, { useState, useRef, useEffect } from "react";
import { AlertCircle, Loader2, Camera} from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface ExtractedData {
  text?: string;
}

const Page: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { data: session } = useSession();

  const startCamera = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 1920, height: 1080 },
      });
      setIsCameraActive(true);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setError("");
    } catch (err) {
      setError("Unable to access camera");
      console.error(err);
    }
  };

  const stopCamera = (): void => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setCapturedImage(null);
      setError("");
      setSuccess(false);
    }
  };


  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!file || !session?.user) {
      setError("Please select a file or capture an image first");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess(false);
    setExtractedData(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", session.user.name || "");
      formData.append("email", session.user.email || "");

      const response = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to process file");

      const data: ExtractedData = await response.json();
      
      setExtractedData(data);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while processing the file"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Data Extraction</CardTitle>
          <CardDescription>
            Upload or capture a document to process the content.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload File</TabsTrigger>
                <TabsTrigger value="camera">Use Camera</TabsTrigger>
              </TabsList>
              <TabsContent value="upload" className="space-y-4">
                <Label htmlFor="file">Upload File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf, image/*"
                />
              </TabsContent>
              <TabsContent value="camera" className="space-y-4">
                {!isCameraActive && !capturedImage && (
                  <Button onClick={startCamera}>
                    <Camera className="mr-2 h-4 w-4" /> Start Camera
                  </Button>
                )}
                {isCameraActive && (
                  <video ref={videoRef} autoPlay playsInline className="w-full" />
                )}
                {capturedImage && (
                  <Image
                    src={capturedImage}
                    alt="Captured"
                    width={500}
                    height={500}
                    className="rounded-md"
                  />
                )}
              </TabsContent>
            </Tabs>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="bg-green-50 text-green-700 border-green-200">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>File processed successfully!</AlertDescription>
              </Alert>
            )}
            {extractedData && (
              <div className="p-4 bg-gray-100 rounded-lg text-wrap">
                <h3 className="font-semibold">Extracted Content</h3>
                <pre className="text-wrap w-fit ">{JSON.stringify(extractedData, null, 2)}</pre>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={loading || (!file && !capturedImage)}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
                </>
              ) : (
                "Extract"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Page;
