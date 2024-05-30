import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getTimezone(timezone: string) {
    try {
      const zoneCheck = moment().tz(timezone).zoneAbbr();
      if (zoneCheck === '') {
        const countryList = moment.tz.names();
        throw new BadRequestException({
          message: 'Invalid timezone',
          timezone: countryList,
        });
      }
      return moment().tz(timezone).subtract(1, 'years').format('YYYY');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const yearUser = await this.getTimezone(createUserDto.timezone);
      const payload = {
        ...createUserDto,
        latest_sent_at: yearUser,
      };
      await this.userRepository.save(payload);
      return {
        message: 'User created successfully',
        data: createUserDto,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const result = await this.userRepository.find();
      if (result.length > 0) {
        return result;
      }
      throw new BadRequestException('No User Data Found');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.userRepository.findOne({ where: { id } });
      if (result) {
        return result;
      }
      throw new BadRequestException('User not found');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.timezone) {
        await this.getTimezone(updateUserDto.timezone);
      }
      const result = await this.userRepository.update(id, updateUserDto);
      if (result.affected > 0) {
        return {
          message: 'User updated successfully',
          data: await this.userRepository.findOne({ where: { id } }),
        };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.userRepository.softDelete(id);
      if (result.affected > 0) {
        return {
          message: 'User deleted successfully',
        };
      }
      throw new BadRequestException('User not found');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
