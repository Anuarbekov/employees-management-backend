import {
  Controller,
  Param,
  Get,
  Body,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, RegisterDto } from './dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() dto: RegisterDto) {
    return this.userService.createUser(dto);
  }

  @Get(':id')
  getUserById(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.getUserById(id);
  }
  @Post('update')
  updateUserById(@Body() body: UpdateUserDto) {
    return body;
  }
}
