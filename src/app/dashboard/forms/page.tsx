'use client'
import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, Loader2, Camera, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExtractedData {
    text?: string; // Add other fields based on your API response
}

const Page: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
    const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startVideosrc = async (): Promise<void> => {
      console.log(videoRef);
            if (videoRef.current) {
              console.log("hello");
                videoRef.current.srcObject = streamRef.current;
                await videoRef.current.play(); // Ensure the video plays
            }
    }
    
    useEffect( () => {
      startVideosrc();
    }, [isCameraActive])
    
    const startCamera = async (): Promise<void> => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
            });
            setIsCameraActive(true);
            streamRef.current = stream;
            
            setError('');
        } catch (err) {
            setError('Unable to access camera');
            console.error(err);
        }
    };

    const stopCamera = (): void => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setIsCameraActive(false);
    };

    const captureImage = (): void => {
        if (!videoRef.current) return;
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            setError('Failed to capture image');
            return;
        }
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
            if (blob) {
                const capturedFile = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
                setCapturedImage(URL.createObjectURL(blob));
                setFile(capturedFile);
                stopCamera();
            }
        }, 'image/jpeg', 0.9);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setCapturedImage(null);
            setError('');
            setSuccess(false);
        }
    };

    const resetCapture = (): void => {
        setCapturedImage(null);
        setFile(null);
        setError('');
        setSuccess(false);
        setExtractedData(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file or capture an image first');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess(false);
        setExtractedData(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch('/api/extract', { method: 'POST', body: formData });
            if (!response.ok) throw new Error('Failed to process file');
            
            const data: ExtractedData = await response.json();
            setExtractedData(data);
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while processing the file');
        } finally {
            setLoading(false);
        }
    };

    // Cleanup camera on component unmount
    useEffect(() => {
        return () => { stopCamera(); };
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Document Extraction</CardTitle>
                    <CardDescription> Upload or capture a document to process the content. </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <Tabs defaultValue="upload" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="upload">Upload File</TabsTrigger>
                                <TabsTrigger value="camera">Use Camera</TabsTrigger>
                            </TabsList>
                            <TabsContent value="upload" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="file">Upload File</Label>
                                    <Input id="file" type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,image/*" className="cursor-pointer" />
                                </div>
                            </TabsContent>
                            <TabsContent value="camera" className="space-y-4">
                                <div className="space-y-4">
                                    {!isCameraActive && !capturedImage && (
                                        <Button type="button" onClick={startCamera} className="w-full">
                                            <Camera className="mr-2 h-4 w-4" /> Start Camera
                                        </Button>
                                    )}
                                    {isCameraActive && (
                                        <div className="space-y-4">
                                            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                                                <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />
                                            </div>
                                            <div className="flex gap-2">
                                                <Button type="button" onClick={captureImage} className="flex-1">
                                                    <Camera className="mr-2 h-4 w-4" /> Capture
                                                </Button>
                                                <Button type="button" variant="outline" onClick={stopCamera} className="flex-1">
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    {capturedImage && (
                                        <div className="space-y-4">
                                            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                                <img src={capturedImage} alt="Captured document" className="h-full w-full object-cover" />
                                            </div>
                                            <Button type="button" variant="outline" onClick={resetCapture} className="w-full">
                                                <RefreshCcw className="mr-2 h-4 w-4" /> Retake
                                            </Button>
                                        </div>
                                    )}
                                </div>
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
                                <AlertDescription> File processed successfully! </AlertDescription>
                            </Alert>
                        )}
                        {extractedData && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium mb-2">Extracted Content:</h3>
                                <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(extractedData, null, 2)}</pre>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={loading || !file || isCameraActive}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                                </>
                            ) : ('Extract')}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Page;