// import { User } from "src/auth/user.entity";
import { of } from "rxjs";
import { EntityRepository, Repository } from "typeorm";
import { AddUpdateDto } from "./dto/add-update.dto";
import { GetUpdatesFilterDto } from "./dto/get-updates-filter.dto";
import { UpdateStatus } from "./update-status.enum";
import { Update } from "./update.entity";

@EntityRepository(Update)
export class UpdateRepository extends Repository<Update>{
    async addUpdate(addUpdateDto:AddUpdateDto): Promise<Update>{

        // const img = file;
        const {img, title, subtitle, url} = addUpdateDto;

        const update = this.create({
            img,
            title,
            subtitle,
            url,
            status: UpdateStatus.OPEN,
        })

        await this.save(update);
        console.log(img);
        
        return update;
    }

    async getUpdates(filterDto: GetUpdatesFilterDto): Promise<Update[]>{
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('update') //return Object
        
        if (status) {
            query.andWhere('update.status = :status', { status });
        }
        if (search) {
            query.andWhere(
                '(LOWER(update.img) LIKE LOWER(:search) OR LOWER(update.title) LIKE LOWER(:search) OR LOWER(update.subtitle) LIKE LOWER(:search) OR LOWER(update.url) LIKE LOWER(:search))', //LOWER = lowercase of input
                { search: `%${search}%`} //percentage sign allows partial search (not exact word)
            )
        }

        const updates = await query.getMany();
        return updates;
    }
}