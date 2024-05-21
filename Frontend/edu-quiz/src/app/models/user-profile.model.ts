import { Image } from "./image.model";

export class UserProfile {
    constructor(
        public name: string,
        public userName: string,
        public email: string,
        public userImage: Image | null
    ) {}
}