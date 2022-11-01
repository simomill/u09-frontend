export interface IfirstChildProps {
    photo: IPhotoModel;
}

export interface ICommentModel {
    photoId: string;
    username: string;
    message: string;
    _id: string;
}

export interface IPhotoModel {
    _id: string;
    username: string;
    filename: string;
    title: string;
    img: object
}