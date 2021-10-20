import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { User } from 'src/auth/user.entity';
import { AddUpdateDto } from './dto/add-update.dto';
import { GetUpdatesFilterDto } from './dto/get-updates-filter.dto';
import { UpdateStatus } from './update-status.enum';
import { Update } from './update.entity';
import { UpdateRepository } from './update.repository';

@Injectable()
export class UpdateService {
    constructor(
        @InjectRepository(UpdateRepository)
        private updateRepository: UpdateRepository,
    ){}

    addUpdate(addUpdateDto:AddUpdateDto): Promise<Update>{
        return this.updateRepository.addUpdate(addUpdateDto);
    }

    getUpdates(filterDto: GetUpdatesFilterDto): Promise<Update[]>{
        return this.updateRepository.getUpdates(filterDto);
    }

    // getHello(): string {
    //     return 'Hello World Update';
    // }

    async getUpdateById(id: string): Promise<Update>{
        const found = await this.updateRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`ID ${id} not found`)
        }

        return found;
    }

    async updateUpdateStatus(
        id: string, status: UpdateStatus
        // id: string, status: UpdateStatus, title?:string, subtitle?:string, img?:string, url?:string
        ): Promise<Update>{
        const update = await this.getUpdateById(id);

        update.status = status;
        // update.title = title;
        // update.subtitle = subtitle;
        // update.img = img;
        // update.url = url;
        await this.updateRepository.save(update);

        return update;
    }

    async deleteUpdateById(id: string): Promise<void>{
        const result = await this.updateRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`ID ${id} is not found`)
        }
    }
}
