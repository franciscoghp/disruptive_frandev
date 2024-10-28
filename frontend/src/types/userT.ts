export type userT = {
  username: string;
  email: string;
  password: string;
  role?: 'readers' | 'creators' | 'admin';
};

export type loginT = Omit<userT, 'username'>;
