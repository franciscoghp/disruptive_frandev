type permissionsT = 'readers' | 'creators' | 'admin';

export type categoryT = {
  _id: number;
  name: string;
  cover: string;
  permissions: permissionsT[];
};

