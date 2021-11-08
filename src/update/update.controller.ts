import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AddUpdateDto } from './dto/add-update.dto';
import { GetUpdatesFilterDto } from './dto/get-updates-filter.dto';
import { UpdateUpdateStatusDto } from './dto/update-update-status.dto';
import { Update } from './update.entity';
import { UpdateService } from './update.service';
// import { GetUser } from 'src/auth/get-user.decorator';
// import { User } from 'src/auth/user.entity';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage, isFileExtensionSafe ,removeFile} from 'src/image-storage';
import { join } from 'path';
import { Observable, of, switchMap } from 'rxjs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid'
import path = require('path');

// export const savetostorage = { storage: diskStorage({
//     destination: './uploads',
//     filename: (req, file, cb) => {
//         const filename: string = path.parse(file.originalname).name.replace(/\s/g, '')+ uuidv4();
//         const extension: string = path.parse(file.originalname).ext;

//         cb(null, `${filename}${extension}`)
//     }
// })}


// @UseGuards(JwtAuthGuard)
@Controller('update')
export class UpdateController {
    constructor(
        private updateService:UpdateService,
        // private readonly authService: AuthService
    ){}

    // @UseGuards(LocalAuthGuard)
    // @Post('login')
    // login(@Request() req):any {
    //     return this.authService.login(req.user) // return jwt access token
    // }

    // @UseGuards(AuthenticatedGuard)
    // @Get('update')
    // getHello(@Request() req): string{ // require a Bearer token, validate token
    //     return req.user; //req.user;
    // }
    

    // @Post()
    // @UseInterceptors(FilesInterceptor('img' , 20, saveImageToStorage))
    // createUpdate(@Body() addUpdateDto:AddUpdateDto, @UploadedFiles() img): Observable<Update | {error: string}> {
    //     const fileName = img?.map(img => img.filename)
    //     // const fileName = img?.filename;

    //     if(!fileName) return of({ error: 'File must be a png, jpg/jpeg'});

    //     const imagesFolderPath = join(process.cwd(), 'uploads');
    //     const fullImagePath = join(imagesFolderPath + '/' + img.filename)

    //     return isFileExtensionSafe(fullImagePath).pipe(
    //         switchMap((isFileLegit: boolean) => {
    //             if(isFileLegit){
    //                 return this.updateService.addUpdate(addUpdateDto,fileName);
    //             }
    //             removeFile(fullImagePath);

    //             return of({ error: 'File content dose not match extension'});
    //         })
    //     )
        
    //     // return this.updateService.addUpdate(addUpdateDto,img);
    // }



    // @Post()
    // @UseInterceptors(FilesInterceptor('img' ,20, savetostorage))
    // createUpdate(@Body() addUpdateDto:AddUpdateDto, @UploadedFiles() img): Promise<Update> {
    //     const fileName = img.map(img => img.filename)
    //     return this.updateService.addUpdate(addUpdateDto,img);
    // }

    @Post()
    // @UseInterceptors(FilesInterceptor('img' ,20, savetostorage))
    createUpdate(@Body() addUpdateDto:AddUpdateDto): Promise<Update> {
        return this.updateService.addUpdate(addUpdateDto);
    }


    @Get()
    getUpdates(@Query() filterDto: GetUpdatesFilterDto
    ): Promise<Update[]> {
        return this.updateService.getUpdates(filterDto);          
    }


    @Get('/:id')
    getUpdateById(@Param('id') id: string): Promise<Update>{
        return this.updateService.getUpdateById(id);
    }

    @Patch('/:id/status')
    updateUpdateStatus(
        // @Request() req,
        @Param('id') id: string,
        @Body() updateUpdateStatusDto: UpdateUpdateStatusDto,
        // @Body() title?: string,
        // @Body() subtitle?: string,
        // @Body() img?: string,
        // @Body() url?: string,
        ): Promise<Update> {
            const { status } = updateUpdateStatusDto;
            // const { status, title, subtitle, img, url } = updateUpdateStatusDto;
            return this.updateService.updateUpdateStatus(id, status);
            // return this.updateService.updateUpdateStatus(id, status, title, subtitle, img, url);
    }


    @Delete('/:id')
    deleteUpdateById(@Param('id') id: string): Promise<void>{
        return this.updateService.deleteUpdateById(id);
    }
}
