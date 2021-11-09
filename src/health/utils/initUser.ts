import * as Faker from "faker";
import { connect, Model, model, disconnect } from 'mongoose';
import { User, UserSchema } from '../../user/login/user.schema';

const COL_NAME = 'User';

export class InitUser {

    static userModel: Model<User> = model<User>(COL_NAME, UserSchema);

    static async connectToDB(): Promise<void> {
      
            await connect(process.env.MONGO_URL);
    }
    static async initUserForFirstTime(): Promise<void> {

        let generatedUsername:string =  `${Faker.name.firstName()}-${Faker.name.lastName()}`
        let generatedPasswd:string =  `${Faker.internet.password()}${Faker.datatype.hexaDecimal()}`
        
        try {
            await this.connectToDB();
            await this.userModel.create({
                username: generatedUsername,
                password: generatedPasswd
            });


            console.log(`new credentials added to DB - ${generatedUsername} ${generatedPasswd}` );
            await disconnect();
            return;
        } catch (error) {
            console.error("something went wrong - ", error.message);
            await disconnect();
            return;
        }


    }


}


InitUser.initUserForFirstTime();