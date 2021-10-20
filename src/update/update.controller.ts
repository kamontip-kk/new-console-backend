import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AddUpdateDto } from './dto/add-update.dto';
import { GetUpdatesFilterDto } from './dto/get-updates-filter.dto';
import { UpdateUpdateStatusDto } from './dto/update-update-status.dto';
import { Update } from './update.entity';
import { UpdateService } from './update.service';
// import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('update')
export class UpdateController {
    constructor(
        private updateService:UpdateService,
        ){}

    @Post()
    createUpdate(@Body() addUpdateDto:AddUpdateDto): Promise<Update>{
        return this.updateService.addUpdate(addUpdateDto);
    }

    @Get()
    getUpdates(@Query() filterDto: GetUpdatesFilterDto
    ): Promise<Update[]> {
        return this.updateService.getUpdates(filterDto);          
    }

    // @Get()
    // getHello(): string {
    //   return this.updateService.getHello();
    // }

    @Get('/:id')
    getUpdateById(@Param('id') id: string): Promise<Update>{
        return this.updateService.getUpdateById(id);
    }

    @Patch('/:id/status')
    updateUpdateStatus(
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
