import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';



@Injectable()
export class LoginService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async login({ username, password }): Promise<Number> {
    try {

      let user = await this.userModel.findOne({
        username: username,
        password: password
      });

      let retunedCode:Number = user ? this._generateSuccessCode() : -1;
      console.log("Successful login!!! code:", retunedCode);
      return retunedCode;
    } catch (error) {
      return -1;
    }

  }



  _generateSuccessCode(): number {
    return Math.round(Math.random() * 1000000) * 10 + 1;
  }

}
