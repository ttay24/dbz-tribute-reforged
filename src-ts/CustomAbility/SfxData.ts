import { Vector3D } from "Common/Vector3D";

export class SfxData {
  // maybe move to Commmon, not sure, should only used for CustomAbility right now
  constructor(
    public model: string,
    public repeatInterval: number = 1,
    public scale: number = 1.0,
    public startHeight: number = 0.0,
    public endHeight: number = 0.0,
    public extraDirectionalYaw: number = 0.0,
    public color: Vector3D = new Vector3D(255, 255, 255),
    public persistent: boolean = false,
  ) {

  }


}