import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }
  @Post()
  async login(@Body() loginDto: LoginDto): Promise<object> {
    const res = await this.loginService.login(loginDto);
    if (res === -1) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return { res };
  }

}
