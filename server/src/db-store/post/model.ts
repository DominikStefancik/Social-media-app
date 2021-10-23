import { getModelForClass, prop } from '@typegoose/typegoose';

export class Post {
  @prop({ required: true })
  public id!: string;

  @prop({ required: true })
  public authorId!: string;

  @prop({ required: true })
  public text!: string;

  @prop({ required: true })
  public createdAt!: Date;

  @prop()
  public lastUpdated?: Date;
}

export const PostModel = getModelForClass(Post);
