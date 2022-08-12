import { Injectable} from '@nestjs/common';
import * as data from "../../data/data.json";
import { Status } from './status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status) private readonly statusRepository:Repository<Status>
    ){}
    async findStatus() {
    return await this.statusRepository.find();
}

}