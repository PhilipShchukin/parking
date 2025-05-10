import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UserService {
 constructor(private prisma: PrismaService){}

 getById(id: string){
    return this.prisma.user.findUnique({
        where:{
            id
        },
    })
 }
 getByEmail(email:string){
    return this.prisma.user.findUnique({
        where:{
            email
        },
    })
 }

 async create(dto: AuthDto){
    const user = {
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10)
    }
    return this.prisma.user.create({
        data: user 
    })
 }

}