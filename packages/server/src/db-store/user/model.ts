import { getModelForClass, prop } from '@typegoose/typegoose';

export class User {
  @prop({ required: true })
  public id!: string;

  @prop({ required: true })
  public username!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public createdAt!: Date;

  @prop()
  public lastUpdated?: Date;
}

export const UserModel = getModelForClass(User);
