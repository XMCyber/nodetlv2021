import { Injectable } from '@nestjs/common';
import { healthAns,Status } from './interfaces/healthAns';
import { promisify } from 'util';
import { readdir } from "fs";
import { exec } from 'child_process';

const asyncExec = promisify(exec);
const asyncReadDir = promisify(readdir)
const UTILS_PATH = 'src/health/utils/';

@Injectable()
export class HealthcheckService {

    async healthCheck(filename: string): Promise<healthAns> {

        try {

            let isValidInput = await this.isValidInput(filename);
            if (isValidInput.status === Status.false) {
                return isValidInput;
            }

            const { stdout, stderr } = await asyncExec('npx ts-node ' + UTILS_PATH + filename);
            if (stderr) {
                console.error(`error: ${stderr}`);
                return { status: Status.false, msg: stderr };
            }
            return { status: Status.true, msg: stdout };

        } catch (error) {
            return { status: Status.false, msg: error.message }
        }
    }

    private async checkIfFileInUtils(filename: string): Promise<boolean> {

        try {
            const files: string[] = await asyncReadDir(UTILS_PATH);

            if (files.includes(filename)) {
                return true;
            }
            return false;

        } catch (error) {
            return false;
        }
    }

    private isValidFilename(filename: string): boolean {

        let regExp = new RegExp(/([a-z]|[A-Z])\.ts/g);
        return regExp.test(filename);
    }

    private async isValidInput(filename: string): Promise<healthAns> {

        let isValidFilename = this.isValidFilename(filename);
        let isFileInUtils = await this.checkIfFileInUtils(filename);

        if (!(isValidFilename && isFileInUtils)) {
            return { status: Status.false, msg: 'invalid input' }
        }

        return {status: Status.true, msg: 'valid input'}
    }
}





