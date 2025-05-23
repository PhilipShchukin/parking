import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

import { Response } from 'express';


@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 30
  REFRESH_TOKEN_NAME='refreshToken'
 constructor(
  private jwt: JwtService,
  private userService: UserService
 ){}
 async login(dto: AuthDto){ 
  
  const {password, ...user } = await this.validateUser(dto)
  const tokens = this.issueTokens(user.id)

  return {
    user,
    ...tokens
  }
 }

 async register(dto:AuthDto){ 
  const oldUser = await this.userService.getByEmail(dto.email)

  if (oldUser) throw new ConflictException(
    'Регистрация не удалась. Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в систему.'
  )

  const {password, ...user } = await this.userService.create(dto)
  
  const tokens = this.issueTokens(user.id)

  return {
    user,
    ...tokens
  }
 }

 async getNewTokens(refreshToken:string){
  const result = await this.jwt.verifyAsync(refreshToken)
  if(!result) throw new UnauthorizedException('Invalid refresh')
  
  const {password, ...user } = await this.userService.getById(result.id)
  const tokens = this.issueTokens(user.id)

  return{
    user,
    ...tokens
  }
 }



 private issueTokens(userId:string){
  const data = {id: userId}

  const accessToken = this.jwt.sign(data,{
    expiresIn:'1h'
  })
  const refreshToken = this.jwt.sign(data, {
    expiresIn:'7d'
  })
  return {accessToken,refreshToken} 
 }

 private async validateUser(dto:AuthDto){
  const user = await this.userService.getByEmail(dto.email)
  if(!user) throw new NotFoundException('User Not found')

   const isValid = await bcrypt.compare(dto.password, user.password)

  if (!isValid) throw new UnauthorizedException('invalid password')
  return user
 }

 addRefreshTokenToResponse(res: Response,refreshToken:string){
  const expiresIn = new Date()
  expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)
  res.cookie(this.REFRESH_TOKEN_NAME, refreshToken,{
    httpOnly: true,
    domain:'localhost',
    expires:expiresIn,
    secure:true,
    sameSite: 'none'
  })
 }
 removeRefreshTokenFromResponse(res: Response){
  res.cookie(this.REFRESH_TOKEN_NAME, '',{
    httpOnly: true,
    domain:'localhost',
    expires:new Date(0),
    secure:true,
    sameSite: 'none'
  })
 }
  

}