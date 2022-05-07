export interface Project {
  name: string;
  description?: string;
  tasks?: Task[];
}
export interface Task {
  name: string;
  description?: string;
  done: boolean;
}
