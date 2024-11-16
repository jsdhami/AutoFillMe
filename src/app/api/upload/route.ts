// import { GoogleGenerativeAI } from "@google/generative-ai";
// // import connectToDatabase from "@/lib/db";
// // import UploadModel from "@/lib/schema/uploads";



// if (!process.env.GOOGLE_API_KEY) {
//   throw new Error("API_KEY is not defined");
// }
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// export async function POST() {
//   const prompt = "Does this look store-bought or homemade?";
//   const file = {
//   }
  
//   const result = await model.generateContent([prompt], file);
//   // save to database
//   // await connectToDatabase();
//   // const upload = new UploadModel({
//   //   name: "defaultName",
//   //   email: "defaultEmail@example.com",
//   //   result,
//   // });
//   // await upload.save();

//   return Response.json({ result });
// }


export async function GET() {
  return Response.json({ message: "Hello, World!" });
}