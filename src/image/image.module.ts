import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';


@Module({
    imports: [
        MulterModule.register({
            dest: './uploads',
            // Diretório para salvar as imagens (opcional)
        }),
    ],
    controllers: [],
})
export class ImageModule { }