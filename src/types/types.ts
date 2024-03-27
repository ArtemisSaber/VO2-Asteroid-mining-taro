export interface Miner {
  _id: string;
  name: string;
  planet: Planet | string;
  x: number;
  y: number;
  angle: number;
  carryCapacity: number;
  travelSpeed: number;
  miningSpeed: number;
  status: number;
  minerals: number;
  __v: number;
  target: Planet | Asteroid;
  targetType: string;
}
export interface Planet {
  position: Position;
  _id: string;
  name: string;
  minerals: number;
  miners: number;
  __v: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface EventData {
  event: string;
  args: Array<TickPayload>;
}
export interface Asteroid {
  currentMiner: string | null;
  minerals: number;
  name: string;
  position: Position;
  status: number;
  _v: number;
  _id: string;
}
export interface TickPayload {
  asteroids: Array<Asteroid>;
  miners: Array<Miner>;
  planets: Array<Planet>;
  currentTick: number;
}

export interface History {
  capacity: Capacity;
  speed: Speed;
  position: Position;
  _id: string;
  year: number;
  planet: string;
  status: number;
  miner: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Capacity {
  current: number;
  max: number;
}
export interface Speed {
  travel: number;
  mining: number;
}
