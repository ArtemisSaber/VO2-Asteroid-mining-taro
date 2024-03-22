export interface Miner {
  _id: string;
  name: string;
  planet: string;
  x: number;
  y: number;
  angle: number;
  carryCapacity: number;
  travelSpeed: number;
  miningSpeed: number;
  status: number;
  minerals: number;
  __v: number;
  target: string;
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
