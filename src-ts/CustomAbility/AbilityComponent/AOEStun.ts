import { AbilityComponent } from "./AbilityComponent";
import { CustomAbility } from "CustomAbility/CustomAbility";
import { CustomAbilityInput } from "CustomAbility/CustomAbilityInput";
import { Vector2D } from "Common/Vector2D";
import { UnitHelper } from "Common/UnitHelper";

export class AOEStun implements AbilityComponent, Serializable<AOEStun> {
  static readonly MICRO = 0.03;
  static readonly ONE_SECOND = 1;
  static readonly TWO_SECOND = 2;

  protected alreadyStunned: Map<number, boolean>;
  protected stunDummy: unit;

  constructor(
    public name: string = "AOEStun",
    public repeatInterval: number = 1,
    public duration: number = AOEStun.ONE_SECOND,
    public aoe: number = 500,
    public keepStunning: boolean = false,
  ) {
    this.alreadyStunned = new Map();
    this.stunDummy = GetEnumUnit();
  }
  
  performTickAction(ability: CustomAbility, input: CustomAbilityInput, source: unit) {
    const sourceCoord = new Vector2D(GetUnitX(source), GetUnitY(source));
    if (ability.currentTick == CustomAbility.START_TICK) {

      // just for testing
      // this.stunDummy = CreateUnit(input.casterPlayer, FourCC('Hmkg'), sourceCoord.x, sourceCoord.y, 0);
      // UnitAddAbility(this.stunDummy, FourCC('AHtb'));

      this.stunDummy = CreateUnit(input.casterPlayer, FourCC('h054'), sourceCoord.x, sourceCoord.y, 0);

      if (this.duration == AOEStun.MICRO) {
        UnitAddAbility(this.stunDummy, FourCC('A08K'));
      } else if (this.duration == AOEStun.ONE_SECOND) {
        UnitAddAbility(this.stunDummy, FourCC('A0IY'));
      } else {
        UnitAddAbility(this.stunDummy, FourCC('A0I7'));
      }
      
      this.alreadyStunned.clear();
    }

    const affectedGroup = UnitHelper.getNearbyValidUnits(
      sourceCoord, 
      this.aoe,
      () => {
        return UnitHelper.isUnitTargetableForPlayer(GetFilterUnit(), input.casterPlayer);
      }
    );

    ForGroup(affectedGroup, () => {
      const target = GetEnumUnit();
      const targetId = GetHandleId(target);
      if (!this.alreadyStunned.get(targetId) || this.keepStunning) {
        this.alreadyStunned.set(targetId, true);
        IssueTargetOrder(this.stunDummy, "thunderbolt", target);
      }
    });

    if (ability.currentTick == ability.duration) {
      RemoveUnit(this.stunDummy);
    }
  }
  

  clone(): AbilityComponent {
    return new AOEStun(
      this.name, this.repeatInterval, this.duration, this.aoe, this.keepStunning,
    );
  }
  
  deserialize(
    input: { 
      name: string; 
      repeatInterval: number; 
      duration: number; 
      aoe: number; 
      keepStunning: boolean; 
    }
  ) {
    this.name = input.name;
    this.repeatInterval = input.repeatInterval;
    this.duration = input.duration;
    this.aoe = input.aoe;
    this.keepStunning = input.keepStunning;
    return this;
  }
}