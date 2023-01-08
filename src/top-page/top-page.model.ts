import { Prop, index } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
export enum TopLevelCategory {
  Course,
  Services,
  Books,
  Products,
}

export class HhData {
  @Prop()
  count: number;
  @Prop()
  juniorSalary: number;
  @Prop()
  middleSalary: number;
  @Prop()
  seniorSalary: number;
}

export class TopPageAdvantage {
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export interface TopPageModel extends Base {}

@index({ title: 'text', seoText: 'text' })
export class TopPageModel extends TimeStamps {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;
  @Prop()
  secondCategory: string;
  @Prop({ unique: true })
  alias: string;
  @Prop()
  title: string;
  @Prop()
  category: string;
  @Prop({ type: () => HhData })
  hh?: HhData;
  @Prop({ type: () => [TopPageAdvantage] })
  advantages: TopPageAdvantage[];
  @Prop()
  seoText: string;
  @Prop()
  tagsTitle: string;
  @Prop({ type: () => [String] })
  tags: string[];
}
