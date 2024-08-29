import { Injectable } from "@nestjs/common";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

@Injectable()
export class GeminiService {
    constructor() { }

    apiKey = process.env.API_KEY;
    genAI = new GoogleGenerativeAI(this.apiKey);
    fileManager = new GoogleAIFileManager(this.apiKey);
    model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });
    generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    async uploadToGemini(path, mimeType) {
        const uploadResult = await this.fileManager.uploadFile(path, {
            mimeType,
            displayName: path,
        });
        const file = uploadResult.file;
        console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
        return file;
    }

    async getMeasure(imageURL: string) {
        const files = [
            await this.uploadToGemini(imageURL, "image/*"),
        ];
        const chatSession = this.model.startChat({
            generationConfig: this.generationConfig,

            history: [
                {
                    role: "user",
                    parts: [
                        {
                            fileData: {
                                mimeType: files[0].mimeType,
                                fileUri: files[0].uri,
                            },
                        }
                    ],
                },
            ],
        });

        const result = await chatSession.sendMessage("qual adereço a cachorrinha da imagem está usando?");
        return result.response.text();
    }

}