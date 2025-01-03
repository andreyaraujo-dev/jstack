import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SigninDto } from './dtos/signin.dto';
import { UsersRepository } from '../../shared/database/repositories/users.repository';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
    const user = await this.usersRepository.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException(`Invalid credentials.`);
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(`Invalid credentials.`);
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;
    const emailTaken = await this.usersRepository.findUnique({
      where: { email },
      select: { id: true },
    });
    if (emailTaken) throw new ConflictException('Email already taken');

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepository.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              {
                name: 'Salário',
                icon: 'travel',
                type: 'INCOME',
              },
              {
                name: 'Freelance',
                icon: 'freelance',
                type: 'INCOME',
              },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              {
                name: 'Alimentação',
                icon: 'food',
                type: 'EXPENSE',
              },
              {
                name: 'Educação',
                icon: 'education',
                type: 'EXPENSE',
              },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              {
                name: 'Mercado',
                icon: 'grocery',
                type: 'EXPENSE',
              },
              {
                name: 'Roupas',
                icon: 'clothes',
                type: 'EXPENSE',
              },
              {
                name: 'Transporte',
                icon: 'transport',
                type: 'EXPENSE',
              },
              {
                name: 'Viagem',
                icon: 'travel',
                type: 'EXPENSE',
              },
              {
                name: 'Outro',
                icon: 'other',
                type: 'EXPENSE',
              },
            ],
          },
        },
      },
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private async generateAccessToken(userId: string): Promise<string> {
    return this.jwtService.signAsync({ sub: userId });
  }
}
