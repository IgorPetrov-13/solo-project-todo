export type TypeUser = {
  id: number;
  name: string;
  email: string;
 
};

export type TypeTask = {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  userId: number;
  
};



export type TypeNewTask = {
  title: string;
  description: string;
  isDone: boolean;
  userId: number;
};


export type TypeTasks = TypeTask[];
