import { ApiProperty } from '@nestjs/swagger';

export class SendEmailNotificationDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the recipient',
  })
  email: string;

  @ApiProperty({
    example: 'Welcome to Our Service',
    description: 'The subject of the email notification',
  })
  subject: string;

  @ApiProperty({
    example: 'Hello, thank you for signing up for our service!',
    description: 'The content/body of the email notification',
  })
  content: string;
}
