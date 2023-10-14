import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  private users: any[] = []; 

  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: this.generateUserId(),
      name: createUserDto.name,
      age: createUserDto.age,
    };
  
    this.users.push(newUser);
    console.log('User created:', newUser);
  
    return newUser; 
  }
  
  
  

  
  private generateUserId(): number {
    const maxId = this.users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    return maxId + 1;
  }


  findAll() {
    return this.users;
    }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    return user; 
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    return this.users[userIndex];  }

  remove(id: number) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    const removedUser = this.users.splice(userIndex, 1)[0];
    return removedUser;    }
}
