/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LoggerEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
 
    @Column()
    requestUrl: string;

    @Column()
    requestMethod: string;

    @Column()
    requestHeader: string;
    
    @Column()
    requestBody: string;

}
