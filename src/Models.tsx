export interface IfirstChildProps {
    photo: IPhotoModel;
}

export interface ICommentModel {
    photoId: string;
    username: string;
    message: string;
    _id: string;
}

export interface ICommentData {
    username: string;
    photoId: string;
    message: string;
}

export interface IPhotoModel {
    _id: string;
    username: string;
    filename: string;
    title: string;
    img: object;
}

export interface IUserModel {
    name: string | null;
    username: string | null;
    email: string | null;
}

export interface ILoginModel {
    username: string;
    password: string;
}

export interface IRegisterModel {
    username: string;
    password: string;
    name: string;
    email: string;
    passconf: string;
}

export interface IUpdateData {
    name?: string;
    username?: string;
    email?: string;
}

export interface IRole {
    isAdmin: number;
}
