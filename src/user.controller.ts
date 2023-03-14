import { Body, Controller, Get, Query, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/newuser')
  async newUser(@Query() name, pass, mail): Promise<string> {
    let state = await this.userService.newUser(name);
    if (!state) {
      state = "email is already in use"
    }
    return state;
  }

  @Get('/getusers')
  async getUsers(): Promise<any[]> {
    const data = await this.userService.getUsers();
    return data
  }

  @Get('deleteuser')
  async deleteUser(@Query() email, @Query() pass): Promise<string> {
    const state = await this.userService.deleteUser(email)
    return state
  }

  @Get('login')
  async login(@Query() email, pass): Promise<any> {
    let state = await this.userService.login(email)
    if (!state) {
      state = "email or password incorrect"
    }
    return state
  }
}