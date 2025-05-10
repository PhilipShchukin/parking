import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class UserDto {
	@IsString({ message: 'Имя должно быть строкой.' })
	@IsNotEmpty({ message: 'Имя обязательно для заполнения.' })
    @IsOptional()
	name: string

	@IsString({ message: 'Email должен быть строкой.' })
	@IsEmail({}, { message: 'Некорректный формат email.' })
	@IsNotEmpty({ message: 'Email обязателен для заполнения.' })
	email: string

    @IsString()
    @MinLength(6, {
		message: 'Пароль должен больше 6 символов.'
	})
    password: string;
}
