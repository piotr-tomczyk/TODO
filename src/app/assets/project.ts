export interface Project {
  name: string;
  description?: string;
  tasks?: Task[];
  highestIndex: number;
}
export interface Task {
  id: number;
  name: string;
  description?: string;
  done: boolean;
}
