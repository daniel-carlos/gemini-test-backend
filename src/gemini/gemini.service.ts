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

    filterMeasure(texto: string): string {
        // \D representa qualquer caractere que NÃO seja um dígito
        return texto.replace(/\D/g, '');
    }

    apiKey = process.env.GEMINI_API_KEY;
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
            await this.uploadToGemini(imageURL, "image/png"),
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

        const result = await chatSession.sendMessage(`
            A imagem contém um hidrômetro com uma medição de consumo. 
            o hidrômetro da imagem contém um visor mecânico giratório. 
            Qual o valor preciso da medição exibida no visor? 
            Retorne precisamente apenas o valor com os dígitos numéricos.
            (é essencial que a sua resposta só forneça os números encontrados, não é necessário qualquer observação, comentário ou texto adicional) 
            Considere o fato de que, por ser um visor giratório, o número mostrado em alguns espaços pode estar na transição entre dois valores adjacentes.
            Desconsidere as informações técnicas.
            Desconsidere qualquer outro elemento além dos núneros.
            importante: cuidado com o espaço entre os dígitos do display do hidrômetro que podem ser confundidos com um '1'
            lembre-se que todos os números dos displays aparecem numa cor escura sobre um background branco 
        `);
        return this.filterMeasure(result.response.text());
    }

}