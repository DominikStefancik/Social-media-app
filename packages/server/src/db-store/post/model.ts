import { getModelForClass, prop } from '@typegoose/typegoose';

export class Comment {
  @prop({ required: true })
  public id!: string;

  @prop({ required: true })
  public authorId!: string;

  @prop({ required: true })
  public text!: string;

  @prop({ required: true })
  public createdAt!: Date;
}

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

  @prop({ type: () => [Comment], required: true, _id: false })
  public comments!: Comment[];

  // array of IDs of users who liked the post
  @prop({ type: () => [String], required: true })
  public likes!: string[];
}

export const PostModel = getModelForClass(Post);
