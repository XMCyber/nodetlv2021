export interface healthAns {

    status: Status;
    msg: string;

}

export enum Status {
    true = 'OK',
    false = "Error Occured"
}