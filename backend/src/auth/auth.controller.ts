import { Controller, HttpCode, UsePipes, ValidationPipe, Body,Post, Res, Req, UnauthorizedException, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({passthrough:true}) res:Response){
    

    const {refreshToken, ...response} = await this.authService.login(dto)

     this.authService.addRefreshTokenToResponse(res, refreshToken)
     return response
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    const user = req.user as any;
    return {
      id: user.id,
      // email: user.email,
    };
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto, @Res({passthrough:true}) res:Response){
    const {refreshToken, ...response} = await this.authService.register(dto)

    this.authService.addRefreshTokenToResponse(res, refreshToken)
     return response
  }



  @HttpCode(200)  
  @Post('login/access-token')
  async getNewTokens(@Req() req: Request, @Res({passthrough: true}) res: Response){

    const refreshTokenFromCookies = req.cookies[this.authService.REFRESH_TOKEN_NAME]
    if(!refreshTokenFromCookies){
      this.authService.removeRefreshTokenFromResponse(res)
      throw new UnauthorizedException('Refresh token not passed')
    }
    
    const {refreshToken,...response } = await this.authService.getNewTokens(
      refreshTokenFromCookies
    )

    this.authService.addRefreshTokenToResponse(res,refreshToken)
     return response
  }


  @HttpCode(200)
  @Post('logout')
  async logout( @Res({passthrough: true}) res: Response){

    this.authService.removeRefreshTokenFromResponse(res)
     return true
  }


}