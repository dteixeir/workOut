interface IExcersize {
  id: string;
  name: string;
  duration: number;
  caloriesBurned: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}

class Excersize {
  id: string;
  name: string;
  duration: number;
  caloriesBurned: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;

  constructor(
    id: string,
    name: string,
    duration: number,
    caloriesBurned: number,
    date: Date,
    state: 'completed' | 'cancelled' | null
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.caloriesBurned = caloriesBurned;
    this.date = date;
    this.state = state;
  }
}

export { IExcersize, Excersize };

