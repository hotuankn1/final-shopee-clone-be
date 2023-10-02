import { Body, Controller, Get, NotFoundException, Param, Post, Query, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private authService: AuthService,
    ) { }

    @Post('/signup')
    async signup(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        return user
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        console.log(session);
        return user;
    }


    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }


    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log(id);
        const user = await this.usersService.getById(parseInt(id));
        
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

}
