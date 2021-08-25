import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 255 })
  @Index()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column({ name: 'password', length: 255 })
  password: string;

  toJSON?() {
    const { password, ...self } = this;
    return self;
  }
}


export class UserFillableFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
