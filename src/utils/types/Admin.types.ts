
export interface AdminProp {
    cloudinaryPublicId: string;
    createdAt: string | Date;
    email: string;
    linkdenLink: string;
    name: string;
    role: string;
    _id: string;
    updatedAt: string;
    image: File | null;
    isApproved: boolean,
    isSuspended: boolean,
    department: 'COMMUNICATIONS' | 'IT',
}
